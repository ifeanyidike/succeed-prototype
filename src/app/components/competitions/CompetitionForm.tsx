"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { VisibilityType, School } from "@/app/lib/types";
import { createCompetition } from "@/app/lib/api/competitions";
import { getSchools } from "@/app/lib/api/schools";
import useAuth from "@/app/hooks/useAuth";

export default function CompetitionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visibility, setVisibility] = useState<VisibilityType>("private");
  const [allowedSchools, setAllowedSchools] = useState<string[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { session, user } = useAuth();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schoolsData = await getSchools();
        setSchools(schoolsData);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setError("You must be logged in to create a competition");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (!title || !startDate || !endDate) {
        setError("Please fill in all required fields");
        return;
      }

      const competitionData = {
        title,
        description,
        startDate,
        endDate,
        ownerTenantId: session.user.schoolId,
        visibility,
        allowedSchools:
          visibility === "restricted" ? allowedSchools : undefined,
      };

      await createCompetition(competitionData, session.user);
      router.push("/competitions");
    } catch (error) {
      setError("An error occurred while creating the competition");
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolSelection = (schoolId: string) => {
    setAllowedSchools((prev) => {
      if (prev.includes(schoolId)) {
        return prev.filter((id) => id !== schoolId);
      } else {
        return [...prev, schoolId];
      }
    });
  };

  if (!session) {
    return <div>Please log in to create a competition</div>;
  }

  if (user?.role !== "school_admin" && user?.role !== "platform_admin") {
    return (
      <div>Only school admins and platform admins can create competitions</div>
    );
  }

  return (
    <div>
      <h2>Create New Competition</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as VisibilityType)}
            required
          >
            <option value="public">Public (visible to all schools)</option>
            <option value="private">
              Private (only visible to your school)
            </option>
            <option value="restricted">
              Restricted (visible to selected schools)
            </option>
          </select>
        </div>
        {visibility === "restricted" && (
          <div>
            <label>Select Schools</label>
            <div>
              {schools
                .filter((school) => school.id !== session.user.schoolId)
                .map((school) => (
                  <div key={school.id}>
                    <input
                      type="checkbox"
                      id={`school-${school.id}`}
                      checked={allowedSchools.includes(school.id)}
                      onChange={() => handleSchoolSelection(school.id)}
                    />
                    <label htmlFor={`school-${school.id}`}>{school.name}</label>
                  </div>
                ))}
            </div>
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Competition"}
        </button>
      </form>
    </div>
  );
}

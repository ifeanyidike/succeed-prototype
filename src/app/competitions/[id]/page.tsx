"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCompetition } from "@/app/lib/api/competitions";
import { Competition } from "@/app/lib/types";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";

export default function CompetitionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { session, loading: authLoading, user } = useAuth();

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    const fetchCompetition = async () => {
      try {
        const competitionData = await getCompetition(params.id, session.user);
        if (!competitionData) {
          setError(
            "Competition not found or you do not have permission to view it"
          );
        } else {
          setCompetition(competitionData);
        }
      } catch (error) {
        setError("Error fetching competition details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [params.id, router]);

  if (!session) {
    return null;
  }

  if (authLoading || loading) {
    return <div>Loading competition details...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link href="/competitions">Back to Competitions</Link>
      </div>
    );
  }

  if (!competition) {
    return (
      <div>
        <p>Competition not found</p>
        <Link href="/competitions">Back to Competitions</Link>
      </div>
    );
  }

  const isOwner =
    competition.ownerTenantId === user?.schoolId && user.role !== "student";

  return (
    <div>
      <h1>{competition.title}</h1>
      {competition.description && <p>{competition.description}</p>}

      <div>
        <strong>Start Date:</strong>{" "}
        {new Date(competition.startDate).toLocaleDateString()}
      </div>
      <div>
        <strong>End Date:</strong>{" "}
        {new Date(competition.endDate).toLocaleDateString()}
      </div>
      <div>
        <strong>Visibility:</strong> {competition.visibility}
      </div>

      {isOwner && (
        <div>
          <p>You are the owner of this competition</p>
        </div>
      )}

      <Link href="/competitions">Back to Competitions</Link>
    </div>
  );
}

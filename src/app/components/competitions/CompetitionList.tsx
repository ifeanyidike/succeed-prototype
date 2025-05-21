"use client";

import { useState, useEffect } from "react";
import { getCompetitions } from "@/app/lib/api/competitions";
import { Competition } from "@/app/lib/types";
import CompetitionCard from "./CompetitionCard";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";

export default function CompetitionList() {
  const { session, loading: authLoading, user } = useAuth();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!session) return;

      try {
        const competitionsData = await getCompetitions(session.user);
        setCompetitions(competitionsData);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

  if (authLoading || loading) {
    return <div>Loading competitions...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Competitions</h2>
        {user?.role === "school_admin" && (
          <Link href="/competitions/create">Create New Competition</Link>
        )}
      </div>

      <hr />

      {competitions.length === 0 ? (
        <p>No competitions found</p>
      ) : (
        <div>
          {competitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              isOwner={competition.ownerTenantId === session.user.schoolId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

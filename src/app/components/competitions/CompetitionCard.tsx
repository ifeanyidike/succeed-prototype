import Link from "next/link";
import { Competition } from "@/app/lib/types";

interface CompetitionCardProps {
  competition: Competition;
  isOwner: boolean;
}

export default function CompetitionCard({
  competition,
  isOwner,
}: CompetitionCardProps) {
  return (
    <div role="listitem">
      <h3>{competition.title}</h3>
      <p>{competition.description}</p>
      <div>
        <strong>Date:</strong>{" "}
        {new Date(competition.startDate).toLocaleDateString()} -{" "}
        {new Date(competition.endDate).toLocaleDateString()}
      </div>
      <div>
        <strong>Visibility:</strong> {competition.visibility}
        {competition.visibility === "restricted" &&
          competition.allowedSchools && (
            <span>
              {" "}
              (Shared with {competition.allowedSchools.length} schools)
            </span>
          )}
      </div>
      {isOwner && (
        <div>
          <strong>Status:</strong> You own this competition
        </div>
      )}
      <div style={{ marginTop: "1rem" }}>
        <Link href={`/competitions/${competition.id}`}>View Details</Link>
      </div>
    </div>
  );
}

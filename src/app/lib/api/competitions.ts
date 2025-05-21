import { Competition, User } from "../types";
import { competitions } from "./mockData";

const byVisibilityRule = (competition: Competition, user: User) =>
  competition.visibility === "public" ||
  (competition.visibility === "restricted" &&
    competition.allowedSchools?.includes(user.schoolId));

export async function getCompetitions(user: User): Promise<Competition[]> {
  return competitions.filter((competition) => {
    if (user.role === "platform_admin") {
      return true;
    }

    if (user.role === "school_admin" || user.role === "student") {
      return (
        competition.ownerTenantId === user.schoolId ||
        byVisibilityRule(competition, user)
      );
    }

    return false;
  });
}

export async function getCompetition(
  id: string,
  user: User
): Promise<Competition | null> {
  const competition = competitions.find((c) => c.id === id);

  if (!competition) return null;

  if (
    user.role === "platform_admin" ||
    competition.ownerTenantId === user.schoolId ||
    byVisibilityRule(competition, user)
  ) {
    return competition;
  }

  return null;
}

export async function createCompetition(
  data: Omit<Competition, "id">,
  user: User
): Promise<Competition> {
  if (user.role !== "school_admin" && user.role !== "platform_admin") {
    throw new Error(
      "Only school admins and platform admins can create competitions"
    );
  }

  const newId = (competitions.length + 1).toString();

  const newCompetition: Competition = {
    id: newId,
    ...data,
  };

  competitions.push(newCompetition);

  return newCompetition;
}

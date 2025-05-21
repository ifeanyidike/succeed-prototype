export type UserRole = "student" | "school_admin" | "platform_admin";
export type VisibilityType = "public" | "private" | "restricted";

export interface School {
  id: string;
  name: string;
  domain: string;
  logo?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  schoolId: string;
}

export interface Competition {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  ownerTenantId: string;
  visibility: VisibilityType;
  allowedSchools?: string[];
}

export interface Submission {
  id: string;
  competitionId: string;
  content: string;
  submittedAt: string;
  studentId: string;
  schoolId: string;
}

export interface AuthSession {
  user: User;
  school: School;
  isAuthenticated: boolean;
}

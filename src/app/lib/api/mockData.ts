import { School, User, Competition } from "../types";

export const schools: School[] = [
  {
    id: "1",
    name: "National High School",
    domain: "nationalhigh.edu",
  },
  {
    id: "2",
    name: "Cederwood International School",
    domain: "cederwood.edu",
  },
  {
    id: "3",
    name: "Sure Plug Academy",
    domain: "sureplug.edu",
  },
];

export const users: User[] = [
  {
    id: "1",
    email: "admin@nationalhigh.edu",
    name: "Desmond Smith",
    role: "school_admin",
    schoolId: "1",
  },
  {
    id: "2",
    email: "admin@cederwood.edu",
    name: "Sarah Scale",
    role: "school_admin",
    schoolId: "2",
  },
  {
    id: "3",
    email: "student@nationalhigh.edu",
    name: "Tom Denny",
    role: "student",
    schoolId: "1",
  },
];

export const competitions: Competition[] = [
  {
    id: "1",
    title: "Mathematics Olympiad",
    description: "Annual mathematics competition",
    startDate: "2025-06-01",
    endDate: "2025-06-15",
    ownerTenantId: "1",
    visibility: "public",
  },
  {
    id: "2",
    title: "Physics Challenge",
    description: "Test your physics knowledge",
    startDate: "2025-07-01",
    endDate: "2025-07-10",
    ownerTenantId: "1",
    visibility: "private",
  },
  {
    id: "3",
    title: "Programming Contest",
    description: "Coding competition for all schools",
    startDate: "2025-08-05",
    endDate: "2025-08-20",
    ownerTenantId: "2",
    visibility: "restricted",
    allowedSchools: ["1", "2"],
  },
  {
    id: "4",
    title: "Essay Writing",
    description: "Express your thoughts on climate change",
    startDate: "2025-09-10",
    endDate: "2025-09-25",
    ownerTenantId: "2",
    visibility: "public",
  },
];

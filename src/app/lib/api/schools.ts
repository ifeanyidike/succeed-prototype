import { School } from "../types";
import { schools } from "./mockData";

export async function getSchools(): Promise<School[]> {
  return schools;
}

export async function getSchool(id: string): Promise<School | null> {
  return schools.find((school) => school.id === id) || null;
}

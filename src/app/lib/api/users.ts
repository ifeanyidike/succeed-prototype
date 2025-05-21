import { User } from "../types";
import { users } from "./mockData";

export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email === email) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  return users.find((user) => user.id === id) || null;
}

export async function verifyPassword(password: string): Promise<boolean> {
  return !!password && password.trim() !== "";
}

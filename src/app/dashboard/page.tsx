"use client";

import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function DashboardPage() {
  const { session, loading, user } = useAuth(true, true);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
      <p>School: {session.school.name}</p>
      <div>
        <h2>Quick Links</h2>
        <ul>
          <li>
            <Link href="/competitions">View Competitions</Link>
          </li>
          {session.user.role === "school_admin" && (
            <li>
              <Link href="/competitions/create">Create New Competition</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

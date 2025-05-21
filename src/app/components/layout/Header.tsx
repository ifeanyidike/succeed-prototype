"use client";

import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";

export default function Header() {
  const { session, isAuthenticated, logout } = useAuth(true, false);

  return (
    <header>
      <div>
        <Link
          href={isAuthenticated ? "/dashboard" : "/"}
          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
        >
          Succeed Competition Platform
        </Link>
      </div>
      {isAuthenticated && session && (
        <div>
          <span style={{ marginRight: "1rem" }}>
            {session.user.name} ({session.school.name})
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
}

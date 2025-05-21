"use client";
import Link from "next/link";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated]);
  return (
    <div>
      <h1>Welcome to Succeed Competition Platform</h1>
      <p>
        A platform for schools to run and manage competitions for their
        students.
      </p>
      <Link href="/login">Login</Link>
    </div>
  );
}

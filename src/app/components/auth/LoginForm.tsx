"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/auth";
import useAuth from "@/app/hooks/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth(false, false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    if (!email || !password) {
      setError("Email and password are required");
      setIsLoggingIn(false);
      return;
    }

    try {
      const session = await login(email, password);

      if (!session) {
        setError("Invalid email or password");
        setIsLoggingIn(false);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("An error occurred during login");
      setIsLoggingIn(false);
    }
  };

  return (
    <div>
      <h2>School Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoggingIn}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoggingIn}
          />
        </div>
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
      <div style={{ marginTop: "2rem" }}>
        <p>Demo Accounts:</p>
        <ul>
          <li>Email: admin@nationalhigh.edu (National High School Admin)</li>
          <li>Email: admin@cederwood.edu (Pinewood Academy Admin)</li>
        </ul>
        <p>Use any password for the demo</p>
      </div>
    </div>
  );
}

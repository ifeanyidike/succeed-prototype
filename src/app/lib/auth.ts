import { AuthSession, User } from "./types";
import { getUserByEmail } from "./api/users";
import { getSchool } from "./api/schools";

const SESSION_STORAGE_KEY = "auth_session";
const AUTH_STATE_CHANGE_EVENT = "auth_state_change";

export async function login(
  email: string,
  password: string
): Promise<AuthSession | null> {
  const user = await getUserByEmail(email);
  if (!user || !password || password.trim() === "") return null;

  const school = await getSchool(user.schoolId);

  if (!school) return null;

  const session = {
    user,
    school,
    isAuthenticated: true,
  };

  saveSession(session);
  return session;
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const sessionStr = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionStr) return null;

  try {
    return JSON.parse(sessionStr);
  } catch (error) {
    return null;
  }
}

export function saveSession(session: AuthSession): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

  const event = new CustomEvent(AUTH_STATE_CHANGE_EVENT, { detail: session });
  window.dispatchEvent(event);
}

export function logout(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(SESSION_STORAGE_KEY);

  const event = new CustomEvent(AUTH_STATE_CHANGE_EVENT, { detail: null });
  window.dispatchEvent(event);
}

// export function onAuthStateChange(
//   cb: (session: AuthSession | null) => void
// ): () => void {
//   if (typeof window === "undefined") {
//     return () => {};
//   }

//   const handler = (event: Event) => {
//     const customEvent = event as CustomEvent<AuthSession | null>;
//     cb(customEvent.detail);
//   };

//   window.addEventListener(AUTH_STATE_CHANGE_EVENT, handler);

//   return () => {
//     window.removeEventListener(AUTH_STATE_CHANGE_EVENT, handler);
//   };
// }

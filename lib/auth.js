// Minimal cookie helpers (client-side)
export function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const c of cookies) {
    const [k, v] = c.split("=");
    if (decodeURIComponent(k) === name) return decodeURIComponent(v || "");
  }
  return "";
}

export function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// Auth storage keys
const TOKEN_COOKIE = "access_token";
const USER_EMAIL_COOKIE = "user_email";
const USER_ID_COOKIE = "user_id";

export function saveAuth({ access_token, user }) {
  setCookie(TOKEN_COOKIE, access_token, 7);
  setCookie(USER_EMAIL_COOKIE, user?.email || "", 7);
  setCookie(USER_ID_COOKIE, user?.id || "", 7);

  // Optional localStorage backup (handy during dev)
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("user_email", user?.email || "");
  localStorage.setItem("user_id", user?.id || "");
}

export function clearAuth() {
  deleteCookie(TOKEN_COOKIE);
  deleteCookie(USER_EMAIL_COOKIE);
  deleteCookie(USER_ID_COOKIE);

  localStorage.removeItem("access_token");
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_id");
}

export function getAccessToken() {
  // Prefer cookie; fallback to localStorage
  if (typeof document === "undefined") return "";
  return getCookie(TOKEN_COOKIE) || localStorage.getItem("access_token") || "";
}

export function getUserMeta() {
  if (typeof document === "undefined") return { email: "", id: "" };
  const email = getCookie(USER_EMAIL_COOKIE) || localStorage.getItem("user_email") || "";
  const id = getCookie(USER_ID_COOKIE) || localStorage.getItem("user_id") || "";
  return { email, id };
}
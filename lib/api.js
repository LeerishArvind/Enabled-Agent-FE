import { getAccessToken } from "./auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

function extractErrorMessage(data, status) {
  if (!data) return `Request failed (${status})`;

  const raw = data.detail || data.message || data.error || data;

  if (typeof raw === "string") return raw;

  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === "string") return item;
        if (item?.loc && item?.msg) return `${item.loc.join(".")}: ${item.msg}`;
        if (item?.msg) return item.msg;
        return JSON.stringify(item);
      })
      .join(", ");
  }

  if (typeof raw === "object") {
    if (raw.msg) return raw.msg;
    if (raw.error) return raw.error;
    return JSON.stringify(raw, null, 2);
  }

  return `Request failed (${status})`;
}

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  return isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);
}

async function request(path, { method = "GET", body, headers } = {}) {
  const token = typeof window !== "undefined" ? getAccessToken() : "";

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    const msg = extractErrorMessage(data, res.status);
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function requestForm(path, { method = "POST", formData, headers } = {}) {
  const token = typeof window !== "undefined" ? getAccessToken() : "";

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    body: formData,
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    const msg = extractErrorMessage(data, res.status);
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  signup(payload) {
    return request("/auth/signup", { method: "POST", body: payload });
  },

  login(payload) {
    return request("/auth/login", { method: "POST", body: payload });
  },

  logout() {
    return request("/auth/logout", { method: "POST" });
  },

  employerSearch(payload) {
    return request("/employer/search", { method: "POST", body: payload });
  },

  employerSearchByFile(file, topK) {
    const formData = new FormData();
    formData.append("jd_file", file);
    formData.append("top_k", String(topK));

    return requestForm("/employer/search/file", {
      method: "POST",
      formData,
    });
  },
};
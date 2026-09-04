const API_URL = "http://localhost:5000/api";

export async function api(path, options = {}) {
  const token = localStorage.getItem("lynk_token");
  const headers = {
    ...(options.body instanceof FormData ? {} : {"Content-Type":"application/json"}),
    ...(options.headers || {})
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {...options, headers});
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export async function login(email, password) {
  const data = await api("/auth/login", {method:"POST",body:JSON.stringify({email,password})});
  localStorage.setItem("lynk_token", data.token);
  localStorage.setItem("lynk_user", JSON.stringify(data.user));
  return data;
}

export async function register(payload) {
  const data = await api("/auth/register", {method:"POST",body:JSON.stringify(payload)});
  localStorage.setItem("lynk_token", data.token);
  localStorage.setItem("lynk_user", JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem("lynk_token");
  localStorage.removeItem("lynk_user");
}

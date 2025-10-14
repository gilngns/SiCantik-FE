import api from "../lib/api";

export type LoginPayload = { 
  email: string; 
  password: string; 
};

export interface RegisterPayload {
  nama_lengkap: string;
  email: string;
  password: string;
  password_confirmation: string;
  nomor_telepon?: string;
  role_id: number;                
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamat_lengkap?: string;
}

export async function login(payload: LoginPayload) {
  const { data } = await api.post("/auth/login", payload, {
    headers: { "Content-Type": "application/json" },
  });

  if (data?.token) {
    localStorage.setItem("access_token", data.token);
  }
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post("/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function me() {
  const { data } = await api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  });
  return data;  
}

export async function logout() {
  try {
    await api.post("/auth/logout", null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });
  } finally {
    localStorage.removeItem("access_token");
  }
}

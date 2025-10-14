// src/services/profileService.ts
import api from "../lib/api";

export async function getProfile() {
  const res = await api.get("/auth/profile");
  return res.data.data; 
}

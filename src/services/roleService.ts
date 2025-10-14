import api from "../lib/api";

export interface Role {
  role_id: number;
  nama_role: string;
}

export async function getRoles(): Promise<Role[]> {
  const { data } = await api.get("/auth/roles");
  return data.data; 
}

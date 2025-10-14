export type WilayahItem = { code: string; name: string };

const pickData = (json: unknown): WilayahItem[] => {
  if (Array.isArray(json)) return json as WilayahItem[];
  if (json && Array.isArray((json as any).data)) return (json as any).data as WilayahItem[];
  return [];
};

export async function getProvinces(): Promise<WilayahItem[]> {
  try {
    const res = await fetch("/wilayah/api/provinces.json");
    return pickData(await res.json());
  } catch (e) {
    console.error("Fetch provinces error:", e);
    return [];
  }
}

export async function getRegencies(provinceCode: string): Promise<WilayahItem[]> {
  try {
    const res = await fetch(`/wilayah/api/regencies/${provinceCode}.json`);
    return pickData(await res.json());
  } catch (e) {
    console.error("Fetch regencies error:", e);
    return [];
  }
}

export async function getDistricts(regencyCode: string): Promise<WilayahItem[]> {
  try {
    const res = await fetch(`/wilayah/api/districts/${regencyCode}.json`);
    return pickData(await res.json());
  } catch (e) {
    console.error("Fetch districts error:", e);
    return [];
  }
}

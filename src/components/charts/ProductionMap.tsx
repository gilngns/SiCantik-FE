import { useEffect, useMemo } from "react";
import { MapContainer, GeoJSON, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonObject,
} from "geojson";
import type { DivIcon, LatLngExpression, PathOptions, Path } from "leaflet";

import geo from "../../assets/regions/example-bandung.json";

// ---- Types data pada GeoJSON ----
type RegionProps = {
  id: string;
  name: string;
  luas: number;      // Ha
  target: number;    // Ton
  produksi: number;  // Ton
};

// Cast data GeoJSON ke tipe yang tepat
const data = geo as FeatureCollection<Geometry, RegionProps>;

// Skala warna (gelap → sedang → muda) mirip Figma
const getColor = (v: number) => {
  if (v >= 25) return "#0B3E3A"; // Banyak
  if (v >= 15) return "#2C7A6B"; // Sedang
  return "#A7E3D1";              // Sedikit
};

// Fit bounds ke GeoJSON saat mount
function FitGeoJSONBounds({ data }: { data: FeatureCollection<Geometry, RegionProps> }) {
  const map = useMap();
  useEffect(() => {
    const gj = L.geoJSON(data as unknown as GeoJsonObject);
    const b = gj.getBounds();
    if (b.isValid()) map.fitBounds(b, { padding: [20, 20] });
  }, [map, data]);
  return null;
}

// Marker bulat dengan label (contoh: "Y")
function BubbleMarker({ position, label }: { position: LatLngExpression; label: string }) {
  const icon = useMemo<DivIcon>(
    () => L.divIcon({ className: "sic-marker", html: label }),
    [label]
  );
  return <Marker position={position} icon={icon} />;
}

export default function ProductionMap() {
  // Style per feature (tanpa any)
  const styleFn = (feature?: Feature<Geometry, RegionProps>): PathOptions => {
    const produksi = feature?.properties?.produksi ?? 0;
    return {
      fillColor: getColor(produksi),
      weight: 1,
      color: "#ffffff",
      fillOpacity: 1,
    };
  };

  // Tooltip & hover effect per feature (tanpa any)
  const onEachFeature = (feature: Feature<Geometry, RegionProps>, layer: L.Layer) => {
    const p = feature.properties!;
    const luas = p.luas ?? 0;
    const target = p.target ?? 0;
    const produksi = p.produksi ?? 0;
    const realisasi = target > 0 ? Math.round((produksi / target) * 100) : 0;

    (layer as Path).bindTooltip(
      `
        <div>
          <div style="font-weight:600;margin-bottom:6px">${p.name ?? "-"}</div>
          <div>Luas Lahan&nbsp; : ${luas} Ha</div>
          <div>Target Produksi : ${target} Ton</div>
          <div>Hasil Produksi  : ${produksi} Ton</div>
          <div>Realisasi (%)   : ${realisasi}%</div>
        </div>
      `,
      { sticky: true, className: "sic-tooltip" }
    );

    (layer as Path).on({
      mouseover: () => (layer as Path).setStyle({ weight: 2, color: "#e5e7eb" }),
      mouseout:  () => (layer as Path).setStyle({ weight: 1, color: "#ffffff" }),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Persebaran Hasil Produksi</h3>
          <p className="text-xs text-gray-500">Terakhir update: 1 September 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Visualisasi berdasarkan:</span>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#145C52]">
            <option>Bulan</option>
            <option>Tahun</option>
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 text-sm mb-4">
        <span className="flex items-center gap-2">
          <span className="w-4 h-2 rounded-sm inline-block" style={{ background: "#0B3E3A" }} />
          Hasil Produksi Banyak
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-2 rounded-sm inline-block" style={{ background: "#2C7A6B" }} />
          Hasil Produksi Sedang
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-2 rounded-sm inline-block" style={{ background: "#A7E3D1" }} />
          Hasil Produksi Sedikit
        </span>
      </div>

      {/* Map tanpa TileLayer (clean seperti Figma) */}
      <MapContainer
        center={[-7.0, 107.6]}   // fallback; akan di-fit otomatis
        zoom={10}
        className="h-[420px] w-full rounded-xl bg-[#F3F7F6]"
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl={false}
        doubleClickZoom={false}
      >
        <FitGeoJSONBounds data={data} />
        <GeoJSON data={data} style={styleFn} onEachFeature={onEachFeature} />

        {/* Marker "Y" (opsional) */}
        <BubbleMarker position={[-7.01, 107.62]} label="Y" />
      </MapContainer>
    </div>
  );
}

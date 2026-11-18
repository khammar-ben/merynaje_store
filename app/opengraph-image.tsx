/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img> */
import { ImageResponse } from "next/og";
import { getLogoDataUri } from "@/lib/logo.server";

export const dynamic = "force-static";
export const alt = "Mery Naje — Prêt-à-porter féminin à Casablanca";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const logo = getLogoDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6f0",
          padding: 36,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 64,
            border: "2px solid #c9a45c",
            borderRadius: 24,
            color: "#1e1a17",
          }}
        >
          {logo && <img src={logo} alt="" width={300} height={300} style={{ borderRadius: 150, objectFit: "cover" }} />}
          <div style={{ display: "flex", flexDirection: "column", alignItems: logo ? "flex-start" : "center" }}>
            <div style={{ fontSize: 96, letterSpacing: 10, color: "#8a6a2f" }}>MERY NAJE</div>
            <div style={{ width: 160, height: 2, background: "#c9a45c", margin: "18px 0 26px" }} />
            <div style={{ fontSize: 40 }}>Prêt-à-porter féminin · Casablanca</div>
            <div style={{ fontSize: 28, color: "#6b6158", marginTop: 18 }}>
              Livraison partout au Maroc · Paiement à la livraison
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

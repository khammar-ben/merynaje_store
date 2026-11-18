/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img> */
import { ImageResponse } from "next/og";
import { getLogoDataUri } from "@/lib/logo.server";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const logo = getLogoDataUri();
  return new ImageResponse(
    logo ? (
      <img src={logo} alt="" width={64} height={64} style={{ borderRadius: 32, objectFit: "cover" }} />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6f0",
          border: "3px solid #c9a45c",
          borderRadius: 32,
          color: "#8a6a2f",
          fontSize: 26,
          letterSpacing: 1,
        }}
      >
        MN
      </div>
    ),
    size,
  );
}

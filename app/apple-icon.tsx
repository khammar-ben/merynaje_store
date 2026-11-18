/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img> */
import { ImageResponse } from "next/og";
import { getLogoDataUri } from "@/lib/logo.server";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        {logo ? (
          <img src={logo} alt="" width={160} height={160} style={{ borderRadius: 80, objectFit: "cover" }} />
        ) : (
          <div
            style={{
              width: 150,
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid #c9a45c",
              borderRadius: 75,
              color: "#8a6a2f",
              fontSize: 58,
              letterSpacing: 3,
            }}
          >
            MN
          </div>
        )}
      </div>
    ),
    size,
  );
}

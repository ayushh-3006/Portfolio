import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * Social preview, generated at build time — no image asset to maintain and
 * nothing to go stale when the copy changes.
 */
export const alt = `${site.name} — You bring the idea. I turn it into software.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#08090a",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Accent bloom, matching the site's single-accent language. */}
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -120,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(61,123,255,0.30), rgba(8,9,10,0))",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 9999,
            background: "#3d7bff",
          }}
        />
        <div style={{ color: "#f4f5f7", fontSize: 26, fontWeight: 500 }}>
          {site.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#f4f5f7",
            fontSize: 78,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            fontWeight: 500,
          }}
        >
          You bring the idea.
        </div>
        <div
          style={{
            color: "#8b919b",
            fontSize: 78,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            fontWeight: 500,
          }}
        >
          I turn it into software.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 28,
        }}
      >
        <div style={{ color: "#8b919b", fontSize: 24 }}>
          Custom software · Web apps · Mobile · AI products
        </div>
        <div style={{ color: "#5c626c", fontSize: 22 }}>
          {site.location.country}
        </div>
      </div>
    </div>,
    size,
  );
}

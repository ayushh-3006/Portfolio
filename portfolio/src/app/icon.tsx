import { ImageResponse } from "next/og";

/** Favicon: the accent mark that opens the wordmark, on the site's canvas. */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#08090a",
        borderRadius: 7,
        color: "#3d7bff",
        fontSize: 21,
        fontWeight: 600,
        fontFamily: "sans-serif",
      }}
    >
      I
    </div>,
    size,
  );
}

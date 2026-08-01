import { ImageResponse } from "next/og";

export const alt = "RoseAudit — Wealth Architecture for Generational Legacy";
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
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "64px",
        backgroundColor: "#14110F",
        position: "relative",
      }}
    >
      {/* Gold accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "#B8924A",
        }}
      />

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontSize: "13px",
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#B8924A",
            fontWeight: "600",
          }}
        >
          RoseAudit
        </div>
        <div
          style={{
            fontSize: "56px",
            color: "#F7F3EC",
            lineHeight: 1.05,
            fontWeight: "300",
            maxWidth: "840px",
            fontFamily: "Georgia, serif",
          }}
        >
          Wealth Architecture for Generational Legacy
        </div>
        <div
          style={{
            fontSize: "17px",
            color: "rgba(247,243,236,0.55)",
            fontFamily: "Arial, Helvetica, sans-serif",
            marginTop: "4px",
          }}
        >
          Rose M. Apabeloi · Accountant · Norway
        </div>
      </div>

      {/* Decorative emerald block */}
      <div
        style={{
          position: "absolute",
          right: "64px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "240px",
          height: "240px",
          backgroundColor: "rgba(31,77,58,0.4)",
          borderRadius: "20px",
        }}
      />
    </div>,
    size
  );
}

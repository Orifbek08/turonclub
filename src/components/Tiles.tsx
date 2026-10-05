/**
 * Sakkiz qirrali yulduz va xoch koshinlari naqshi (Samarqand va Buxoro
 * obidalaridagi an'anaviy terma). Saytning asosiy bezagi: bosh sahifa
 * tepasida va rasm qo'yilmagan joylarda ishlatiladi.
 */
const R = 50;
const r = R * 0.7654;

const STAR = Array.from({ length: 16 }, (_, k) => {
  const a = (k * Math.PI) / 8;
  const rad = k % 2 === 0 ? R : r;
  return `${(Math.cos(a) * rad).toFixed(2)},${(Math.sin(a) * rad).toFixed(2)}`;
}).join(" ");

export function Tiles({
  cols,
  rows,
  seed = 0,
  tone = "dark",
  animate = false,
  className = "",
}: {
  cols: number;
  rows: number;
  seed?: number;
  tone?: "dark" | "light";
  animate?: boolean;
  className?: string;
}) {
  const stroke = tone === "dark" ? "var(--color-lapis-soft)" : "var(--color-line)";
  const soft = tone === "dark" ? "var(--color-lapis-soft)" : "#e4e6e0";
  const cells: { x: number; y: number; fill: string | null; i: number }[] = [];
  let order = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const h = (i * 7 + j * 13 + seed) % 17;
      const fill =
        h === 0 ? "var(--color-glaze)" : h === 5 ? "var(--color-brass)" : h === 9 || h === 12 ? soft : null;
      cells.push({ x: i * 100 + 50, y: j * 100 + 50, fill, i: fill ? order++ : 0 });
    }
  }
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${cols * 100} ${rows * 100}`}
      preserveAspectRatio="xMidYMid slice"
      className={`${animate ? "tiles-animate" : ""} ${className}`}
    >
      {cells.map((c) => (
        <g key={`${c.x}-${c.y}`} transform={`translate(${c.x} ${c.y})`}>
          {c.fill && (
            <polygon
              points={STAR}
              fill={c.fill}
              className="tile-fill"
              style={{ ["--i" as string]: c.i }}
            />
          )}
          <polygon points={STAR} fill="none" stroke={stroke} strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}

/** Logotip belgisi: bitta yulduz */
export function StarMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="-52 -52 104 104" className={className}>
      <polygon points={STAR} fill="currentColor" />
    </svg>
  );
}

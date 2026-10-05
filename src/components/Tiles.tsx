/**
 * Sakkiz qirrali yulduz va xoch koshinlari naqshi (Samarqand va Buxoro
 * obidalaridagi an'anaviy terma), oltin chiziqlarda. Bosh sahifa fonida
 * va rasm qo'yilmagan joylarda ishlatiladi.
 */
const R = 50;
const r = R * 0.7654;

export const STAR = Array.from({ length: 16 }, (_, k) => {
  const a = (k * Math.PI) / 8;
  const rad = k % 2 === 0 ? R : r;
  return `${(Math.cos(a) * rad).toFixed(2)},${(Math.sin(a) * rad).toFixed(2)}`;
}).join(" ");

export function Tiles({
  cols,
  rows,
  seed = 0,
  live = false,
  density = 17,
  className = "",
  style,
}: {
  cols: number;
  rows: number;
  seed?: number;
  /** true bo'lsa, rangli koshinlar sekin miltillaydi */
  live?: boolean;
  /** kichikroq son = rangli koshinlar ko'proq */
  density?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const id = `tg-${cols}-${rows}-${seed}`;
  const cells: { x: number; y: number; fill: string | null; i: number }[] = [];
  let order = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const h = (i * 7 + j * 13 + seed) % density;
      const fill = h === 0 ? `url(#${id})` : h === 5 ? "#8c6f33" : h === 9 || h === 12 ? "#10134f" : null;
      cells.push({ x: i * 100 + 50, y: j * 100 + 50, fill, i: fill ? order++ : 0 });
    }
  }
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${cols * 100} ${rows * 100}`}
      preserveAspectRatio="xMidYMid slice"
      className={`${live ? "tiles-live" : ""} ${className}`}
      style={style}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8c6f33" />
          <stop offset="0.5" stopColor="#f1e0b4" />
          <stop offset="1" stopColor="#b08f4c" />
        </linearGradient>
      </defs>
      {cells.map((c) => (
        <g key={`${c.x}-${c.y}`} transform={`translate(${c.x} ${c.y})`}>
          {c.fill && (
            <polygon points={STAR} fill={c.fill} className="tile-fill" style={{ ["--i" as string]: c.i }} />
          )}
          <polygon points={STAR} fill="none" stroke="rgba(201,169,106,0.2)" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

/** Bitta yulduz: ajratuvchi belgi sifatida */
export function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="-52 -52 104 104" className={className}>
      <polygon points={STAR} fill="currentColor" />
    </svg>
  );
}

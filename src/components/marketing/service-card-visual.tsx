/**
 * Simplified per-service animated visuals for the Diensten grid.
 * The prototype has more elaborate versions — these keep the idea (waveform,
 * chat, flow graph, skeleton, KPI bars, checklist) at a fraction of the code.
 * All pure CSS; the reduced-motion reset in globals.css freezes them.
 */

const panel = "relative h-56 overflow-hidden border-y border-[#EEEBE2] bg-paper-2";

function Waveform() {
  const bars = [8, 13, 10, 17, 23, 15, 27, 19, 33, 25, 37, 29, 23, 17, 12, 20, 14];
  return (
    <div className={panel}>
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center gap-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-navy"
            style={{
              height: h,
              transformOrigin: "center",
              animation: "vz-wave 2.1s cubic-bezier(.4,0,.2,1) infinite",
              animationDelay: `${i * 0.09}s`,
              background: i > 7 && i < 14 ? "var(--color-coral)" : undefined,
            }}
          />
        ))}
      </div>
      <span className="eyebrow absolute left-5 top-4 text-[9px] text-muted-ink">Live gesprek</span>
    </div>
  );
}

function Chat() {
  const bubbles = [
    { side: "end", bg: "bg-navy text-paper", text: "Kan ik mijn maat nog ruilen?", d: 0 },
    { side: "start", bg: "bg-white border border-line text-ink", text: "Zeker, ik regel het direct.", d: 1.8 },
    {
      side: "start",
      bg: "bg-coral/10 border border-coral/40 text-ink",
      text: "Ruilbon verstuurd ✓",
      d: 3.6,
    },
  ] as const;
  return (
    <div className={panel}>
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-7">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className={`max-w-[88%] rounded-[13px] px-3 py-1.5 text-[11.5px] leading-snug ${b.bg} ${
              b.side === "end" ? "self-end" : "self-start"
            }`}
            style={{ animation: "vz-chat-in 15s cubic-bezier(.4,0,.2,1) infinite", animationDelay: `${b.d}s` }}
          >
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function Flow() {
  return (
    <div className={panel}>
      <svg viewBox="0 0 240 190" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {["M32,32 L32,95 L98,95", "M208,32 L208,95 L142,95", "M120,117 L120,152 L32,152 L32,160", "M120,117 L120,152 L208,152 L208,160"].map(
          (d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="rgba(17,29,54,.22)" strokeWidth={1.2} />
              <path
                d={d}
                fill="none"
                stroke="var(--color-coral)"
                strokeWidth={1.8}
                strokeDasharray="14 146"
                style={{ animation: "vz-flow 4.6s linear infinite", animationDelay: `${i * 1.1}s` }}
              />
            </g>
          ),
        )}
      </svg>
      {["SHOP", "ERP", "WMS", "CRM"].map((label, i) => (
        <div
          key={label}
          className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line bg-white font-mono text-[9px] tracking-[0.12em] text-ink"
          style={{
            left: i % 2 === 0 ? "13.3%" : "86.7%",
            top: i < 2 ? "10%" : "90%",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function Skeleton() {
  return (
    <div className={panel}>
      <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-8">
        <span className="eyebrow text-[9px] text-muted-ink">viesa.nl</span>
        {[58, 82, 70].map((w, i) => (
          <span
            key={i}
            className="h-2 rounded bg-ink/15"
            style={{
              width: `${w}%`,
              animation: "vz-skel 3.4s cubic-bezier(.4,0,.2,1) infinite",
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
        <div className="mt-1.5 flex gap-2">
          <div className="h-5 w-14 rounded bg-coral" />
          <div className="h-5 w-11 rounded border border-ink/25 bg-white" />
        </div>
      </div>
    </div>
  );
}

function Kpi() {
  return (
    <div className={panel}>
      <div className="absolute inset-x-7 top-7 flex flex-col gap-3.5">
        {[
          { label: "ORDERS", w: 78, value: "1.284", c: "var(--color-navy)" },
          { label: "UREN BESPAARD", w: 64, value: "312", c: "var(--color-coral)" },
        ].map((row, i) => (
          <div key={row.label} className="flex items-center gap-2.5">
            <span className="w-20 font-mono text-[8.5px] text-muted-ink">{row.label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded bg-ink/10">
              <span
                className="block h-full origin-left rounded"
                style={{
                  width: `${row.w}%`,
                  background: row.c,
                  animation: "vz-grow 6.8s cubic-bezier(.33,0,.2,1) infinite",
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            </span>
            <span className="w-10 text-right text-[12.5px] font-bold text-ink">{row.value}</span>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full">
        <path
          d="M4,54 L40,48 L76,50 L112,40 L148,42 L184,30 L220,33 L256,18 L296,10"
          fill="none"
          stroke="var(--color-coral)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Checklist() {
  const items = ["Offerte goedgekeurd", "Order in productie", "Factuur verzonden", "Levering gepland"];
  return (
    <div className={panel}>
      <div className="absolute inset-0 flex flex-col justify-center gap-3 px-8">
        {items.map((label, i) => (
          <div key={label} className="flex items-center gap-2.5" style={{ opacity: i === 3 ? 0.45 : 1 }}>
            <span
              className="flex h-[15px] w-[15px] items-center justify-center rounded bg-coral text-[9px] font-extrabold text-white"
              style={{
                animation: i < 3 ? "vz-tick 8.4s cubic-bezier(.4,0,.2,1) infinite" : undefined,
                animationDelay: `${i * 1.4}s`,
                background: i === 3 ? "transparent" : undefined,
                border: i === 3 ? "1px solid rgba(17,29,54,.35)" : undefined,
              }}
            >
              {i < 3 ? "✓" : ""}
            </span>
            <span className="text-[12.5px] font-semibold text-ink">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const map: Record<string, () => React.JSX.Element> = {
  "ai-calling-agents": Waveform,
  "ai-chatbots": Chat,
  "workflow-automatisering": Flow,
  "websites-apps": Skeleton,
  "kpi-dashboards": Kpi,
  "software-portalen": Checklist,
};

export function ServiceCardVisual({ slug }: { slug: string }) {
  const Visual = map[slug] ?? Skeleton;
  return <Visual />;
}

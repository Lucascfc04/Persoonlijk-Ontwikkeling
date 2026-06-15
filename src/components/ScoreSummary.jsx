import { progressWidth, scoreColor } from "../utils/scoring";

export default function ScoreSummary({ title, score, weighted, label, average, compact = false }) {
  return (
    <div className={`rounded-[1.75rem] border border-emerald-100 bg-white/90 p-5 shadow-sm ${compact ? "" : "h-full"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className={`mt-1 text-2xl font-bold capitalize ${scoreColor(score)}`}>{label}</h3>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-slate-900">{score}/4</p>
          <p className="text-sm text-slate-500">{weighted} gewogen punten</p>
        </div>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-teal-500 transition-all duration-500"
          style={{ width: progressWidth(score) }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-600">Gemiddelde zelftoets: {average.toFixed(2)}</p>
    </div>
  );
}

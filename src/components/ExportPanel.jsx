export default function ExportPanel({ onExport, onDownloadFinal, onCopyPitch, copied }) {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-7 shadow-lg shadow-emerald-950/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Export</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900">Exporteer samenvatting</h2>
        <p className="mt-4 text-base leading-7 text-slate-700">
          Download een tekstbestand met projectcontext, reflectieteksten, geselecteerd bewijs, scores, gewogen punten,
          totaalscore, eindcijfer, status en jouw oefenantwoorden.
        </p>
        <button
          type="button"
          onClick={onExport}
          className="mt-6 rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Exporteer samenvatting
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-7 shadow-lg shadow-emerald-950/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Inleverversie</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900">Download eindversie</h2>
        <p className="mt-4 text-base leading-7 text-slate-700">
          Download een schone tekstversie van jouw huidige reflectieteksten per criterium. Deze export bevat alleen jouw
          inhoudelijke verslagstructuur, zodat je hem nog rustig zelf kunt nalopen en verder kunt aanscherpen.
        </p>
        <button
          type="button"
          onClick={onDownloadFinal}
          className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Download eindversie
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-7 shadow-lg shadow-emerald-950/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Assessmentpitch</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900">Kopieer assessmentpitch</h2>
        <p className="mt-4 text-base leading-7 text-slate-700">
          Maak in een klik een korte openingspitch op basis van jouw project, eigen bijdrage, beroepsproducten, leerpunt en
          ontwikkeling als circulaire professional.
        </p>
        <button
          type="button"
          onClick={onCopyPitch}
          className="mt-6 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
        >
          Kopieer assessmentpitch
        </button>
        {copied ? <p className="mt-4 text-sm font-medium text-teal-700">De pitch staat nu in je klembord.</p> : null}
      </div>
    </section>
  );
}

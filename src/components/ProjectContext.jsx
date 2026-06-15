export default function ProjectContext({ projectContext }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-7 shadow-lg shadow-emerald-950/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{projectContext.subtitle}</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900">{projectContext.title}</h2>
        <p className="mt-4 text-base leading-8 text-slate-700">{projectContext.summary}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-emerald-50 p-5">
            <p className="text-sm text-slate-500">Locatie</p>
            <p className="mt-1 text-xl font-bold text-emerald-950">{projectContext.location}</p>
          </div>
          <div className="rounded-[1.5rem] bg-lime-50 p-5">
            <p className="text-sm text-slate-500">Kern van het concept</p>
            <p className="mt-1 text-xl font-bold text-emerald-950">{projectContext.core}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-7 shadow-lg shadow-emerald-950/10">
        <div className="grid gap-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Mogelijke onderdelen</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {projectContext.elements.map((item) => (
                <span key={item} className="rounded-full bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-900">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">Doelgroepen</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {projectContext.audiences.map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">Maatschappelijke waarde</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              {projectContext.valuePoints.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-900">Let op in je assessment</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-amber-900/90">
              {projectContext.reminders.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

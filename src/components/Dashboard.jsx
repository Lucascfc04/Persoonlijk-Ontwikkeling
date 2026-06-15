import ScoreSummary from "./ScoreSummary";

export default function Dashboard({ criteria, results, projectContext }) {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-[radial-gradient(circle_at_top_left,_rgba(163,230,53,0.22),_transparent_35%),linear-gradient(135deg,_#0f3d2e,_#184d3d_55%,_#215b49)] p-8 text-white shadow-xl shadow-emerald-950/15">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_45%,transparent_100%)]" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-100">Assessmentchecker Minor Circulaire Economie</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
              Persoonlijke voorbereiding op mijn assessment over de Green Blue HYROX Hub
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/90">
              Gebruik deze tool om per criterium je reflectietekst te scherpen, bewijs te verzamelen, zelftoetsvragen te beantwoorden
              en direct te zien hoe sterk jouw verslag nu staat.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-950/10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Totaaloverzicht</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Totaalscore</p>
              <p className="mt-1 text-3xl font-black text-slate-900">{results.totalPoints}/48</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Eindcijfer</p>
              <p className="mt-1 text-3xl font-black text-slate-900">{results.eindcijfer}</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-1 text-2xl font-black capitalize text-emerald-900">{results.status}</p>
            </div>
          </div>
        </div>
      </div>

      {results.eigenaarschapWarning ? (
        <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-5 text-rose-800 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em]">Drempelwaarschuwing</p>
          <p className="mt-2 text-base font-medium">
            Let op: eigenaarschap is een drempelcriterium. Een onvoldoende op dit criterium kan betekenen dat het hele assessment
            onvoldoende is.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {criteria.map((criterion) => {
          const result = results.byCriterion[criterion.id];

          return (
            <ScoreSummary
              key={criterion.id}
              title={`Criterium ${criterion.nummer} - ${criterion.naam}`}
              score={result.score}
              weighted={result.weighted}
              label={result.label}
              average={result.average}
              compact
            />
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-950/10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Korte uitleg</p>
          <p className="mt-3 text-base leading-7 text-slate-700">
            De criteria gebruiken een zelftoets op basis van Nee, Deels, Ja en Sterk. De gemiddelde score per criterium wordt
            omgezet naar een assessmentscore van 1 tot 4 en daarna gewogen volgens het beoordelingsformulier. Zo zie je meteen
            waar je verslag nog te weinig concreet, te weinig onderbouwd of juist al sterk is.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-950/10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Projectcontext in het kort</p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">{projectContext.projectName}</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">{projectContext.summary}</p>
        </div>
      </div>
    </section>
  );
}

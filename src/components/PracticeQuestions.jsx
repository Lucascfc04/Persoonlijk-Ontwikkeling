export default function PracticeQuestions({ criteria, practiceAnswers, onPracticeAnswerChange }) {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-950/10">
        <h2 className="text-3xl font-black text-slate-900">Assessmentvragen oefenen</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
          Klik door de vragen per criterium heen en schrijf alvast kernachtige antwoorden. Alles wordt lokaal opgeslagen in
          `localStorage`, zodat je jouw oefenantwoorden later weer terugziet.
        </p>
      </div>

      {criteria.map((criterion) => (
        <article
          key={criterion.id}
          className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-950/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Criterium {criterion.nummer}</p>
              <h3 className="mt-2 text-2xl font-black text-slate-900">{criterion.naam}</h3>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-900">
              {criterion.assessorQuestions.length} oefenvragen
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {criterion.assessorQuestions.map((question) => (
              <details key={question} className="group rounded-[1.5rem] border border-emerald-100 bg-emerald-50/60 p-4">
                <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-slate-800">
                  {question}
                </summary>
                <textarea
                  value={practiceAnswers[criterion.id]?.[question] || ""}
                  onChange={(event) => onPracticeAnswerChange(criterion.id, question, event.target.value)}
                  placeholder="Typ hier je oefenantwoord..."
                  className="mt-4 min-h-[140px] w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-emerald-500"
                />
              </details>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

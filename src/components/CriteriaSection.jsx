import { scoreOptionLabels } from "../data/criteria";
import ScoreSummary from "./ScoreSummary";
import EvidenceChecklist from "./EvidenceChecklist";

export default function CriteriaSection({
  criteria,
  reflections,
  answersByCriterion,
  evidenceByCriterion,
  results,
  onReflectionChange,
  onAnswerChange,
  onEvidenceToggle
}) {
  return (
    <section className="space-y-6">
      {criteria.map((criterion) => {
        const result = results.byCriterion[criterion.id];
        const answers = answersByCriterion[criterion.id] || [];
        const selectedEvidence = evidenceByCriterion[criterion.id] || [];

        return (
          <article
            key={criterion.id}
            className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-950/10"
          >
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-900 px-3 py-1 text-sm font-semibold text-white">
                    Criterium {criterion.nummer}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    Weging x{criterion.weging}
                  </span>
                  {criterion.threshold ? (
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                      Drempelcriterium
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-4 text-3xl font-black text-slate-900">{criterion.naam}</h2>
                <p className="mt-2 text-base font-medium text-emerald-900">{criterion.omschrijving}</p>
                <p className="mt-4 text-base leading-7 text-slate-700">{criterion.whatToShow}</p>

                <div className="mt-5 rounded-[1.5rem] bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Waarop wordt gelet</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {criterion.focusPoints.map((point) => (
                      <span key={point} className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ScoreSummary
                title={`Score ${criterion.naam}`}
                score={result.score}
                weighted={result.weighted}
                label={result.label}
                average={result.average}
              />
            </div>

            {criterion.threshold && result.score === 1 ? (
              <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800">
                {criterion.thresholdMessage}
              </div>
            ) : null}

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-900">Reflectietekst</h3>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
                    Aanpasbaar
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Dit tekstveld bevat standaardinhoud. Pas het aan zodat jouw mondelinge verdediging nog scherper wordt.
                </p>
                <textarea
                  value={reflections[criterion.id]}
                  onChange={(event) => onReflectionChange(criterion.id, event.target.value)}
                  className="mt-4 min-h-[360px] w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5">
                  <h3 className="text-lg font-bold text-slate-900">Zelftoetsvragen</h3>
                  <p className="mt-2 text-sm text-slate-600">Beantwoord per vraag hoe sterk dit nu in jouw verslag zichtbaar is.</p>
                  <div className="mt-5 space-y-5">
                    {criterion.selfCheckQuestions.map((question, index) => (
                      <div key={question} className="rounded-[1.25rem] bg-slate-50 p-4">
                        <p className="text-sm font-medium leading-6 text-slate-800">{question}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {scoreOptionLabels.map((option) => {
                            const active = answers[index] === option.value;

                            return (
                              <button
                                key={option.label}
                                type="button"
                                onClick={() => onAnswerChange(criterion.id, index, option.value)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                  active
                                    ? "bg-emerald-900 text-white shadow"
                                    : "bg-white text-slate-700 hover:bg-emerald-100"
                                }`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <EvidenceChecklist
                  criterion={criterion}
                  selectedEvidence={selectedEvidence}
                  onToggle={onEvidenceToggle}
                  showSummary={false}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[1.5rem] bg-emerald-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Verbeteradvies</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{result.advice}</p>
              </div>

              <div className="rounded-[1.5rem] bg-lime-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Assessmenttip</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{criterion.assessmentTip}</p>
              </div>

              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Mogelijke assesservragen</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {criterion.assessorQuestions.slice(0, 3).map((question) => (
                    <li key={question}>• {question}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import ProjectContext from "./components/ProjectContext";
import CriteriaSection from "./components/CriteriaSection";
import EvidenceChecklist from "./components/EvidenceChecklist";
import PracticeQuestions from "./components/PracticeQuestions";
import ExportPanel from "./components/ExportPanel";
import { criteria } from "./data/criteria";
import { defaultReflection } from "./data/defaultReflection";
import { projectContext } from "./data/projectContext";
import { buildAssessmentResults } from "./utils/scoring";
import { buildAssessmentPitch, buildExportSummary, buildFinalSubmission, downloadSummary } from "./utils/exportSummary";

const STORAGE_KEY = "minor-circulaire-economie-assessmentchecker";

function buildInitialAnswers() {
  return criteria.reduce((accumulator, criterion) => {
    accumulator[criterion.id] = criterion.selfCheckQuestions.map(() => 0);
    return accumulator;
  }, {});
}

function buildInitialEvidence() {
  return criteria.reduce((accumulator, criterion) => {
    accumulator[criterion.id] = [];
    return accumulator;
  }, {});
}

function buildInitialPracticeAnswers() {
  return criteria.reduce((accumulator, criterion) => {
    accumulator[criterion.id] = criterion.assessorQuestions.reduce((questionMap, question) => {
      questionMap[question] = "";
      return questionMap;
    }, {});
    return accumulator;
  }, {});
}

function buildInitialState() {
  return {
    activeView: "dashboard",
    reflections: {
      beroepsproducten: defaultReflection.beroepsproducten,
      eigenaarschap: defaultReflection.eigenaarschap,
      reflectie: defaultReflection.reflectie,
      leerproces: defaultReflection.leerproces,
      ontwikkeling: defaultReflection.ontwikkeling
    },
    answersByCriterion: buildInitialAnswers(),
    evidenceByCriterion: buildInitialEvidence(),
    practiceAnswers: buildInitialPracticeAnswers()
  };
}

function loadState() {
  if (typeof window === "undefined") {
    return buildInitialState();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return buildInitialState();
    }

    const parsed = JSON.parse(raw);
    return {
      ...buildInitialState(),
      ...parsed,
      reflections: {
        ...buildInitialState().reflections,
        ...(parsed.reflections || {})
      },
      answersByCriterion: {
        ...buildInitialState().answersByCriterion,
        ...(parsed.answersByCriterion || {})
      },
      evidenceByCriterion: {
        ...buildInitialState().evidenceByCriterion,
        ...(parsed.evidenceByCriterion || {})
      },
      practiceAnswers: {
        ...buildInitialState().practiceAnswers,
        ...(parsed.practiceAnswers || {})
      }
    };
  } catch {
    return buildInitialState();
  }
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!copied) return undefined;

    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const results = buildAssessmentResults(criteria, state.answersByCriterion, state.evidenceByCriterion);

  function handleReflectionChange(criterionId, value) {
    setState((current) => ({
      ...current,
      reflections: {
        ...current.reflections,
        [criterionId]: value
      }
    }));
  }

  function handleAnswerChange(criterionId, index, value) {
    setState((current) => ({
      ...current,
      answersByCriterion: {
        ...current.answersByCriterion,
        [criterionId]: current.answersByCriterion[criterionId].map((entry, entryIndex) =>
          entryIndex === index ? value : entry
        )
      }
    }));
  }

  function handleEvidenceToggle(criterionId, label) {
    setState((current) => {
      const selected = current.evidenceByCriterion[criterionId];
      const nextSelected = selected.includes(label) ? selected.filter((item) => item !== label) : [...selected, label];

      return {
        ...current,
        evidenceByCriterion: {
          ...current.evidenceByCriterion,
          [criterionId]: nextSelected
        }
      };
    });
  }

  function handlePracticeAnswerChange(criterionId, question, value) {
    setState((current) => ({
      ...current,
      practiceAnswers: {
        ...current.practiceAnswers,
        [criterionId]: {
          ...current.practiceAnswers[criterionId],
          [question]: value
        }
      }
    }));
  }

  function handleReset() {
    const confirmed = window.confirm("Weet je zeker dat je alle ingevulde reflecties, antwoorden en bewijs wilt resetten?");

    if (!confirmed) return;

    const freshState = buildInitialState();
    window.localStorage.removeItem(STORAGE_KEY);
    setState(freshState);
  }

  function handleExport() {
    const content = buildExportSummary({
      criteria,
      projectContext,
      reflections: state.reflections,
      evidenceByCriterion: state.evidenceByCriterion,
      practiceAnswers: state.practiceAnswers,
      results
    });

    downloadSummary("assessmentchecker-samenvatting.txt", content);
  }

  function handleDownloadFinal() {
    const content = buildFinalSubmission({
      criteria,
      projectContext,
      reflections: state.reflections
    });

    downloadSummary("reflectieverslag-eindversie.txt", content);
  }

  async function handleCopyPitch() {
    const pitch = buildAssessmentPitch(criteria, state.reflections, results, projectContext);

    try {
      await window.navigator.clipboard.writeText(pitch);
      setCopied(true);
    } catch {
      window.prompt("Kopieer hieronder je assessmentpitch:", pitch);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(163,230,53,0.18),_transparent_28%),linear-gradient(180deg,_#eef5ef_0%,_#f6f7f3_42%,_#edf4f0_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-[2.25rem] border border-white/60 bg-white/75 p-6 shadow-lg shadow-emerald-950/10 backdrop-blur md:p-8">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-800">Persoonlijke assessmentvoorbereiding</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                Assessmentchecker Minor Circulaire Economie
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
                Deze lokale webapp helpt je jouw reflectieverslag voor de Green Blue HYROX Hub systematisch te beoordelen,
                verbeteren en mondeling voor te bereiden zonder backend, database of AI API.
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-emerald-950 p-5 text-white shadow-lg shadow-emerald-950/20">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Belangrijkste focus</p>
              <p className="mt-3 text-lg font-semibold leading-7">
                Eigenaarschap krijgt extra aandacht, omdat dit criterium een drempelcriterium is voor jouw assessment.
              </p>
            </div>
          </div>
        </header>

        <Navigation activeView={state.activeView} onChange={(activeView) => setState((current) => ({ ...current, activeView }))} onReset={handleReset} />

        <main className="mt-6 pb-10">
          {state.activeView === "dashboard" ? (
            <Dashboard criteria={criteria} results={results} projectContext={projectContext} />
          ) : null}

          {state.activeView === "project" ? <ProjectContext projectContext={projectContext} /> : null}

          {state.activeView === "criteria" ? (
            <CriteriaSection
              criteria={criteria}
              reflections={state.reflections}
              answersByCriterion={state.answersByCriterion}
              evidenceByCriterion={state.evidenceByCriterion}
              results={results}
              onReflectionChange={handleReflectionChange}
              onAnswerChange={handleAnswerChange}
              onEvidenceToggle={handleEvidenceToggle}
            />
          ) : null}

          {state.activeView === "bewijs" ? (
            <section className="space-y-6">
              <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-950/10">
                <h2 className="text-3xl font-black text-slate-900">Bewijschecker</h2>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                  Gebruik deze sectie om per criterium te controleren of je genoeg bewijs hebt, of je bewijs sterk genoeg is en
                  welke stukken vooral jouw eigen bijdrage laten zien.
                </p>
              </div>

              {criteria.map((criterion) => {
                const selectedEvidence = state.evidenceByCriterion[criterion.id] || [];
                const result = results.byCriterion[criterion.id];

                return (
                  <article
                    key={criterion.id}
                    className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-950/10"
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Criterium {criterion.nummer}</p>
                        <h3 className="mt-2 text-2xl font-black text-slate-900">{criterion.naam}</h3>
                      </div>
                      <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                        {result.evidenceInfo.label}
                      </div>
                    </div>

                    <EvidenceChecklist
                      criterion={criterion}
                      selectedEvidence={selectedEvidence}
                      onToggle={handleEvidenceToggle}
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <div className="rounded-[1.5rem] bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">Aantal bewijsstukken</p>
                        <p className="mt-2 text-3xl font-black text-slate-900">{selectedEvidence.length}</p>
                      </div>
                      <div className="rounded-[1.5rem] bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">Bewijsniveau</p>
                        <p className={`mt-2 text-2xl font-black capitalize ${result.evidenceInfo.color}`}>{result.evidenceInfo.label}</p>
                      </div>
                      <div className="rounded-[1.5rem] bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">Tip</p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{result.evidenceInfo.tip}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-[1.5rem] border border-dashed border-emerald-200 bg-emerald-50/70 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Eigen bijdrage zichtbaar in</p>
                      <p className="mt-2 text-sm leading-7 text-slate-700">
                        {result.ownContributionEvidence.length
                          ? result.ownContributionEvidence.join(", ")
                          : "Nog geen bewijs geselecteerd dat expliciet jouw eigen bijdrage laat zien."}
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : null}

          {state.activeView === "oefenen" ? (
            <PracticeQuestions
              criteria={criteria}
              practiceAnswers={state.practiceAnswers}
              onPracticeAnswerChange={handlePracticeAnswerChange}
            />
          ) : null}

          {state.activeView === "export" ? (
            <ExportPanel
              onExport={handleExport}
              onDownloadFinal={handleDownloadFinal}
              onCopyPitch={handleCopyPitch}
              copied={copied}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}

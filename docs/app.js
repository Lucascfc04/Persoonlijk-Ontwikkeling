import { criteria, defaultReflection, projectContext, reportSource, scoreOptionLabels } from "./data.js";

const STORAGE_KEY = "minor-circulaire-economie-assessmentchecker-static";
const MAX_TOTAL_POINTS = 48;
const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "project", label: "Mijn Project" },
  { id: "criteria", label: "Criteria" },
  { id: "bewijs", label: "Bewijschecker" },
  { id: "oefenen", label: "Oefenmodus" },
  { id: "export", label: "Export" }
];

function averageAnswers(values = []) {
  return values.length ? values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length : 0;
}

function scoreFromAverage(average) {
  if (average < 0.75) return 1;
  if (average < 1.5) return 2;
  if (average < 2.4) return 3;
  return 4;
}

function scoreLabel(score) {
  return ["", "onvoldoende", "matig", "voldoende", "goed"][score];
}

function evidenceStrength(selectedCount) {
  if (selectedCount <= 2) return { label: "weinig bewijs", tip: "Voeg extra bewijs toe dat jouw keuzes, rol en onderbouwing zichtbaar maakt.", className: "warn" };
  if (selectedCount <= 5) return { label: "voldoende bewijs", tip: "Je basis is aanwezig. Kies vooral bewijs dat jouw eigen bijdrage en onderbouwing concreet laat zien.", className: "ok" };
  return { label: "sterk bewijs", tip: "Houd het bewijs scherp en relevant. Kies de stukken die jij in het assessment het best kunt toelichten.", className: "ok" };
}

function improvementAdvice(score) {
  if (score === 1) return "Dit criterium is nog onvoldoende zichtbaar. Maak concreter wat je hebt gedaan, waarom je dat hebt gedaan en welk bewijs daarbij hoort.";
  if (score === 2) return "De basis is aanwezig, maar de onderbouwing kan sterker. Voeg concrete voorbeelden, keuzes en extra bewijs toe.";
  if (score === 3) return "Dit criterium is voldoende. Om richting goed te gaan kun je nog scherper laten zien waarom jouw keuzes professioneel en inhoudelijk sterk zijn.";
  return "Dit criterium is sterk. Houd je tekst scherp, concreet en bewijsgericht zodat je deze kwaliteit ook mondeling overtuigend kunt verdedigen.";
}

function statusFromPoints(totalPoints) {
  if (totalPoints <= 24) return "onvoldoende";
  if (totalPoints <= 26) return "grens zakken/slagen";
  if (totalPoints <= 35) return "voldoende";
  return "goed";
}

function finalGrade(totalPoints) {
  return Math.round((((totalPoints / MAX_TOTAL_POINTS) * 9) + 1) * 10) / 10;
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
    reportLoaded: true,
    answersByCriterion: Object.fromEntries(criteria.map((criterion) => [criterion.id, criterion.selfCheckQuestions.map(() => 0)])),
    evidenceByCriterion: Object.fromEntries(criteria.map((criterion) => [criterion.id, []])),
    practiceAnswers: Object.fromEntries(criteria.map((criterion) => [criterion.id, Object.fromEntries(criterion.assessorQuestions.map((question) => [question, ""]))]))
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...buildInitialState(), ...JSON.parse(raw) } : buildInitialState();
  } catch {
    return buildInitialState();
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function buildResults() {
  const byCriterion = {};
  criteria.forEach((criterion) => {
    const answers = state.answersByCriterion[criterion.id] || [];
    const evidence = state.evidenceByCriterion[criterion.id] || [];
    const average = averageAnswers(answers);
    const score = scoreFromAverage(average);
    byCriterion[criterion.id] = {
      average,
      score,
      weighted: score * criterion.weging,
      label: scoreLabel(score),
      evidenceInfo: evidenceStrength(evidence.length),
      ownContributionEvidence: criterion.evidence.filter((item) => item.ownContribution && evidence.includes(item.label)).map((item) => item.label),
      advice: improvementAdvice(score)
    };
  });
  const totalPoints = Object.values(byCriterion).reduce((sum, item) => sum + item.weighted, 0);
  return { byCriterion, totalPoints, eindcijfer: finalGrade(totalPoints), status: statusFromPoints(totalPoints), eigenaarschapWarning: byCriterion.eigenaarschap.score === 1 };
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function buildAssessmentPitch(results) {
  const ownContribution = state.reflections.eigenaarschap.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 2).join(" ");
  const products = state.reflections.beroepsproducten.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 2).join(" ");
  const lesson = state.reflections.reflectie.split("\n").map((line) => line.trim()).filter(Boolean).slice(-1)[0];
  const growth = state.reflections.ontwikkeling.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 2).join(" ");
  return `Mijn project gaat over de ${projectContext.projectName} bij ${projectContext.location}: een ${projectContext.concept} waarin hardlopen, functionele training, ontmoeting en gezondheid samenkomen. Mijn eigen bijdrage zat vooral in het concept, de deskresearch, de trendanalyse, de visualisaties en de website. ${ownContribution} Mijn belangrijkste beroepsproducten laten zien hoe we van onderzoek naar concept en presentatie zijn gegaan. ${products} Mijn belangrijkste leerpunt is dat ik eerder moet starten, scherper moet plannen en vaker moet valideren met de opdrachtgever. ${lesson} Als circulaire professional ben ik gegroeid in systeemdenken, duurzame waardecreatie en toekomstgericht kijken naar bestaande ruimte. ${growth} Op dit moment scoort mijn zelftoets ${results.totalPoints} van de ${MAX_TOTAL_POINTS} punten, met een eindcijfer van ${results.eindcijfer}.`;
}

function buildSummary(results) {
  const lines = [
    "Assessmentchecker Minor Circulaire Economie",
    "",
    "Projectcontext",
    `Project: ${projectContext.projectName}`,
    `Locatie: ${projectContext.location}`,
    `Concept: ${projectContext.concept}`,
    `Kern: ${projectContext.core}`,
    `Doelgroepen: ${projectContext.audiences.join(", ")}`,
    `Waarde: ${projectContext.valuePoints.join(", ")}`,
    "",
    "Scores",
    `Totaalpunten: ${results.totalPoints} / 48`,
    `Eindcijfer: ${results.eindcijfer}`,
    `Status: ${results.status}`,
    ""
  ];
  criteria.forEach((criterion) => {
    const result = results.byCriterion[criterion.id];
    lines.push(`Criterium ${criterion.nummer} - ${criterion.naam}`);
    lines.push(`Score: ${result.score} (${result.label})`);
    lines.push(`Gemiddelde zelftoets: ${result.average.toFixed(2)}`);
    lines.push(`Gewogen score: ${result.weighted}`);
    lines.push(`Geselecteerd bewijs: ${(state.evidenceByCriterion[criterion.id] || []).join(", ") || "Geen selectie"}`);
    lines.push("Reflectietekst:");
    lines.push(state.reflections[criterion.id] || "");
    lines.push("");
  });
  lines.push("Oefenantwoorden");
  criteria.forEach((criterion) => {
    lines.push(`Criterium ${criterion.nummer} - ${criterion.naam}`);
    criterion.assessorQuestions.forEach((question) => {
      lines.push(`Vraag: ${question}`);
      lines.push(`Antwoord: ${state.practiceAnswers[criterion.id]?.[question] || "Nog niet ingevuld"}`);
    });
    lines.push("");
  });
  return lines.join("\n");
}

function buildFinalSubmission() {
  const lines = ["Reflectieverslag Minor Circulaire Economie", "", `Project: ${projectContext.projectName}`, `Locatie: ${projectContext.location}`, `Concept: ${projectContext.concept}`, ""];
  criteria.forEach((criterion) => {
    lines.push(`Criterium ${criterion.nummer} - ${criterion.naam}`);
    lines.push(state.reflections[criterion.id] || "");
    lines.push("");
  });
  lines.push("Eindreflectie");
  lines.push(defaultReflection.eindreflectie);
  lines.push("");
  return lines.join("\n");
}

function renderScoreCard(title, result) {
  return `<div class="stat-card"><p class="muted tiny">${title}</p><div class="score-row"><div><h3 class="${result.score === 1 ? "risk" : result.score === 2 ? "warn" : "ok"}">${result.label}</h3></div><div><div class="score-value">${result.score}/4</div><div class="muted tiny">${result.weighted} gewogen punten</div></div></div><div class="progress-track"><div class="progress-fill" style="width:${(result.score / 4) * 100}%"></div></div><p class="muted tiny">Gemiddelde zelftoets: ${result.average.toFixed(2)}</p></div>`;
}

function renderDashboard(results) {
  return `
    <section class="grid-2">
      <div class="panel">
        <p class="eyebrow">Assessmentchecker Minor Circulaire Economie</p>
        <h2>Persoonlijke voorbereiding op mijn assessment over de Green Blue HYROX Hub</h2>
        <p class="muted">Gebruik deze tool om per criterium je reflectietekst te scherpen, bewijs te verzamelen, zelftoetsvragen te beantwoorden en direct te zien hoe sterk jouw verslag nu staat.</p>
      </div>
      <div class="panel">
        <p class="eyebrow">Totaaloverzicht</p>
        <div class="grid-3">
          <div class="sub-card"><p class="muted tiny">Totaalscore</p><div class="score-value">${results.totalPoints}/48</div></div>
          <div class="sub-card"><p class="muted tiny">Eindcijfer</p><div class="score-value">${results.eindcijfer}</div></div>
          <div class="sub-card"><p class="muted tiny">Status</p><div class="score-value" style="font-size:1.5rem">${results.status}</div></div>
        </div>
      </div>
    </section>
    <section class="grid-2" style="margin-top:16px">
      <div class="panel">
        <p class="eyebrow">Verslagbasis</p>
        <h2>${reportSource.title}</h2>
        <p class="muted">${reportSource.description}</p>
        <p class="muted tiny">Bronpad: ${reportSource.path}</p>
        <div class="action-row">
          <button class="secondary-button" id="load-report">Gebruik mijn verslag als basis</button>
        </div>
      </div>
      <div class="panel">
        <p class="eyebrow">Toetsstatus</p>
        <h2>${state.reportLoaded ? "Verslag geladen" : "Aangepaste invoer actief"}</h2>
        <p class="muted">${state.reportLoaded ? "De tekstvelden zijn gebaseerd op jouw uitgelezen persoonlijke ontwikkelverslag." : "Je werkt nu met aangepaste tekst ten opzichte van de geladen verslagbasis."}</p>
      </div>
    </section>
    ${results.eigenaarschapWarning ? `<div class="warning">Let op: eigenaarschap is een drempelcriterium. Een onvoldoende op dit criterium kan betekenen dat het hele assessment onvoldoende is.</div>` : ""}
    <section class="grid-5">
      ${criteria.map((criterion) => renderScoreCard(`Criterium ${criterion.nummer} - ${criterion.naam}`, results.byCriterion[criterion.id])).join("")}
    </section>
    <section class="grid-2" style="margin-top:16px">
      <div class="panel"><p class="eyebrow">Korte uitleg</p><p class="muted">De criteria gebruiken een zelftoets op basis van Nee, Deels, Ja en Sterk. De gemiddelde score per criterium wordt omgezet naar een assessmentscore van 1 tot 4 en daarna gewogen volgens het beoordelingsformulier.</p></div>
      <div class="panel"><p class="eyebrow">Projectcontext in het kort</p><h2>${projectContext.projectName}</h2><p class="muted">${projectContext.summary}</p></div>
    </section>`;
}

function renderProject() {
  return `<section class="project-columns">
    <div class="panel">
      <p class="eyebrow">${projectContext.subtitle}</p>
      <h2>${projectContext.title}</h2>
      <p class="muted">${projectContext.summary}</p>
      <div class="grid-2">
        <div class="sub-card"><p class="muted tiny">Locatie</p><strong>${projectContext.location}</strong></div>
        <div class="sub-card"><p class="muted tiny">Kern van het concept</p><strong>${projectContext.core}</strong></div>
      </div>
    </div>
    <div class="panel">
      <h2>Mogelijke onderdelen</h2>
      <div class="chips">${projectContext.elements.map((item) => `<span class="chip">${item}</span>`).join("")}</div>
      <h2>Doelgroepen</h2>
      <div class="chips">${projectContext.audiences.map((item) => `<span class="chip soft">${item}</span>`).join("")}</div>
      <div class="sub-card"><p class="eyebrow">Maatschappelijke waarde</p><ul class="simple-list">${projectContext.valuePoints.map((item) => `<li>${item}</li>`).join("")}</ul></div>
      <div class="warning" style="background:#fff4db;color:#855100;border-color:#f1d398">${projectContext.reminders.join("<br>")}</div>
    </div>
  </section>`;
}

function renderCriteria(results) {
  return criteria.map((criterion) => {
    const result = results.byCriterion[criterion.id];
    const answers = state.answersByCriterion[criterion.id];
    const evidence = state.evidenceByCriterion[criterion.id];
    return `<article class="criterion-card">
      <div class="criterion-head">
        <div>
          <div class="badge-row">
            <span class="badge">Criterium ${criterion.nummer}</span>
            <span class="badge">Weging x${criterion.weging}</span>
            ${criterion.threshold ? `<span class="badge rose">Drempelcriterium</span>` : ""}
          </div>
          <h2>${criterion.naam}</h2>
          <p><strong>${criterion.omschrijving}</strong></p>
          <p class="muted">${criterion.whatToShow}</p>
          <div class="sub-card"><p class="eyebrow">Waarop wordt gelet</p><div class="focus-points">${criterion.focusPoints.map((point) => `<span class="chip soft">${point}</span>`).join("")}</div></div>
        </div>
        ${renderScoreCard(`Score ${criterion.naam}`, result)}
      </div>
      ${criterion.threshold && result.score === 1 ? `<div class="warning">${criterion.thresholdMessage}</div>` : ""}
      <div class="split">
        <div class="panel">
          <p class="eyebrow">Reflectietekst</p>
          <textarea data-reflection="${criterion.id}">${state.reflections[criterion.id] || ""}</textarea>
        </div>
        <div>
          <div class="panel">
            <p class="eyebrow">Zelftoetsvragen</p>
            ${criterion.selfCheckQuestions.map((question, index) => `<div class="question-card"><div>${question}</div><div class="options">${scoreOptionLabels.map((option) => `<button class="pill-button ${answers[index] === option.value ? "active" : ""}" data-answer="${criterion.id}" data-index="${index}" data-value="${option.value}">${option.label}</button>`).join("")}</div></div>`).join("")}
          </div>
          <div class="panel" style="margin-top:18px">
            <p class="eyebrow">Mogelijk bewijsmateriaal</p>
            <div class="evidence-grid">${criterion.evidence.map((item) => `<label class="evidence-item"><input type="checkbox" data-evidence="${criterion.id}" value="${item.label}" ${evidence.includes(item.label) ? "checked" : ""}><span><strong>${item.label}</strong><br><span class="muted tiny">${item.ownContribution ? "Laat vooral jouw eigen bijdrage zien." : "Ondersteunend bewijs."}</span></span></label>`).join("")}</div>
          </div>
        </div>
      </div>
      <div class="grid-3" style="margin-top:18px">
        <div class="sub-card"><p class="eyebrow">Verbeteradvies</p><p class="muted">${result.advice}</p></div>
        <div class="sub-card"><p class="eyebrow">Assessmenttip</p><p class="muted">${criterion.assessmentTip}</p></div>
        <div class="sub-card"><p class="eyebrow">Mogelijke assesservragen</p><ul class="simple-list">${criterion.assessorQuestions.slice(0, 3).map((question) => `<li>${question}</li>`).join("")}</ul></div>
      </div>
    </article>`;
  }).join("");
}

function renderEvidence(results) {
  return `<section><div class="panel"><h2>Bewijschecker</h2><p class="muted">Gebruik deze sectie om per criterium te controleren of je genoeg bewijs hebt en welke stukken vooral jouw eigen bijdrage laten zien.</p></div>${criteria.map((criterion) => {
    const selected = state.evidenceByCriterion[criterion.id] || [];
    const result = results.byCriterion[criterion.id];
    return `<article class="criterion-card"><div class="score-row"><div><p class="eyebrow">Criterium ${criterion.nummer}</p><h2>${criterion.naam}</h2></div><div class="${result.evidenceInfo.className}"><strong>${result.evidenceInfo.label}</strong></div></div><div class="panel" style="margin-top:16px"><div class="evidence-grid">${criterion.evidence.map((item) => `<label class="evidence-item"><input type="checkbox" data-evidence="${criterion.id}" value="${item.label}" ${selected.includes(item.label) ? "checked" : ""}><span><strong>${item.label}</strong><br><span class="muted tiny">${item.ownContribution ? "Laat vooral jouw eigen bijdrage zien." : "Ondersteunend bewijs."}</span></span></label>`).join("")}</div><div class="summary-box"><strong>Eigen bijdrage zichtbaar in</strong><p class="muted">${result.ownContributionEvidence.length ? result.ownContributionEvidence.join(", ") : "Nog geen bewijs geselecteerd dat expliciet jouw eigen bijdrage laat zien."}</p></div></div><div class="grid-3" style="margin-top:16px"><div class="sub-card"><p class="muted tiny">Aantal bewijsstukken</p><div class="score-value">${selected.length}</div></div><div class="sub-card"><p class="muted tiny">Bewijsniveau</p><div class="${result.evidenceInfo.className}" style="font-size:1.5rem;font-weight:900">${result.evidenceInfo.label}</div></div><div class="sub-card"><p class="muted tiny">Tip</p><p class="muted">${result.evidenceInfo.tip}</p></div></div></article>`;
  }).join("")}</section>`;
}

function renderPractice() {
  return `<section><div class="panel"><h2>Assessmentvragen oefenen</h2><p class="muted">Schrijf per criterium alvast kernachtige antwoorden. Alles wordt opgeslagen in localStorage.</p></div>${criteria.map((criterion) => `<article class="criterion-card"><p class="eyebrow">Criterium ${criterion.nummer}</p><h2>${criterion.naam}</h2>${criterion.assessorQuestions.map((question) => `<details class="practice-item"><summary><strong>${question}</strong></summary><textarea class="practice-answer" data-practice="${criterion.id}" data-question="${encodeURIComponent(question)}">${state.practiceAnswers[criterion.id]?.[question] || ""}</textarea></details>`).join("")}</article>`).join("")}</section>`;
}

function renderExport(results) {
  return `<section class="grid-3">
    <div class="export-card"><p class="eyebrow">Export</p><h2>Exporteer samenvatting</h2><p class="muted">Download een tekstbestand met projectcontext, reflectieteksten, geselecteerd bewijs, scores en oefenantwoorden.</p><button class="primary-button" id="export-summary">Exporteer samenvatting</button></div>
    <div class="export-card"><p class="eyebrow">Inleverversie</p><h2>Download eindversie</h2><p class="muted">Download een schone tekstversie van jouw huidige reflectieteksten per criterium.</p><button class="secondary-button" id="download-final">Download eindversie</button></div>
    <div class="export-card"><p class="eyebrow">Assessmentpitch</p><h2>Kopieer assessmentpitch</h2><p class="muted">Maak in een klik een korte openingspitch op basis van jouw project, eigen bijdrage, beroepsproducten, leerpunt en ontwikkeling.</p><div class="action-row"><button class="secondary-button" id="copy-pitch">Kopieer assessmentpitch</button><button class="tertiary-button" id="load-report-export">Laad verslag opnieuw</button></div><p id="copy-state" class="muted tiny"></p></div>
  </section>`;
}

function loadReportAsBase() {
  state.reflections = {
    beroepsproducten: defaultReflection.beroepsproducten,
    eigenaarschap: defaultReflection.eigenaarschap,
    reflectie: defaultReflection.reflectie,
    leerproces: defaultReflection.leerproces,
    ontwikkeling: defaultReflection.ontwikkeling
  };
  state.reportLoaded = true;
  saveState();
  render();
}

function render() {
  const results = buildResults();
  document.getElementById("nav-tabs").innerHTML = navItems.map((item) => `<button class="tab-button ${state.activeView === item.id ? "active" : ""}" data-nav="${item.id}">${item.label}</button>`).join("");
  const app = document.getElementById("app");
  if (state.activeView === "dashboard") app.innerHTML = renderDashboard(results);
  if (state.activeView === "project") app.innerHTML = renderProject();
  if (state.activeView === "criteria") app.innerHTML = renderCriteria(results);
  if (state.activeView === "bewijs") app.innerHTML = renderEvidence(results);
  if (state.activeView === "oefenen") app.innerHTML = renderPractice();
  if (state.activeView === "export") app.innerHTML = renderExport(results);
}

document.addEventListener("click", async (event) => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    state.activeView = nav.dataset.nav;
    saveState();
    render();
  }
  const answer = event.target.closest("[data-answer]");
  if (answer) {
    const { answer: criterionId, index, value } = answer.dataset;
    state.answersByCriterion[criterionId][Number(index)] = Number(value);
    saveState();
    render();
  }
  if (event.target.id === "export-summary") {
    downloadFile("assessmentchecker-samenvatting.txt", buildSummary(buildResults()));
  }
  if (event.target.id === "download-final") {
    downloadFile("reflectieverslag-eindversie.txt", buildFinalSubmission());
  }
  if (event.target.id === "copy-pitch") {
    const pitch = buildAssessmentPitch(buildResults());
    try {
      await navigator.clipboard.writeText(pitch);
      const stateNode = document.getElementById("copy-state");
      if (stateNode) stateNode.textContent = "De pitch staat nu in je klembord.";
    } catch {
      window.prompt("Kopieer hieronder je assessmentpitch:", pitch);
    }
  }
  if (event.target.id === "load-report" || event.target.id === "load-report-export") {
    loadReportAsBase();
  }
});

document.addEventListener("change", (event) => {
  const reflection = event.target.closest("[data-reflection]");
  if (reflection) {
    state.reflections[reflection.dataset.reflection] = reflection.value;
    state.reportLoaded = false;
    saveState();
    return;
  }
  const evidence = event.target.closest("[data-evidence]");
  if (evidence) {
    const criterionId = evidence.dataset.evidence;
    const selected = state.evidenceByCriterion[criterionId];
    if (evidence.checked) {
      if (!selected.includes(evidence.value)) selected.push(evidence.value);
    } else {
      state.evidenceByCriterion[criterionId] = selected.filter((item) => item !== evidence.value);
    }
    saveState();
    render();
  }
});

document.addEventListener("input", (event) => {
  const practice = event.target.closest("[data-practice]");
  if (practice) {
    const criterionId = practice.dataset.practice;
    const question = decodeURIComponent(practice.dataset.question);
    state.practiceAnswers[criterionId][question] = practice.value;
    saveState();
  }
  const reflection = event.target.closest("[data-reflection]");
  if (reflection) {
    state.reflections[reflection.dataset.reflection] = reflection.value;
    state.reportLoaded = false;
    saveState();
  }
});

document.getElementById("reset-button").addEventListener("click", () => {
  if (!window.confirm("Weet je zeker dat je alle ingevulde reflecties, antwoorden en bewijs wilt resetten?")) return;
  state = buildInitialState();
  localStorage.removeItem(STORAGE_KEY);
  render();
});

render();

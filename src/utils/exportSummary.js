import { MAX_TOTAL_POINTS } from "./scoring";

export function buildAssessmentPitch(criteria, reflections, results, projectContext) {
  const ownContribution = reflections.eigenaarschap
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");

  const products = reflections.beroepsproducten
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");

  const lesson = reflections.reflectie
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(-1)[0];

  const growth = reflections.ontwikkeling
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");

  return `Mijn project gaat over de ${projectContext.projectName} bij ${projectContext.location}: een ${projectContext.concept} waarin hardlopen, functionele training, ontmoeting en gezondheid samenkomen. Mijn eigen bijdrage zat vooral in het concept, de deskresearch, de trendanalyse, de visualisaties en de website. ${ownContribution} Mijn belangrijkste beroepsproducten laten zien hoe we van onderzoek naar concept en presentatie zijn gegaan. ${products} Mijn belangrijkste leerpunt is dat ik eerder moet starten, scherper moet plannen en vaker moet valideren met de opdrachtgever. ${lesson} Als circulaire professional ben ik gegroeid in systeemdenken, duurzame waardecreatie en toekomstgericht kijken naar bestaande ruimte. ${growth} Op dit moment scoort mijn zelftoets ${results.totalPoints} van de ${MAX_TOTAL_POINTS} punten, met een eindcijfer van ${results.eindcijfer}.`;
}

export function buildExportSummary({
  criteria,
  projectContext,
  reflections,
  evidenceByCriterion,
  practiceAnswers,
  results
}) {
  const lines = [];

  lines.push("Assessmentchecker Minor Circulaire Economie");
  lines.push("");
  lines.push("Projectcontext");
  lines.push(`Project: ${projectContext.projectName}`);
  lines.push(`Locatie: ${projectContext.location}`);
  lines.push(`Concept: ${projectContext.concept}`);
  lines.push(`Kern: ${projectContext.core}`);
  lines.push(`Doelgroepen: ${projectContext.audiences.join(", ")}`);
  lines.push(`Waarde: ${projectContext.valuePoints.join(", ")}`);
  lines.push("");
  lines.push("Scores");
  lines.push(`Totaalpunten: ${results.totalPoints} / 48`);
  lines.push(`Eindcijfer: ${results.eindcijfer}`);
  lines.push(`Status: ${results.status}`);
  lines.push("");

  criteria.forEach((criterion) => {
    const criterionResult = results.byCriterion[criterion.id];
    lines.push(`Criterium ${criterion.nummer} - ${criterion.naam}`);
    lines.push(`Score: ${criterionResult.score} (${criterionResult.label})`);
    lines.push(`Gemiddelde zelftoets: ${criterionResult.average.toFixed(2)}`);
    lines.push(`Gewogen score: ${criterionResult.weighted}`);
    lines.push(`Geselecteerd bewijs: ${(evidenceByCriterion[criterion.id] || []).join(", ") || "Geen selectie"}`);
    lines.push("Reflectietekst:");
    lines.push(reflections[criterion.id] || "");
    lines.push("");
  });

  lines.push("Oefenantwoorden");

  criteria.forEach((criterion) => {
    lines.push(`Criterium ${criterion.nummer} - ${criterion.naam}`);

    criterion.assessorQuestions.forEach((question) => {
      const answer = practiceAnswers[criterion.id]?.[question] || "";
      lines.push(`Vraag: ${question}`);
      lines.push(`Antwoord: ${answer || "Nog niet ingevuld"}`);
    });

    lines.push("");
  });

  return lines.join("\n");
}

export function buildFinalSubmission({
  criteria,
  projectContext,
  reflections
}) {
  const lines = [];

  lines.push("Reflectieverslag Minor Circulaire Economie");
  lines.push("");
  lines.push(`Project: ${projectContext.projectName}`);
  lines.push(`Locatie: ${projectContext.location}`);
  lines.push(`Concept: ${projectContext.concept}`);
  lines.push("");

  criteria.forEach((criterion) => {
    lines.push(`Criterium ${criterion.nummer} - ${criterion.naam}`);
    lines.push(reflections[criterion.id] || "");
    lines.push("");
  });

  return lines.join("\n");
}

export function downloadSummary(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

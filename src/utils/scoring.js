export const MAX_TOTAL_POINTS = 48;

export function averageAnswers(values = []) {
  if (!values.length) {
    return 0;
  }

  const total = values.reduce((sum, value) => sum + Number(value || 0), 0);
  return total / values.length;
}

export function scoreFromAverage(average) {
  if (average < 0.75) return 1;
  if (average < 1.5) return 2;
  if (average < 2.4) return 3;
  return 4;
}

export function scoreLabel(score) {
  if (score === 1) return "onvoldoende";
  if (score === 2) return "matig";
  if (score === 3) return "voldoende";
  return "goed";
}

export function scoreColor(score) {
  if (score === 1) return "text-rose-700";
  if (score === 2) return "text-amber-700";
  if (score === 3) return "text-emerald-700";
  return "text-teal-700";
}

export function progressWidth(score) {
  return `${(score / 4) * 100}%`;
}

export function evidenceStrength(selectedCount) {
  if (selectedCount <= 2) {
    return {
      label: "weinig bewijs",
      color: "text-amber-700",
      tip: "Voeg extra bewijs toe dat jouw keuzes, rol en onderbouwing zichtbaar maakt."
    };
  }

  if (selectedCount <= 5) {
    return {
      label: "voldoende bewijs",
      color: "text-emerald-700",
      tip: "Je basis is aanwezig. Kies vooral bewijs dat jouw eigen bijdrage en onderbouwing concreet laat zien."
    };
  }

  return {
    label: "sterk bewijs",
    color: "text-teal-700",
    tip: "Houd het bewijs scherp en relevant. Kies de stukken die jij in het assessment het best kunt toelichten."
  };
}

export function improvementAdvice(score) {
  if (score === 1) {
    return "Dit criterium is nog onvoldoende zichtbaar. Maak concreter wat je hebt gedaan, waarom je dat hebt gedaan en welk bewijs daarbij hoort.";
  }

  if (score === 2) {
    return "De basis is aanwezig, maar de onderbouwing kan sterker. Voeg concrete voorbeelden, keuzes en extra bewijs toe.";
  }

  if (score === 3) {
    return "Dit criterium is voldoende. Om richting goed te gaan kun je nog scherper laten zien waarom jouw keuzes professioneel en inhoudelijk sterk zijn.";
  }

  return "Dit criterium is sterk. Houd je tekst scherp, concreet en bewijsgericht zodat je deze kwaliteit ook mondeling overtuigend kunt verdedigen.";
}

export function statusFromPoints(totalPoints) {
  if (totalPoints <= 24) return "onvoldoende";
  if (totalPoints <= 26) return "grens zakken/slagen";
  if (totalPoints <= 35) return "voldoende";
  return "goed";
}

export function finalGrade(totalPoints) {
  const grade = (totalPoints / MAX_TOTAL_POINTS) * 9 + 1;
  return Math.round(grade * 10) / 10;
}

export function buildCriterionResult(criterion, answers = [], selectedEvidence = []) {
  const average = averageAnswers(answers);
  const score = scoreFromAverage(average);
  const weighted = score * criterion.weging;
  const evidenceInfo = evidenceStrength(selectedEvidence.length);
  const ownContributionEvidence = criterion.evidence
    .filter((item) => item.ownContribution && selectedEvidence.includes(item.label))
    .map((item) => item.label);

  return {
    average,
    score,
    weighted,
    label: scoreLabel(score),
    evidenceInfo,
    ownContributionEvidence,
    advice: improvementAdvice(score)
  };
}

export function buildAssessmentResults(criteria, answersByCriterion, evidenceByCriterion) {
  const byCriterion = {};

  criteria.forEach((criterion) => {
    byCriterion[criterion.id] = buildCriterionResult(
      criterion,
      answersByCriterion[criterion.id] || [],
      evidenceByCriterion[criterion.id] || []
    );
  });

  const totalPoints = Object.values(byCriterion).reduce((sum, item) => sum + item.weighted, 0);
  const eindcijfer = finalGrade(totalPoints);
  const status = statusFromPoints(totalPoints);
  const eigenaarschapWarning = byCriterion.eigenaarschap?.score === 1;

  return {
    byCriterion,
    totalPoints,
    eindcijfer,
    status,
    eigenaarschapWarning
  };
}

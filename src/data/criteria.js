export const scoreOptionLabels = [
  { label: "Nee", value: 0 },
  { label: "Deels", value: 1 },
  { label: "Ja", value: 2 },
  { label: "Sterk", value: 3 }
];

export const criteria = [
  {
    id: "beroepsproducten",
    nummer: 1,
    naam: "Beroepsproducten",
    omschrijving: "Professionele kwaliteit van het werk.",
    whatToShow:
      "Laat zien welke beroepsproducten jij hebt gemaakt, waarom ze professioneel zijn, hoe jouw keuzes inhoudelijk onderbouwd zijn en wat de praktijkwaarde is voor NMHC Nijmegen.",
    focusPoints: [
      "Professionele kwaliteit",
      "Inhoudelijke diepgang",
      "Onderbouwing van keuzes",
      "Samenhang",
      "Praktijkwaarde"
    ],
    weging: 2,
    evidence: [
      { label: "website", ownContribution: true },
      { label: "visualisaties", ownContribution: true },
      { label: "deskresearch", ownContribution: true },
      { label: "trendanalyse", ownContribution: true },
      { label: "Hyrox-concept", ownContribution: true },
      { label: "documenten op de website", ownContribution: false },
      { label: "screenshots", ownContribution: false },
      { label: "Green Blue HYROX Hub", ownContribution: false },
      { label: "Green Blue Challenge Park-verslag", ownContribution: false },
      { label: "vergelijkingsmatrix", ownContribution: false },
      { label: "projectdocumenten uit de Hyrox-map", ownContribution: false }
    ],
    selfCheckQuestions: [
      "Laat ik duidelijk zien welke beroepsproducten ik heb gemaakt?",
      "Leg ik uit waarom deze producten professioneel zijn?",
      "Onderbouw ik mijn keuzes met deskresearch, trendanalyse of projectdocumenten?",
      "Laat ik zien wat de praktijkwaarde is voor NMHC Nijmegen of het terrein?",
      "Benoem ik beperkingen of verbeterpunten?",
      "Maak ik duidelijk hoe mijn website de samenhang van het project laat zien?"
    ],
    assessorQuestions: [
      "Welke beroepsproducten heb jij gemaakt of mede gemaakt?",
      "Waarom vind jij deze producten professioneel?",
      "Hoe laten de deskresearch en trendanalyse inhoudelijke onderbouwing zien?",
      "Hoe draagt de website bij aan de professionele kwaliteit van jullie project?",
      "Wat is de praktijkwaarde van de Green Blue HYROX Hub?",
      "Welke beperking heeft je beroepsproduct nog?"
    ],
    assessmentTip:
      "Verbind elk beroepsproduct aan een keuze, een onderbouwing en een concreet effect voor het terrein of de gebruiker."
  },
  {
    id: "eigenaarschap",
    nummer: 2,
    naam: "Eigenaarschap",
    omschrijving: "Eigenaarschap en professionele redenering.",
    whatToShow:
      "Maak concreet wat jouw eigen bijdrage was, welke keuzes jij zelf hebt ingebracht en hoe jij die inhoudelijk kunt verdedigen. Dit is een drempelcriterium.",
    focusPoints: [
      "Eigen bijdrage",
      "Gemaakte keuzes",
      "Inhoudelijke onderbouwing",
      "Rol binnen groepswerk",
      "Kunnen verdedigen van keuzes",
      "Professionele positie innemen"
    ],
    weging: 3,
    threshold: true,
    thresholdMessage:
      "Let op: eigenaarschap is een drempelcriterium. Een onvoldoende op dit criterium kan betekenen dat het hele assessment onvoldoende is.",
    evidence: [
      { label: "Hyrox-concept", ownContribution: true },
      { label: "website", ownContribution: true },
      { label: "visualisaties", ownContribution: true },
      { label: "deskresearch", ownContribution: true },
      { label: "trendanalyse", ownContribution: true },
      { label: "Teams Planner", ownContribution: false },
      { label: "AI-output", ownContribution: true },
      { label: "taakverdeling", ownContribution: false },
      { label: "eigen bijdrage aan conceptontwikkeling", ownContribution: true },
      { label: "eigen bijdrage aan website", ownContribution: true },
      { label: "eigen bijdrage aan visualisaties", ownContribution: true }
    ],
    selfCheckQuestions: [
      "Maak ik mijn eigen bijdrage duidelijk?",
      "Benoem ik wat ik zelf heb bedacht of gemaakt?",
      "Leg ik uit waarom ik bepaalde keuzes heb gemaakt?",
      "Maak ik mijn rol binnen de groep helder?",
      "Kan ik mijn keuzes verdedigen bij kritische vragen?",
      "Maak ik duidelijk dat ik het Hyrox-concept zelf heb ingebracht en vormgegeven?",
      "Laat ik zien dat ik eigenaarschap nam over de website en visualisaties?"
    ],
    assessorQuestions: [
      "Wat was jouw eigen bijdrage aan het project?",
      "Welke keuze heb jij zelf ingebracht?",
      "Waarom koos jij voor een HYROX-geinspireerd concept?",
      "Hoe kun je jouw keuze inhoudelijk verdedigen?",
      "Wat deed jij en wat deed de groep?",
      "Waar nam jij verantwoordelijkheid voor?",
      "Hoe laat de website jouw eigenaarschap zien?"
    ],
    assessmentTip:
      "Zeg niet alleen wat de groep deed, maar formuleer steeds: ik heb gekozen, ik heb onderzocht, ik heb gebouwd, ik heb onderbouwd."
  },
  {
    id: "reflectie",
    nummer: 3,
    naam: "Reflectie",
    omschrijving: "Kritisch analytisch vermogen.",
    whatToShow:
      "Laat zien dat je je eigen aannames, beperkingen, sterke punten en verbeterpunten kritisch kunt analyseren en koppelen aan kwaliteit en toepasbaarheid.",
    focusPoints: [
      "Kritisch kijken naar eigen werk",
      "Sterke en zwakke punten",
      "Aannames herkennen",
      "Beperkingen benoemen",
      "Gevolgen voor kwaliteit en toepasbaarheid uitleggen",
      "Verbeterpunten formuleren"
    ],
    weging: 2,
    evidence: [
      { label: "reflectietekst", ownContribution: true },
      { label: "voorbeeld van tunnelvisie", ownContribution: true },
      { label: "gebrek aan validatie", ownContribution: true },
      { label: "planning", ownContribution: false },
      { label: "Teams Planner", ownContribution: false },
      { label: "samenwerkingservaringen", ownContribution: true },
      { label: "onderbouwing dat validatie met opdrachtgever beperkt was", ownContribution: true },
      { label: "verbeterpunt: eerder starten en vaker valideren", ownContribution: true }
    ],
    selfCheckQuestions: [
      "Benoem ik sterke punten van mijn werk?",
      "Benoem ik zwakke punten of beperkingen?",
      "Bespreek ik aannames?",
      "Leg ik uit wat het gevolg is voor de kwaliteit van mijn werk?",
      "Geef ik aan wat ik de volgende keer anders doe?",
      "Leg ik uit waarom tunnelvisie een risico was?",
      "Leg ik uit waarom validatie met opdrachtgever belangrijk is?"
    ],
    assessorQuestions: [
      "Welke aanname bleek achteraf kwetsbaar?",
      "Wat ging goed en wat ging minder goed?",
      "Wat betekent het gebrek aan validatie voor de kwaliteit van je werk?",
      "Wat zou je de volgende keer anders doen?",
      "Hoe voorkom je tunnelvisie in een volgend project?",
      "Waarom was het risico dat jullie de theorie om het idee heen gingen bouwen?",
      "Wat betekent dit voor professioneel werken binnen circulaire projecten?"
    ],
    assessmentTip:
      "Sterke reflectie benoemt niet alleen wat misging, maar ook waarom dat professioneel relevant was en wat jij de volgende keer anders organiseert."
  },
  {
    id: "leerproces",
    nummer: 4,
    naam: "Leerproces",
    omschrijving: "Regie over het eigen leerproces.",
    whatToShow:
      "Maak duidelijk welke leerdoelen je had, welke acties je hebt ondernomen, wat werkte, wat niet werkte en hoe jij als professional bewuster bent gaan handelen.",
    focusPoints: [
      "Persoonlijke leerdoelen",
      "Bewuste keuzes in het leerproces",
      "Acties om leerdoelen te behalen",
      "Reflectie op wat wel en niet werkte",
      "Leerlogica",
      "Ontwikkeling als professional"
    ],
    weging: 3,
    evidence: [
      { label: "persoonlijke leerdoelen", ownContribution: true },
      { label: "workshop structuur", ownContribution: true },
      { label: "Teams Planner", ownContribution: false },
      { label: "AI-bot", ownContribution: true },
      { label: "GitHub-site", ownContribution: true },
      { label: "webapplicatie", ownContribution: true },
      { label: "samenwerking met Jens", ownContribution: true },
      { label: "reflectie op motivatie", ownContribution: true },
      { label: "leren werken met AI", ownContribution: true },
      { label: "leren structureren van projecten", ownContribution: true }
    ],
    selfCheckQuestions: [
      "Benoem ik mijn leerdoelen?",
      "Leg ik uit waarom deze leerdoelen belangrijk waren?",
      "Laat ik zien welke acties ik heb genomen?",
      "Reflecteer ik op wat wel en niet werkte?",
      "Leg ik uit wat ik meeneem naar volgende projecten?",
      "Maak ik duidelijk hoe Teams Planner mij hielp?",
      "Maak ik duidelijk hoe AI mijn werk heeft versterkt?"
    ],
    assessorQuestions: [
      "Wat waren jouw leerdoelen?",
      "Waarom waren structuur en AI belangrijke leerdoelen voor jou?",
      "Welke acties heb je genomen om aan structuur te werken?",
      "Hoe heb je Teams Planner gebruikt?",
      "Wat heb je geleerd over AI?",
      "Wat werkte goed in de samenwerking met Jens?",
      "Wat neem je mee naar toekomstige projecten?"
    ],
    assessmentTip:
      "Laat een duidelijke lijn zien van leerdoel naar actie, inzicht en gedrag dat je in een volgend project opnieuw inzet."
  },
  {
    id: "ontwikkeling",
    nummer: 5,
    naam: "Ontwikkeling",
    omschrijving: "Groei als circulaire professional.",
    whatToShow:
      "Koppel jouw groei in circulair denken en professioneel handelen aan systeemdenken, duurzame waardecreatie, toekomstbestendigheid en GreenComp.",
    focusPoints: [
      "Groei in circulair denken",
      "Ontwikkeling in professioneel handelen",
      "Systeemdenken",
      "Duurzame waardecreatie",
      "Toekomstbestendigheid",
      "Koppeling met GreenComp",
      "Reflecting on values",
      "Exploring sustainability futures"
    ],
    weging: 2,
    evidence: [
      { label: "lessen business ethics", ownContribution: true },
      { label: "duurzame waardecreatie", ownContribution: true },
      { label: "reflectie op systeemdenken", ownContribution: true },
      { label: "voorbeelden uit foodsector", ownContribution: true },
      { label: "Hyrox-concept", ownContribution: false },
      { label: "Green Blue HYROX Hub", ownContribution: false },
      { label: "website", ownContribution: true },
      { label: "AI-prototypes", ownContribution: true },
      { label: "ontwikkeling van recycling-denken naar systeemdenken", ownContribution: true },
      { label: "GreenComp: reflecting on values", ownContribution: true },
      { label: "GreenComp: exploring sustainability futures", ownContribution: true }
    ],
    selfCheckQuestions: [
      "Leg ik uit hoe mijn beeld van circulariteit is veranderd?",
      "Benoem ik systeemdenken?",
      "Koppel ik mijn ontwikkeling aan mijn toekomstige werk?",
      "Leg ik uit wat circulariteit betekent binnen de foodsector?",
      "Maak ik duidelijk hoe ik in de toekomst anders ga handelen?",
      "Koppel ik mijn ontwikkeling aan GreenComp?",
      "Leg ik uit hoe mijn project bijdraagt aan duurzame waardecreatie?"
    ],
    assessorQuestions: [
      "Hoe is jouw beeld van circulariteit veranderd?",
      "Wat betekent circulair denken voor jou?",
      "Hoe pas je systeemdenken toe?",
      "Wat neem je mee naar de foodsector?",
      "Hoe past jouw ontwikkeling bij GreenComp?",
      "Hoe kijk je nu anders naar waardecreatie?",
      "Waarom is circulariteit meer dan recycling?"
    ],
    assessmentTip:
      "Maak je ontwikkeling concreet door een oude manier van denken te vergelijken met hoe je nu kijkt naar systemen, waarde en toekomstbestendigheid."
  }
];

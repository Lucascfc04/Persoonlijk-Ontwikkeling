export default function EvidenceChecklist({ criterion, selectedEvidence, onToggle, showSummary = true }) {
  const ownContributionItems = criterion.evidence.filter((item) => item.ownContribution);

  return (
    <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/70 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-emerald-950">Mogelijk bewijsmateriaal</h4>
          <p className="text-sm text-slate-600">Vink aan welk bewijs jij echt kunt laten zien of toelichten.</p>
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-900">
          {selectedEvidence.length} geselecteerd
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {criterion.evidence.map((item) => {
          const checked = selectedEvidence.includes(item.label);

          return (
            <label
              key={item.label}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                checked ? "border-emerald-300 bg-white" : "border-transparent bg-white/70 hover:bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(criterion.id, item.label)}
                className="mt-1 h-4 w-4 accent-emerald-700"
              />
              <span>
                <span className="block font-medium text-slate-800">{item.label}</span>
                <span className="block text-sm text-slate-500">
                  {item.ownContribution ? "Laat vooral jouw eigen bijdrage zien." : "Ondersteunend bewijs."}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      {showSummary ? (
        <div className="mt-5 rounded-2xl border border-dashed border-emerald-200 bg-white/80 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Bewijs dat vooral jouw eigen bijdrage laat zien</p>
          <p className="mt-1">
            {ownContributionItems.map((item) => item.label).join(", ")}
          </p>
        </div>
      ) : null}
    </div>
  );
}

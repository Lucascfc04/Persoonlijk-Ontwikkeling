const navigationItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "project", label: "Mijn Project" },
  { id: "criteria", label: "Criteria" },
  { id: "bewijs", label: "Bewijschecker" },
  { id: "oefenen", label: "Oefenmodus" },
  { id: "export", label: "Export" }
];

export default function Navigation({ activeView, onChange, onReset }) {
  return (
    <nav className="sticky top-4 z-30 rounded-[2rem] border border-white/65 bg-white/80 p-3 shadow-lg shadow-emerald-950/10 backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {navigationItems.map((item) => {
            const active = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-emerald-900 text-white shadow-md"
                    : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
        >
          Reset mijn invoer
        </button>
      </div>
    </nav>
  );
}

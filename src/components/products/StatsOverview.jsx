import { ICONS } from "../../constants/icons";

// Four summary cards: total products, total stock, low stock, out of stock.
export default function StatsOverview({ stats }) {
  const cards = [
    { label: "Total Products", value: stats.total, icon: ICONS.box, color: "bg-blue-500" },
    { label: "Total Stock", value: stats.stock.toLocaleString(), icon: ICONS.trend, color: "bg-emerald-500" },
    { label: "Low Stock", value: stats.low, icon: ICONS.alert, color: "bg-amber-500" },
    { label: "Out of Stock", value: stats.out, icon: ICONS.cross, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-5 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
        >
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${s.color} flex items-center justify-center text-white shadow-md shrink-0`}
          >
            {s.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 font-medium truncate">{s.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-800">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

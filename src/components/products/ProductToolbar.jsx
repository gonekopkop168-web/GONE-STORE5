
import { ICONS } from "../../constants/icons";

export default function ProductToolbar({
  search,
  onSearchChange,
  filterCat,
  onFilterChange,
  showFilter,
  onToggleFilter,
  categories,
}) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 sm:p-4 border-b border-slate-50">
      <div className="relative flex-1 sm:flex-none">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{ICONS.search}</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm w-full sm:w-64 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>
      <div className="relative shrink-0">
        <button
          onClick={onToggleFilter}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {ICONS.filter}
          <span className="hidden sm:inline">Filters</span>
          {filterCat && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
        </button>
        {showFilter && (
          <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-10 w-44">
            <p className="text-xs font-semibold text-slate-400 uppercase px-3 py-1">Category</p>
            <button
              onClick={() => onFilterChange("")}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                !filterCat ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-slate-50"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => onFilterChange(c)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                  filterCat === c ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-slate-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

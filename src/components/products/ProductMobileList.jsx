import { ICONS } from "../../constants/icons";

// Mobile (below md) card-list view of the filtered product list.
export default function ProductMobileList({ products, onEdit, onDeleteRequest }) {
  return (
    <div className="md:hidden divide-y divide-slate-50">
      {products.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">No products found.</div>
      ) : (
        products.map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-4">
            <img
              src={p.image}
              alt={p.name}
              className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-semibold">
                  {p.category}
                </span>
                <span className="text-sm font-bold text-slate-700">${p.price.toFixed(2)}</span>
                <span
                  className={`text-xs font-semibold ${
                    p.stock === 0 ? "text-red-500" : p.stock <= 10 ? "text-amber-500" : "text-emerald-500"
                  }`}
                >
                  {p.stock === 0 ? "Out" : `${p.stock} in stock`}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onEdit(p)}
                className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                {ICONS.edit}
              </button>
              <button
                onClick={() => onDeleteRequest(p.id)}
                className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                {ICONS.trash}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

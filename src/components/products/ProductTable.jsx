
import { ICONS } from "../../constants/icons";

export default function ProductTable({ products, onEdit, onDeleteRequest }) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-50">
            <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
              Product
            </th>
            <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
              Category
            </th>
            <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
              Price
            </th>
            <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">
              Stock
            </th>
            <th className="text-right text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-16 text-slate-400 text-sm">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate max-w-[180px] lg:max-w-xs">
                        {p.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate max-w-[180px] lg:max-w-xs">{p.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold whitespace-nowrap">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-bold text-slate-800">${p.price.toFixed(2)}</span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`text-sm font-semibold ${
                      p.stock === 0 ? "text-red-500" : p.stock <= 10 ? "text-amber-500" : "text-emerald-500"
                    }`}
                  >
                    {p.stock === 0 ? "Out of stock" : p.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(p)}
                      className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                    >
                      {ICONS.edit}
                    </button>
                    <button
                      onClick={() => onDeleteRequest(p.id)}
                      className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
                    >
                      {ICONS.trash}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

import { ICONS } from "../../constants/icons";

// Left navigation: brand mark, Products link, Create Product link.
// Slides in as an overlay on mobile, static on large screens.
export default function Sidebar({ page, sidebarOpen, onClose, onGoProducts, onGoCreate }) {
  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-56 bg-white border-r border-slate-100
        flex flex-col py-6 px-4 gap-2 shrink-0
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="font-bold text-slate-800 text-base">Admin</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600"
          >
            {ICONS.close}
          </button>
        </div>

        <button
          onClick={onGoProducts}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            page === "products" ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <span>{ICONS.box}</span> Products
          {page === "products" && <span className="ml-auto">{ICONS.chevron}</span>}
        </button>

        <button
          onClick={onGoCreate}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            page === "create" || page === "edit"
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <span>{ICONS.plus}</span>
          {page === "edit" ? "Edit Product" : "Create Product"}
        </button>
      </aside>
    </>
  );
}


import { ICONS } from "../../constants/icons";

export default function Topbar({ onOpenSidebar }) {
  return (
    <header className="h-14 sm:h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
      <button
        onClick={onOpenSidebar}
        className="lg:hidden w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
      >
        {ICONS.menu}
      </button>
      <div className="hidden lg:flex w-8 h-8 rounded-lg border border-slate-200 items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors">
        {ICONS.chevron}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
          {ICONS.bell}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">GONE STORE</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
            G1
          </div>
        </div>
      </div>
    </header>
  );
}

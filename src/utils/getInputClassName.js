export function getInputClassName(hasError) {
  return `w-full px-3 py-2.5 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-blue-400 ${
    hasError ? "border-red-400 bg-red-50" : "border-slate-200 bg-white hover:border-slate-300"
  }`;
}

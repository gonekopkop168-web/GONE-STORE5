
export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl text-white text-sm font-medium flex items-center gap-2 transition-all max-w-xs ${
        toast.type === "error" ? "bg-red-500" : "bg-emerald-500"
      }`}
    >
      <span>{toast.type === "error" ? "🗑️" : "✅"}</span>
      {toast.msg}
    </div>
  );
}

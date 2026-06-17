// Confirmation modal shown before a product is permanently deleted.
export default function ConfirmDeleteModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-sm flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-2xl">
          🗑️
        </div>
        <div className="text-center">
          <p className="font-bold text-slate-800 text-lg">Delete Product?</p>
          <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

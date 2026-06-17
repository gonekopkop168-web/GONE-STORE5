import Field from "../common/Field";
import { ICONS } from "../../constants/icons";
import { getInputClassName } from "../../utils/getInputClassName";

// Create/Edit product form. `mode` is "create" or "edit" and controls copy + submit label.
export default function ProductForm({ mode, form, errors, onFieldChange, onSubmit, onCancel, categories }) {
  const isCreate = mode === "create";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-blue-500">{ICONS.box}</span>
            {isCreate ? "Create New Product" : "Edit Product"}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isCreate ? "Add a new item to your inventory catalog." : "Update the product details below."}
          </p>
        </div>
        {isCreate && (
          <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition-colors shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
            </svg>
            <span className="hidden sm:inline">New Listing</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Field label="Product Name" icon={ICONS.box} error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
              placeholder="e.g. Wireless Headphones"
              className={getInputClassName(errors.name)}
            />
          </Field>
          <Field
            label="Category"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            }
            error={errors.category}
          >
            <select
              value={form.category}
              onChange={(e) => onFieldChange("category", e.target.value)}
              className={getInputClassName(errors.category)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Field
            label="Price ($)"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            }
            error={errors.price}
          >
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => onFieldChange("price", e.target.value)}
              placeholder="0.00"
              className={getInputClassName(errors.price)}
            />
          </Field>
          <Field
            label="Stock Quantity"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <path d="M16 8h4l3 5v3h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            }
            error={errors.stock}
          >
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => onFieldChange("stock", e.target.value)}
              placeholder="0"
              className={getInputClassName(errors.stock)}
            />
          </Field>
        </div>

        <Field
          label="Description"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          }
          error={errors.description}
        >
          <textarea
            value={form.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            placeholder="Tell us more about this product..."
            rows={4}
            className={getInputClassName(errors.description) + " resize-none"}
          />
        </Field>

        <Field label="Image URL" icon={ICONS.image}>
          <input
            value={form.image}
            onChange={(e) => onFieldChange("image", e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className={getInputClassName(false)}
          />
          {form.image && (
            <div className="mt-2 rounded-xl overflow-hidden w-20 h-20 border border-slate-200">
              <img
                src={form.image}
                alt="preview"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </Field>

        <div className="flex items-center gap-3 justify-end pt-2 border-t border-slate-50">
          <button
            onClick={onCancel}
            className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-5 sm:px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:scale-105 active:scale-95"
          >
            {isCreate ? "Create" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { ICONS } from "../../constants/icons";
import StatsOverview from "./StatsOverview";
import ProductToolbar from "./ProductToolbar";
import ProductTable from "./ProductTable";
import ProductMobileList from "./ProductMobileList";

// Full "Products" page: header, stats, search/filter toolbar, table/list, and footer count.
export default function ProductsPage({
  products,
  filtered,
  stats,
  search,
  onSearchChange,
  filterCat,
  onFilterChange,
  showFilter,
  onToggleFilter,
  categories,
  onCreate,
  onEdit,
  onDeleteRequest,
}) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Products Management</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Manage your inventory, prices, and stock levels.</p>
        </div>
        <button
          onClick={onCreate}
          className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          {ICONS.plus}
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <StatsOverview stats={stats} />

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <ProductToolbar
          search={search}
          onSearchChange={onSearchChange}
          filterCat={filterCat}
          onFilterChange={onFilterChange}
          showFilter={showFilter}
          onToggleFilter={onToggleFilter}
          categories={categories}
        />

        <ProductTable products={filtered} onEdit={onEdit} onDeleteRequest={onDeleteRequest} />
        <ProductMobileList products={filtered} onEdit={onEdit} onDeleteRequest={onDeleteRequest} />

        <div className="px-4 sm:px-6 py-3 border-t border-slate-50">
          <p className="text-xs text-slate-400">
            Showing {filtered.length} of {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
}

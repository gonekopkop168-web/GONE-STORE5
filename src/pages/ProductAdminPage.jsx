
import { useState, useMemo } from "react";
import { CATEGORIES } from "../constants/categories";
import { useProducts, EMPTY_FORM } from "../hooks/useProducts";
import { validateProductForm } from "../utils/validateProductForm";
import Toast from "../components/common/Toast";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import ProductsPage from "../components/products/ProductsPage";
import ProductForm from "../components/products/ProductForm";

export default function ProductAdminPage() {
  const { products, stats, addProduct, updateProduct, deleteProduct } = useProducts();

  const [page, setPage] = useState("products"); // "products" | "create" | "edit"
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const goToPage = (nextPage) => {
    setPage(nextPage);
    setSidebarOpen(false);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat ? p.category === filterCat : true;
        return matchSearch && matchCat;
      }),
    [products, search, filterCat]
  );

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    goToPage("create");
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      description: product.description,
      image: product.image,
    });
    setErrors({});
    goToPage("edit");
  };

  const handleFieldChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = () => {
    const validationErrors = validateProductForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    if (page === "create") {
      addProduct(form);
      showToast("Product created successfully!");
    } else {
      updateProduct(editingProduct.id, form);
      showToast("Product updated successfully!");
    }
    goToPage("products");
  };

  const handleDeleteConfirm = () => {
    deleteProduct(deleteConfirm);
    setDeleteConfirm(null);
    showToast("Product deleted.", "error");
  };

  const handleFilterChange = (category) => {
    setFilterCat(category);
    setShowFilter(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <Toast toast={toast} />

      <ConfirmDeleteModal
        open={!!deleteConfirm}
        onCancel={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteConfirm}
      />

      <Sidebar
        page={page}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onGoProducts={() => goToPage("products")}
        onGoCreate={openCreate}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {page === "products" && (
            <ProductsPage
              products={products}
              filtered={filtered}
              stats={stats}
              search={search}
              onSearchChange={setSearch}
              filterCat={filterCat}
              onFilterChange={handleFilterChange}
              showFilter={showFilter}
              onToggleFilter={() => setShowFilter((s) => !s)}
              categories={CATEGORIES}
              onCreate={openCreate}
              onEdit={openEdit}
              onDeleteRequest={setDeleteConfirm}
            />
          )}

          {(page === "create" || page === "edit") && (
            <ProductForm
              mode={page}
              form={form}
              errors={errors}
              onFieldChange={handleFieldChange}
              onSubmit={handleSubmit}
              onCancel={() => goToPage("products")}
              categories={CATEGORIES}
            />
          )}
        </main>
      </div>
    </div>
  );
}

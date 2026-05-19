import { useState, useMemo, useEffect } from "react";

const CATEGORIES = ["Clothes", "Electronics", "Shoes", "Accessories", "Books", "Sports"];

const INITIAL_PRODUCTS = [
  { id: 1, name: "Majestic Mountain Graphic Tee", description: "Elevate your wardrobe with this premium graphic tee", category: "Clothes", price: 44, stock: 120, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=80" },
  { id: 2, name: "Classic Red Pullover Hoodie", description: "Elevate your casual wardrobe with this cozy hoodie", category: "Clothes", price: 10, stock: 85, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&q=80" },
  { id: 3, name: "Classic Heather Gray Hoodie", description: "Stay cozy and stylish with this classic hoodie", category: "Clothes", price: 69, stock: 60, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80" },
  { id: 4, name: "Classic Grey Hooded Sweatshirt", description: "Elevate your casual wear with this comfortable sweatshirt", category: "Clothes", price: 90, stock: 40, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=80&q=80" },
  { id: 5, name: "Wireless Noise-Cancelling Headphones", description: "Premium sound quality with 30hr battery life", category: "Electronics", price: 199, stock: 35, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80" },
  { id: 6, name: "Running Shoes Pro", description: "Lightweight and durable for peak performance", category: "Shoes", price: 120, stock: 0, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80" },
];

const ICONS = {
  box: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>),
  trend: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>),
  alert: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
  cross: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>),
  edit: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>),
  trash: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>),
  search: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  plus: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>),
  filter: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>),
  bell: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>),
  chevron: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 18 9 12 15 6" /></svg>),
  menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
  close: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  image: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>),
};

const EMPTY_FORM = { name: "", category: "", price: "", stock: "", description: "", image: "" };

const inputCls = (err) =>
  `w-full px-3 py-2.5 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-blue-400 ${err ? "border-red-400 bg-red-50" : "border-slate-200 bg-white hover:border-slate-300"}`;

const Field = ({ label, icon, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
      <span className="text-blue-500">{icon}</span>{label}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default function ProductAdmin() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [page, setPage] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [page]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const stats = useMemo(() => ({
    total: products.length,
    stock: products.reduce((s, p) => s + p.stock, 0),
    low: products.filter(p => p.stock > 0 && p.stock <= 10).length,
    out: products.filter(p => p.stock === 0).length,
  }), [products]);

  const filtered = useMemo(() => products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat ? p.category === filterCat : true;
    return matchSearch && matchCat;
  }), [products, search, filterCat]);

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = "Product name is required";
    if (!f.category) e.category = "Category is required";
    if (!f.price || isNaN(f.price) || Number(f.price) < 0) e.price = "Valid price required";
    if (f.stock === "" || isNaN(f.stock) || Number(f.stock) < 0) e.stock = "Valid stock required";
    if (!f.description.trim()) e.description = "Description is required";
    return e;
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setPage("create");
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({ name: product.name, category: product.category, price: String(product.price), stock: String(product.stock), description: product.description, image: product.image });
    setErrors({});
    setPage("edit");
  };

  const handleSubmit = () => {
    const e = validate(form);
    if (Object.keys(e).length) { setErrors(e); return; }
    if (page === "create") {
      const newP = { id: Date.now(), name: form.name.trim(), category: form.category, price: Number(form.price), stock: Number(form.stock), description: form.description.trim(), image: form.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80" };
      setProducts(prev => [newP, ...prev]);
      showToast("Product created successfully!");
    } else {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, name: form.name.trim(), category: form.category, price: Number(form.price), stock: Number(form.stock), description: form.description.trim(), image: form.image || p.image } : p));
      showToast("Product updated successfully!");
    }
    setPage("products");
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
    showToast("Product deleted.", "error");
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl text-white text-sm font-medium flex items-center gap-2 transition-all max-w-xs ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"}`}>
          <span>{toast.type === "error" ? "🗑️" : "✅"}</span>{toast.msg}
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-sm flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-2xl">🗑️</div>
            <div className="text-center">
              <p className="font-bold text-slate-800 text-lg">Delete Product?</p>
              <p className="text-slate-500 text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 w-full">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-56 bg-white border-r border-slate-100
        flex flex-col py-6 px-4 gap-2 shrink-0
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <span className="font-bold text-slate-800 text-base">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600">
            {ICONS.close}
          </button>
        </div>

        <button
          onClick={() => setPage("products")}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${page === "products" ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <span>{ICONS.box}</span> Products
          {page === "products" && <span className="ml-auto">{ICONS.chevron}</span>}
        </button>

        <button
          onClick={openCreate}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${page === "create" || page === "edit" ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <span>{ICONS.plus}</span>
          {page === "edit" ? "Edit Product" : "Create Product"}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <header className="h-14 sm:h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
          {/* Hamburger on mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
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
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm font-bold">G1</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          {/* ===== PRODUCTS PAGE ===== */}
          {page === "products" && (
            <div className="flex flex-col gap-4 sm:gap-6">

              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Products Management</h1>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Manage your inventory, prices, and stock levels.</p>
                </div>
                <button
                  onClick={openCreate}
                  className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  {ICONS.plus}
                  <span className="hidden sm:inline">Add Product</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              {/* Stats: 2x2 mobile, 4x1 desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: "Total Products", value: stats.total, icon: ICONS.box, color: "bg-blue-500" },
                  { label: "Total Stock", value: stats.stock.toLocaleString(), icon: ICONS.trend, color: "bg-emerald-500" },
                  { label: "Low Stock", value: stats.low, icon: ICONS.alert, color: "bg-amber-500" },
                  { label: "Out of Stock", value: stats.out, icon: ICONS.cross, color: "bg-red-500" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-5 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${s.color} flex items-center justify-center text-white shadow-md shrink-0`}>{s.icon}</div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 font-medium truncate">{s.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-slate-800">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Card */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">

                {/* Search & Filter */}
                <div className="flex items-center justify-between gap-3 p-3 sm:p-4 border-b border-slate-50">
                  <div className="relative flex-1 sm:flex-none">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{ICONS.search}</span>
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm w-full sm:w-64 outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setShowFilter(!showFilter)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      {ICONS.filter}
                      <span className="hidden sm:inline">Filters</span>
                      {filterCat && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                    </button>
                    {showFilter && (
                      <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-10 w-44">
                        <p className="text-xs font-semibold text-slate-400 uppercase px-3 py-1">Category</p>
                        <button onClick={() => { setFilterCat(""); setShowFilter(false); }} className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${!filterCat ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-slate-50"}`}>All</button>
                        {CATEGORIES.map(c => (
                          <button key={c} onClick={() => { setFilterCat(c); setShowFilter(false); }} className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${filterCat === c ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-slate-50"}`}>{c}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Table (md+) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-50">
                        <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Product</th>
                        <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Category</th>
                        <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Price</th>
                        <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Stock</th>
                        <th className="text-right text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filtered.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-16 text-slate-400 text-sm">No products found.</td></tr>
                      ) : filtered.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0" onError={e => { e.target.onerror = null; e.target.style.display = "none"; }} />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate max-w-[180px] lg:max-w-xs">{p.name}</p>
                                <p className="text-xs text-slate-400 truncate max-w-[180px] lg:max-w-xs">{p.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold whitespace-nowrap">{p.category}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm font-bold text-slate-800">${p.price.toFixed(2)}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-sm font-semibold ${p.stock === 0 ? "text-red-500" : p.stock <= 10 ? "text-amber-500" : "text-emerald-500"}`}>
                              {p.stock === 0 ? "Out of stock" : p.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">{ICONS.edit}</button>
                              <button onClick={() => setDeleteConfirm(p.id)} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">{ICONS.trash}</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card List (below md) */}
                <div className="md:hidden divide-y divide-slate-50">
                  {filtered.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm">No products found.</div>
                  ) : filtered.map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-4">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0" onError={e => { e.target.onerror = null; e.target.style.display = "none"; }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-semibold">{p.category}</span>
                          <span className="text-sm font-bold text-slate-700">${p.price.toFixed(2)}</span>
                          <span className={`text-xs font-semibold ${p.stock === 0 ? "text-red-500" : p.stock <= 10 ? "text-amber-500" : "text-emerald-500"}`}>
                            {p.stock === 0 ? "Out" : `${p.stock} in stock`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">{ICONS.edit}</button>
                        <button onClick={() => setDeleteConfirm(p.id)} className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all">{ICONS.trash}</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 sm:px-6 py-3 border-t border-slate-50">
                  <p className="text-xs text-slate-400">Showing {filtered.length} of {products.length} products</p>
                </div>
              </div>
            </div>
          )}

          {/* ===== CREATE / EDIT PAGE ===== */}
          {(page === "create" || page === "edit") && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-start justify-between gap-3 mb-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-blue-500">{ICONS.box}</span>
                    {page === "create" ? "Create New Product" : "Edit Product"}
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    {page === "create" ? "Add a new item to your inventory catalog." : "Update the product details below."}
                  </p>
                </div>
                {page === "create" && (
                  <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600 hover:bg-slate-50 transition-colors shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
                    <span className="hidden sm:inline">New Listing</span>
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-5">

                {/* Name + Category: stack on mobile, side by side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <Field label="Product Name" icon={ICONS.box} error={errors.name}>
                    <input
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Wireless Headphones"
                      className={inputCls(errors.name)}
                    />
                  </Field>
                  <Field
                    label="Category"
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>}
                    error={errors.category}
                  >
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputCls(errors.category)}>
                      <option value="">Select Category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Price + Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <Field
                    label="Price ($)"
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>}
                    error={errors.price}
                  >
                    <input type="number" min="0" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" className={inputCls(errors.price)} />
                  </Field>
                  <Field
                    label="Stock Quantity"
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>}
                    error={errors.stock}
                  >
                    <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="0" className={inputCls(errors.stock)} />
                  </Field>
                </div>

                {/* Description */}
                <Field
                  label="Description"
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>}
                  error={errors.description}
                >
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Tell us more about this product..."
                    rows={4}
                    className={inputCls(errors.description) + " resize-none"}
                  />
                </Field>

                {/* Image URL */}
                <Field label="Image URL" icon={ICONS.image}>
                  <input
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className={inputCls(false)}
                  />
                  {form.image && (
                    <div className="mt-2 rounded-xl overflow-hidden w-20 h-20 border border-slate-200">
                      <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display = "none"} />
                    </div>
                  )}
                </Field>

                {/* Buttons */}
                <div className="flex items-center gap-3 justify-end pt-2 border-t border-slate-50">
                  <button
                    onClick={() => setPage("products")}
                    className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-5 sm:px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:scale-105 active:scale-95"
                  >
                    {page === "create" ? "Create" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

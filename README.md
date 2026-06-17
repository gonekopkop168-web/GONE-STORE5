# GONE STORE — Product Admin Dashboard

React + Vite + Tailwind CSS admin dashboard for managing a product catalog (create, edit, delete, search, filter, and stock/inventory stats). Data is persisted to the browser's `localStorage`.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Project Structure

```
src/
├── App.jsx                     # Root component, renders the admin page
├── main.jsx                    # React entry point
├── index.css / App.css         # Global styles (Tailwind import)
│
├── pages/
│   └── ProductAdminPage.jsx    # Top-level page: owns app state & navigation
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx         # Left navigation (Products / Create Product)
│   │   └── Topbar.jsx          # Header bar (menu, notifications, profile)
│   │
│   ├── products/
│   │   ├── ProductsPage.jsx       # Products list page layout
│   │   ├── StatsOverview.jsx      # Total/stock/low/out-of-stock cards
│   │   ├── ProductToolbar.jsx     # Search input + category filter
│   │   ├── ProductTable.jsx       # Desktop table view
│   │   ├── ProductMobileList.jsx  # Mobile card list view
│   │   └── ProductForm.jsx        # Create / edit product form
│   │
│   └── common/
│       ├── Field.jsx              # Labeled form field wrapper
│       ├── Toast.jsx              # Success/error toast notification
│       └── ConfirmDeleteModal.jsx # Delete confirmation dialog
│
├── hooks/
│   └── useProducts.js          # Product state, localStorage sync, stats, CRUD actions
│
├── constants/
│   ├── categories.js           # Available product categories
│   ├── initialProducts.js      # Seed/demo product data
│   └── icons.jsx                # Shared SVG icon set
│
└── utils/
    ├── validateProductForm.js  # Form validation logic
    └── getInputClassName.js    # Shared input styling helper
```

## Notes

- All product data lives in `localStorage` under the `products` key — clearing site data resets it back to the seed list in `constants/initialProducts.js`.
- Functionality and visual design are unchanged from the original single-file version; the code has only been split into smaller, focused components and modules for readability and maintainability.

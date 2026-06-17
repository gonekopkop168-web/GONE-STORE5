// Validates the product create/edit form. Returns an object of field -> error message.
// An empty object means the form is valid.
export function validateProductForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Product name is required";
  if (!form.category) errors.category = "Category is required";
  if (!form.price || isNaN(form.price) || Number(form.price) < 0) errors.price = "Valid price required";
  if (form.stock === "" || isNaN(form.stock) || Number(form.stock) < 0) errors.stock = "Valid stock required";
  if (!form.description.trim()) errors.description = "Description is required";
  return errors;
}

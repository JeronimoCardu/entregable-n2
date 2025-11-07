const tbody = document.querySelector("tbody");
tbody.addEventListener("click", async (e) => {
  const btn = e.target.closest("button.delete");
  if (!btn) return;

  const productId = btn.dataset.id;
  if (!productId) {
    console.error("No se encontró productId en el botón");
    return;
  }

  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Error al eliminar el producto, status:", response.status);
      return;
    }

    console.log("Producto eliminado correctamente (fetch)");

    const row = btn.closest("tr");
    if (row) row.remove();
  } catch (err) {
    console.error("Error al eliminar el producto:", err);
  }
});

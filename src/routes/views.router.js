const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const response = await fetch(`${baseUrl}/api/products`);
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    const products = await response.json();
    res.render("home", { products });
  } catch (error) {
    console.error("❌ Error en /:", error);
    res.status(500).send("Error loading products");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const response = await fetch(`${baseUrl}/api/products`);
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    const products = await response.json();
    res.render("realtimeproducts", { products });
  } catch (error) {
    console.error("❌ Error en /realtimeproducts:", error);
    res.status(500).send("Error loading products");
  }
});

module.exports = router;

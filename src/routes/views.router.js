const express = require("express");
const router = express.Router();
const { readProductsFile } = require("../utils/productsManage");

router.get("/", async (req, res) => {
  try {
    const response = await fetch(`${process.env.URL_API}/api/products`);
    const products = await response.json();
    res.render("home", { products });
  } catch (error) {
    res.status(500).send("Error loading products");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const response = await fetch(`${process.env.URL_API}/api/products`);
    const products = await (await response).json();
    res.render("realtimeproducts", { products });
  } catch (error) {
    res.status(500).send("Error loading products");
  }
});

module.exports = router;

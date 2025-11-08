const express = require("express");
const router = express.Router();
const fs = require("fs");
const {
  readProductsFile,
  writeProductsFile,
} = require("../utils/productsManage");
const crypto = require("crypto");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const file = __dirname + "/../../products.json";
console.log(file)

router.get("/", async (req, res) => {
  try {
    const products = await readProductsFile(file);
    res.json(products);
  } catch (error) {
    res.status(500).send("Error loading products");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const products = await readProductsFile(file);
    const product = products.find((p) => p.id === productId);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (error) {
    res.status(500).send("Error loading product");
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const image = req.file ? req.file.filename : null;
  try {
    const newProduct = req.body;
    const products = await readProductsFile(file);
    const productToAdd = {
      ...newProduct,
      image: `/uploads/${image}`,
      id: crypto.randomUUID(),
    };
    products.push(productToAdd);
    await writeProductsFile(file, products);
    req.app.get("io").emit("productAdded", productToAdd);
    res.status(201).redirect("/realtimeproducts");
  } catch (error) {
    res.status(500).send("Error adding product");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productToDeleteId = req.params.id;
    const products = await readProductsFile(file);
    console.log(productToDeleteId)
    const updatedProducts = products.filter((product) => {
      if (product.id === productToDeleteId) {
        const imagePath = `public${product.image}`;
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error al borrar la imagen:", err);
        });
        return false;
      }
      return true;
    });
    await writeProductsFile(file, updatedProducts);
    req.app.get("io").emit("productDeleted", productToDeleteId);
    res.status(204).send("Producto eliminado correctamente");
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Products = require("../Models/Products");

// INSERT PRODUCT
router.post("/insertproduct", async (req, res) => {
  try {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    if (!ProductName || !ProductPrice || !ProductBarcode) {
      return res.status(422).json({ error: "All fields required" });
    }

    const exists = await Products.findOne({ ProductBarcode });
    if (exists) {
      return res.status(422).json({ error: "Product already exists" });
    }

    const addProduct = new Products({
      ProductName,
      ProductPrice,
      ProductBarcode,
    });

    await addProduct.save();
    return res.status(201).json(addProduct);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET ALL PRODUCTS
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET SINGLE PRODUCT
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// UPDATE PRODUCT
router.put("/updateproduct/:id", async (req, res) => {
  try {
    const updated = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// DELETE PRODUCT
router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const deleted = await Products.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleted);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const app = express();
const PORT = 3000;

const productData = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    sku: "SKU001",
    productName: "Product 1",
    price: 100,
    quantity: 10,
    category: "Category 1",
    description: "This is a description of Product 1",
    status: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    sku: "SKU002",
    productName: "Product 2",
    price: 200,
    quantity: 20,
    category: "Category 2",
    description: "",
    status: false,
  },
];

// Middleware to parse JSON bodies
app.use(express.json());

// GET: Fetch all products
app.get("/products", (req, res) => {
  res.status(200).json(productData);
});

// GET: Fetch a single product by ID
app.get("/products/:id", (req, res) => {
  const product = productData.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.status(200).json(product);
});

// POST: Create a new product
app.post("/products", (req, res) => {
  const newProduct = {
    id: crypto.randomUUID(), // Generate a unique ID for the new product
    sku: req.body.sku,
    productName: req.body.productName,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    description: req.body.description || "",
    status: req.body.status || false,
  };
  productData.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT: Update an existing product
app.put("/products/:id", (req, res) => {
  const productIndex = productData.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }
  productData[productIndex] = { ...productData[productIndex], ...req.body };
  res.status(200).json(productData[productIndex]);
});

// DELETE: Remove a product
app.delete("/products/:id", (req, res) => {
  const productIndex = productData.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1) return res.status(404).send("Product not found");

  const deletedProduct = productData.filter(
    (product) => product.id !== req.params.id,
  );
  res.status(200).json(deletedProduct);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);

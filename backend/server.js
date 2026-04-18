const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
let products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 499 },
];

// GET: Fetch all products
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// GET: Fetch a single product by ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");
  res.status(200).json(product);
});

// POST: Create a new product
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT: Update an existing product
app.put("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("Product not found");

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  res.status(200).json(product);
});

// DELETE: Remove a product
app.delete("/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id),
  );
  if (productIndex === -1) return res.status(404).send("Product not found");

  const deletedProduct = products.splice(productIndex, 1); // Use filter method
  res.status(200).json(deletedProduct);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);

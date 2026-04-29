const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());



app.get("/", (req, res) => {
    res.json({ message: "Welcome to Shop API" });
});

app.get("/products", (req, res) => {
    res.json([{ id: 1, name: "Laptop" }]);
});

app.post("/products", (req, res) => {
    res.status(201).json({
        message: "Product created",
        product: req.body
    });
});

app.get("/products/:id", (req, res) => {
    res.json({ productId: req.params.id });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
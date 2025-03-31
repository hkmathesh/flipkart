require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const addressRoutes = require("./routes/addressRoutes");

const app = express();

// Middleware
app.use(express.json()) // Middleware to parse JSON requests
app.use(cors()) // Enable CORS for frontend access

// Connect to MongoDB
connectDB();

// Use Routes
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/addresses", addressRoutes);

app.get("/", (req, res) => {
    res.send("Working fine!")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

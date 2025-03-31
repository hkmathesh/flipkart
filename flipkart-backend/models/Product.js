const mongoose = require("mongoose");

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    storage: String,
    display: String,
    camera: String,
    processor: String,
    warranty: String,
    price: Number,
    originalPrice: Number,
})

// Create Product Model
const Product = mongoose.model("Product", productSchema)

module.exports = Product
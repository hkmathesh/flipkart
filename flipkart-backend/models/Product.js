const mongoose = require("mongoose");

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    category: String, // Add category field
    specifications: Object, // Store all product-specific details dynamically
    price: Number,
    originalPrice: Number,
    image: { type: String }, // Store the image URL here
})

// Create Product Model
const Product = mongoose.model("Product", productSchema)

module.exports = Product
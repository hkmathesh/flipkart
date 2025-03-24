require("dotenv").config(); // Load environment variables

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(express.json()) // Middleware to parse JSON requests
app.use(cors()) // Enable CORS for frontend access

// Debugging: Check if .env is loaded
console.log("MongoDB URI:", process.env.MONGO_URI);

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection successful!");
    } catch (error) {
        console.error("Connection failed:", error);
    }
}
connectDB();

// MONGO_URI=mongodb+srv://hkmathesh:u36INrIbXSVkTDMi@cluster0.fq2wn.mongodb.net/flipkartDB?retryWrites=true&w=majority


// Define Schema
const productSchema = new mongoose.Schema({
    name: String,
    storage: String,
    display: String,
    camera: String,
    processor: String,
    warranty: String,
    price: Number,
    originalPrice: Number,
})

const Product = mongoose.model("Product", productSchema)

// Function to insert products into the database
const insertProducts = async () => {
    try {
        const products = [
            {
                name: "iPhone 14",
                storage: "128GB",
                display: "6.1-inch OLED",
                camera: "12MP Dual",
                processor: "A15 Bionic",
                warranty: "1 Year",
                price: 69999,
                originalPrice: 79999
            },
            {
                name: "Samsung Galaxy S23",
                storage: "256GB",
                display: "6.8-inch AMOLED",
                camera: "50MP Triple",
                processor: "Snapdragon 8 Gen 2",
                warranty: "1 Year",
                price: 74999,
                originalPrice: 84999
            },
            {
                name: "OnePlus 11",
                storage: "256GB",
                display: "6.7-inch AMOLED",
                camera: "48MP Triple",
                processor: "Snapdragon 8 Gen 2",
                warranty: "1 Year",
                price: 56999,
                originalPrice: 64999
            },
            {
                name: "Google Pixel 7 Pro",
                storage: "128GB",
                display: "6.7-inch OLED",
                camera: "50MP Triple",
                processor: "Google Tensor G2",
                warranty: "1 Year",
                price: 68999,
                originalPrice: 78999
            },
            {
                name: "Xiaomi 13 Pro",
                storage: "256GB",
                display: "6.73-inch AMOLED",
                camera: "50MP Triple",
                processor: "Snapdragon 8 Gen 2",
                warranty: "1 Year",
                price: 79999,
                originalPrice: 89999
            }
        ];

        await Product.insertMany(products);
        console.log("Products inserted successfully!");
    } catch (error) {
        console.error("Error inserting products:", error);
    }
};

// Uncomment this line and run the backend once to insert the data, then comment it again
// insertProducts();

// Available products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log(products)
        res.send(products)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get("/", (req, res) => {
    console.log("Working fine!")
    res.send("Working fine!")
})



app.listen(5000, () => {
    console.log("Server started...")
})
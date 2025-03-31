require("dotenv").config(); // Load environment variables

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// Import Models
const Product = require("./models/Product")
const Cart = require("./models/Cart")
const Address = require("./models/Address")
const Order = require("./models/Order")

const app = express()

app.use(express.json()) // Middleware to parse JSON requests
app.use(cors()) // Enable CORS for frontend access

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

// Create an API to fetch all Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        // console.log(products)
        res.send(products)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Fetch Cart for a User
app.get("/api/cart/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        let cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart) {
            return res.status(200).json({ userId, items: [] }); // Ensure an empty cart is returned
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
});

// Adds a new product or increases quantity for a user in the cart
app.post("/api/cart", async (req, res) => {
    try {
        const { userId, items } = req.body;
        const productId = items[0].productId;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If cart does not exist, create a new one
            cart = new Cart({ userId, items });
        } else {
            // Check if the product already exists in the cart
            const existingProduct = cart.items.find(item => item.productId.toString() === productId);

            if (existingProduct) {
                // If the product exists, increase the quantity
                existingProduct.quantity += 1;
            } else {
                // If the product does not exist, add it to the cart
                cart.items.push({ productId, quantity: 1 });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
});

// Updates the quantity of an existing product in the cart
app.put("/api/cart/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Update quantity for the specific product
        cart.items = cart.items.map((item) =>
            item.productId.toString() === productId ? { ...item, quantity } : item
        );

        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
});

// Remove product from cart
app.delete("/api/cart/:userId/:productId", async (req, res) => {
    const { userId, productId } = req.params;

    try {
        // Find the cart for the given user
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for user" });
        }

        // Filter out the product to remove it
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        if (cart.items.length === initialLength) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        await cart.save();
        res.json({ message: "Item removed successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing item", error });
    }
});

// Clear Cart After Order Placement
app.delete("/api/cart/:userId", async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.params.userId });
        res.json({ message: "Cart cleared after order placement" });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error });
    }
});

// Create an API to Save Orders
app.post("/api/orders", async (req, res) => {
    try {
        console.log("Received Order Data:", req.body); // Debugging log

        const { userId, items, totalPrice, paymentMethod, addressId } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order items cannot be empty" });
        }

        if (!addressId) {
            return res.status(400).json({ message: "Delivery address is required" });
        }

        const newOrder = new Order({ userId, items, totalPrice, paymentMethod, addressId });
        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch Orders for a Specific User
app.get("/api/orders/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        let orders = await Order.find({ userId })
            .populate("items.productId")
            .populate("addressId")
            .sort({ createdAt: -1 });

        res.status(200).json(orders || []); // Return an empty array if no orders exist
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

// API to save an address
app.post("/api/addresses", async (req, res) => {
    try {
        const { userId, ...addressData } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const newAddress = new Address({ userId, ...addressData });
        await newAddress.save();

        res.status(201).json({ message: "Address saved successfully!", address: newAddress });
    } catch (error) {
        console.error("Error saving address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// API to fetch Addresses Belonging to a Specific User
app.get("/api/addresses/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const addresses = await Address.find({ userId });
        res.json(addresses);
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// API to update an address
app.put("/api/addresses/:id", async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Address updated successfully!", address: updatedAddress });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/", (req, res) => {
    console.log("Working fine!")
    res.send("Working fine!")
})

app.listen(5000, () => {
    console.log("Server started...")
})
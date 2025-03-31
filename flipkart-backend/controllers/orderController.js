// Import Model
const Order = require("../models/Order");

// Save Orders
const placeOrder = async (req, res) => {
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
};

// Fetch Orders for a Specific User
const getUserOrders = async (req, res) => {
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
};

module.exports = { placeOrder, getUserOrders };

// Import Model
const Cart = require("../models/Cart");

// Fetch Cart for a User
const getCart = async (req, res) => {
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
};

// Adds a new product or increases quantity for a user in the cart
const updateCart = async (req, res) => {
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
};

// Updates the quantity of an existing product in the cart
const updateCartQuantity = async (req, res) => {
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
};

// Remove product from cart
const removeCartItem = async (req, res) => {
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
};

// Clear Cart After Order Placement
const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.params.userId });
        res.json({ message: "Cart cleared after order placement" });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error });
    }
};

module.exports = { getCart, updateCart, updateCartQuantity, removeCartItem, clearCart };

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // 🔹 Load cart from localStorage when component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // 🔹 Update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // ✅ Add to Cart
    const addToCart = (newProduct) => {
        setCart((prevCart) => {
            // Check if the product is already in the cart
            const exists = prevCart.some((item) => item._id === newProduct._id);

            // If it exists, return the cart as is; otherwise, add the new product
            return exists ? prevCart : [...prevCart, newProduct];
        });
    };


    // ✅ Remove from Cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((product) => product._id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

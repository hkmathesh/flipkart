import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import iphone_15 from "../assets/images/iphone-1.jpg";
import { Link } from "react-router-dom";

const ViewCart = () => { // 🔹 FIX: Renamed function to match the file name
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    // Fetch product details when component mounts
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');

                // Find the product by ID
                const foundProduct = response.data.find((item) => item._id === id);

                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    // 🔹 FIX: Prevent errors by checking if product is null
    if (loading) {
        return <p className="text-center text-blue-500 text-3xl p-10">Loading...</p>;
    }

    if (!product) {
        return <p className="text-center text-red-500">Product not found</p>;
    }

    // Increase quantity
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // Decrease quantity but not below 1
    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    };

    // Calculate total price
    const totalPrice = product.price * quantity;
    const originalTotalPrice = product.originalPrice * quantity;
    const discount = originalTotalPrice - totalPrice;

    // Calculate dynamic discount percentage
    const discountPercentage = ((product.originalPrice - product.price) / product.originalPrice) * 100;

    return (
        <div className="bg-gray-200 flex flex-col md:flex-row gap-5 px-8 py-5">
            {/* Left Side: Product Details */}
            <div className="bg-white flex flex-col md:flex-row gap-6 px-5 py-5 w-full md:w-3/4">
                {/* Product Image */}
                <div className="flex-shrink-0 w-full md:w-48">
                    <img
                        src={product.image || iphone_15} // Use API image or fallback
                        alt={product.name}
                        className="w-full h-48 object-contain"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-grow p-2">
                    <h1 className="text-lg md:text-xl font-medium hover:text-blue-600">{product.name}</h1>
                    <p className="text-gray-500 text-sm sm:text-base">Seller: TrueComRetail</p>

                    {/* Price Section */}
                    <div className="mt-4 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4">
                        <p className="text-gray-500 line-through text-sm sm:text-base">₹{product.originalPrice.toLocaleString()}</p>
                        <p className="text-2xl md:text-3xl font-bold">₹{product.price.toLocaleString()}</p>
                        <p className="text-green-700 text-sm sm:text-base">{discountPercentage.toFixed()}% off</p>
                    </div>

                    {/* Delivery Info */}
                    <p className="mt-2 text-sm sm:text-base">
                        Delivery by <span className="font-medium">Mon Mar 17</span> |
                        <span className="text-gray-500 line-through pl-1">₹40</span>
                        <span className="text-green-700"> Free </span>
                    </p>

                    {/* Quantity Selector & Actions */}
                    <div className="mt-4 flex items-center justify-between">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2">
                            <button className="p-2 bg-gray-300 rounded text-lg" onClick={decreaseQuantity}>-</button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="w-10 text-center border border-gray-300"
                            />
                            <button className="p-2 bg-gray-300 rounded text-lg" onClick={increaseQuantity}>+</button>
                        </div>

                        {/* Save & Remove Options */}
                        <div className="flex flex-col text-blue-600 text-sm font-medium gap-2">
                            <button className="hover:underline">SAVE FOR LATER</button>
                            <button className="hover:underline">REMOVE</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Price Details Table */}
            <div className="bg-white p-5 w-full md:w-1/4">
                <table className="w-full text-sm md:text-base">
                    <tbody>
                        <tr>
                            <td className="text-lg text-gray-600 border-b pb-2" colSpan={2}>
                                Price Details
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Price ({quantity} item{quantity > 1 ? "s" : ""})</td>
                            <td className="py-2 text-right">₹{originalTotalPrice.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="py-2">Discount</td>
                            <td className="py-2 text-right text-green-700">- ₹{discount.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="py-2">Delivery Charges</td>
                            <td className="py-2 text-right text-green-700">
                                <span className="text-gray-500 line-through">₹40</span> Free
                            </td>
                        </tr>
                        <tr className="font-medium">
                            <td className="py-2">Total Amount</td>
                            <td className="py-2 text-right">₹{totalPrice.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="text-green-700 font-medium py-2" colSpan={2}>
                                You will save ₹{discount.toLocaleString()} on this order
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewCart; // 🔹 FIX: Export with correct component name

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import iphone_15 from "../assets/images/iphone-1.jpg";
import { useCart } from "../context/CartContext";   // Import cart context

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart(); // Use cart context

    // Fetch product details when component mounts
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');

                // Find the product by id
                const foundProduct = response.data.find((item) => item._id === id);
                setProduct(foundProduct);
            } catch (error) {
                console.error("Error fetching product details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]); // Fetch data whenever ID changes

    if (loading) {
        return <p className="text-center text-blue-500 text-3xl p-10">Loading...</p>;
    }

    if (!product) {
        return <p className="text-center text-red-500">Product not found</p>;
    }

    // Calculate dynamic discount percentage
    const discountPercentage = ((product.originalPrice - product.price) / product.originalPrice) * 100;

    return (
        <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-10 mx-4 md:mx-8 lg:mx-16 py-6">
            {/* Product Image Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="w-full">
                    <img src={iphone_15} alt={product.name} className="w-full max-h-96 object-contain border border-gray-200 px-2 py-5" />
                </div>
                <div className="flex justify-center items-center flex-wrap gap-3 sm:gap-5 mt-4 w-full">
                    <button className="bg-[#FF9F00] text-white font-medium px-5 sm:px-7 py-3 sm:py-4 w-5/12 sm:w-auto cursor-pointer"
                        onClick={() => addToCart({ ...product, quantity: 1 })} >
                        <i className="fa-solid fa-cart-shopping fa-xs"></i> ADD TO CART
                    </button>
                    <button className="bg-[#FB641B] text-white font-medium px-5 sm:px-7 py-3 sm:py-4 w-5/12 sm:w-auto cursor-pointer">
                        <i className="fa-solid fa-bolt-lightning"></i> BUY NOW
                    </button>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                {/* Product Name */}
                <h1 className="text-xl sm:text-2xl font-medium hover:text-blue-600">{product.name}</h1>

                {/* Ratings & Reviews */}
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="bg-green-700 text-white font-medium flex items-center rounded px-2 py-1">
                        <p>4.6</p>
                        <p className="ml-1"><i className="fa-solid fa-star fa-xs"></i></p>
                    </div>
                    <p className="text-gray-400 font-medium text-sm sm:text-base">
                        7,652 Ratings & 359 Reviews
                    </p>
                </div>

                {/* Pricing Details */}
                <div className="text-sm sm:text-base">
                    {/* <p className="text-green-700 font-medium">Extra ₹4901 off</p> */}
                    <div className="flex items-center gap-4">
                        <p className="text-2xl md:text-3xl font-bold">₹{product.price.toLocaleString()}</p>
                        <p className="text-gray-500 line-through text-sm sm:text-base">₹{product.originalPrice.toLocaleString()}</p>
                        <p className="text-green-700 text-sm sm:text-base">{discountPercentage.toFixed()}% off</p>
                    </div>
                </div>

                {/* Available Offers */}
                <div className="mt-2">
                    <p className="text-lg font-medium">Available offers</p>
                    <ul className="text-sm sm:text-base">
                        <li><span className="font-medium">Bank Offer:</span> 1% Upto ₹2000 on Phone UPI Transaction <span className="text-blue-600 font-medium">T&C</span></li>
                        <li><span className="font-medium">Bank Offer:</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span className="text-blue-600 font-medium">T&C</span></li>
                        <li><span className="font-medium">Bank Offer:</span> 5% off up to ₹750 on IDFC FIRST Power Women Platinum Debit Cards <span className="text-blue-600 font-medium">T&C</span></li>
                        <li><span className="font-medium">Special Price:</span> Get extra ₹4901 off (price inclusive of cashback/coupon) <span className="text-blue-600 font-medium">T&C</span></li>
                    </ul>
                </div>

                {/* Highlights Section */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <p className="text-gray-500 font-medium">Highlights</p>
                    <ul className="list-disc list-inside text-gray-800 text-sm sm:text-base max-w-sm">
                        <li className="marker:text-gray-400">{product.storage}</li>
                        <li className="marker:text-gray-400">{product.display}</li>
                        <li className="marker:text-gray-400">{product.camera}</li>
                        <li className="marker:text-gray-400">{product.processor}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

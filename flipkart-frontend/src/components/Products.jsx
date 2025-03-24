import React, { useState, useEffect } from "react";
import axios from "axios";
import iphone_15 from "../assets/images/iphone-1.jpg";
import { Link } from "react-router-dom"

const Products = () => {
    const [products, setProducts] = useState([]);

    // Fetch products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                console.log("Fetched Data:", response.data); // Log only once
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchProducts();
    }, []); // Runs only once when the component mounts

    return (
        <>
            <div className="bg-gray-200 flex flex-wrap md:flex-nowrap justify-start items-start gap-2 w-full p-2">
                {/* Sidebar Filter (Hidden on small screens) */}
                <div className="bg-white min-w-64 min-h-screen sticky top-0 p-2 hidden md:block">
                    <h1 className="text-xl font-medium">Filters</h1>
                </div>

                {/* Product List */}
                <div className="bg-gray-200 flex flex-col justify-center w-full">
                    {products.map((product) => (
                        <Link key={product._id} to={`/product_details/${product._id}`}>
                            <div key={product._id} className="bg-white flex flex-wrap md:flex-nowrap gap-6 md:gap-12 px-5 py-5 mb-0.5 cursor-pointer">

                                {/* Image & Details */}
                                <div className="flex flex-wrap md:flex-nowrap gap-5 w-full md:w-3/4">
                                    {/* Image */}
                                    <div className="flex-shrink-0 w-full md:w-56">
                                        <img src={iphone_15} alt={product.name} className="w-full h-56 object-contain" />
                                    </div>

                                    {/* Details */}
                                    <div className="p-2">
                                        <div className="flex flex-col justify-start items-start gap-1">
                                            <h1 className="text-lg md:text-xl font-medium hover:text-blue-600">{product.name}</h1>

                                            {/* Ratings & Reviews */}
                                            <div className="flex flex-wrap md:inline-flex items-center gap-2">
                                                <div className="bg-green-700 text-white font-medium flex justify-center items-center rounded px-2">
                                                    <p>4.6</p>
                                                    <p className="ml-1"><i className="fa-solid fa-star fa-xs"></i></p>
                                                </div>
                                                <p className="text-gray-400 font-medium">
                                                    7,652 Ratings & 359 Reviews
                                                </p>
                                            </div>
                                        </div>

                                        {/* Specifications Section */}
                                        <div className="mt-5">
                                            <ul className="list-disc list-inside text-gray-800 text-sm md:text-base max-w-sm md:max-w-md">
                                                <li className="marker:text-gray-400 marker:text-xs whitespace-nowrap">{product.storage}</li>
                                                <li className="marker:text-gray-400 marker:text-xs whitespace-nowrap">{product.display}</li>
                                                <li className="marker:text-gray-400 marker:text-xs whitespace-nowrap">{product.camera}</li>
                                                <li className="marker:text-gray-400 marker:text-xs whitespace-nowrap">{product.processor}</li>
                                                <li className="marker:text-gray-400 marker:text-xs whitespace-nowrap">{product.warranty}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing Details */}
                                <div className="text-sm p-2 w-full md:w-1/4 text-center md:text-left">
                                    <p className="text-2xl md:text-3xl font-bold">₹{product.price.toLocaleString()}</p>
                                    <p className="mt-2">
                                        <span className="text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                        <span className="text-green-700"> {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed()}% off</span>
                                        {/* <span className="text-green-700"> {discountPercentage.toFixed()}% off</span> */}
                                    </p>
                                    <p>Free delivery</p>
                                    <p className="text-green-700 font-medium">Save extra with combo offers</p>
                                    <p className="text-purple-700 font-medium">Only few left</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>

    );
};

export default Products;

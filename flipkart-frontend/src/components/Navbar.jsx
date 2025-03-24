import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import auth from "../config";
import { signOut } from "firebase/auth";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [log, setLog] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User logged in");
                setLog(true);
            } else {
                console.log("User not logged in");
                setLog(false);
            }
        });
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
        });
    };

    return (
        <>
            {/* Main Navbar */}
            <header className="bg-blue-500 p-3 text-white font-medium z-50 top-0 sticky">
                <nav className="flex justify-between items-center px-5 md:px-10">
                    {/* Left Side: Logo */}
                    <h1 className="text-2xl italic cursor-pointer">
                        <Link to="/">Flipkart</Link>
                    </h1>

                    {/* Search Bar - Hidden on small screens */}
                    <div className="hidden md:flex items-center bg-white px-2 rounded-md">
                        <input
                            type="search"
                            placeholder="Search for products, brands, and more"
                            className="bg-white text-black font-normal p-2 w-96 outline-none"
                        />
                        <i className="fa-solid fa-magnifying-glass cursor-pointer" style={{ color: "#2B7FFF" }}></i>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-5 items-center">
                        {log ? (
                            <button className="bg-red-500 text-blue-600 px-5 py-1 cursor-pointer" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <button className="bg-white text-blue-600 px-5 py-1 cursor-pointer">
                                <Link to="/login">Login</Link>
                            </button>
                        )}
                        <p className="cursor-pointer">Become a Seller</p>
                        <div className="flex items-center gap-1 cursor-pointer">
                            <FaShoppingCart size={18} />
                            <Link to="/viewcart">Cart</Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(true)}>
                        <FaBars />
                    </button>
                </nav>
            </header>

            {/* Side Nav for Mobile */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-blue-600 text-white transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                <div className="flex justify-between p-5">
                    <h1 className="text-xl italic">Flipkart</h1>
                    <button className="text-white text-2xl" onClick={() => setIsOpen(false)}>
                        <FaTimes />
                    </button>
                </div>
                <ul className="flex flex-col gap-5 p-5">
                    <li className="border-b pb-2">
                        {log ? (
                            <button className="bg-red-500 text-white px-4 py-1 w-full text-left cursor-pointer" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="bg-white text-blue-600 px-4 py-1 w-full block text-left">
                                Login
                            </Link>
                        )}
                    </li>
                    <li className="cursor-pointer">Become a Seller</li>
                    <li className="cursor-pointer flex items-center gap-2">
                        <FaShoppingCart size={18} />
                        <Link to="/viewcart">Cart</Link>
                    </li>
                </ul>
            </div>

            {/* Overlay when mobile menu is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Navbar;

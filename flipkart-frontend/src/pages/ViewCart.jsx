import { useCart } from "../context/CartContext"; // Import cart context
import iphone_15 from "../assets/images/iphone-1.jpg";
import { Link } from "react-router-dom";

const ViewCart = () => {
    const { cart, removeFromCart, setCart } = useCart(); // Get cart data and setter

    console.log("Cart Items in ViewCart:", cart);

    if (!cart || cart.length === 0) {
        return <p className="text-center text-red-500">Your cart is empty</p>;
    }

    // 🔹 Function to update quantity
    const updateQuantity = (productId, type) => {
        const updatedCart = cart.map((item) => {
            if (item._id === productId) {
                return {
                    ...item,
                    quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                };
            }
            return item;
        });
        setCart(updatedCart); // Update cart state
    };

    return (
        <div className="bg-gray-200 flex flex-col md:flex-row gap-5 px-8 py-5">
            {/* Left side */}
            <div className="bg-white w-full md:w-3/4 border border-gray-300">
                {cart.map((product) => {
                    const totalPrice = product.price * product.quantity;
                    const originalTotalPrice = product.originalPrice * product.quantity;
                    const discount = originalTotalPrice - totalPrice;
                    const discountPercentage = ((product.originalPrice - product.price) / product.originalPrice) * 100;

                    return (
                        <div key={product._id} className="bg-white flex flex-col md:flex-row gap-6 px-5 py-5 border-b-2 border-gray-200">
                            <div className="flex-shrink-0 w-full md:w-48">
                                <img
                                    src={iphone_15}
                                    alt={product.name}
                                    className="w-full h-48 object-contain"
                                />
                            </div>

                            <div className="flex-grow p-2">
                                <h1 className="text-lg md:text-xl font-medium hover:text-blue-600">{product.name}</h1>
                                <p className="text-gray-500 text-sm sm:text-base">Seller: TrueComRetail</p>

                                <div className="mt-4 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4">
                                    <p className="text-gray-500 line-through text-sm sm:text-base">₹{product.originalPrice.toLocaleString()}</p>
                                    <p className="text-2xl md:text-3xl font-bold">₹{product.price.toLocaleString()}</p>
                                    <p className="text-green-700 text-sm sm:text-base">{discountPercentage.toFixed()}% off</p>
                                </div>

                                <p className="mt-2 text-sm sm:text-base">
                                    Delivery by <span className="font-medium">Mon Mar 17</span> |
                                    <span className="text-gray-500 line-through pl-1">₹40</span>
                                    <span className="text-green-700"> Free </span>
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="p-2 bg-gray-300 rounded text-lg"
                                            onClick={() => updateQuantity(product._id, "decrease")}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            value={product.quantity}
                                            readOnly
                                            className="w-10 text-center border border-gray-300"
                                        />
                                        <button
                                            className="p-2 bg-gray-300 rounded text-lg"
                                            onClick={() => updateQuantity(product._id, "increase")}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="flex flex-col text-blue-600 text-sm font-medium gap-2">
                                        <button className="hover:underline">SAVE FOR LATER</button>
                                        <button className="hover:underline" onClick={() => removeFromCart(product._id)}>
                                            REMOVE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="border-t-4 border-gray-200 px-5 py-3 flex justify-end">
                    <Link to='/checkout'>
                        <button className="bg-[#FB641B] text-white font-medium px-5 sm:px-7 py-3 sm:py-4 w-5/12 sm:w-auto cursor-pointer">
                            PLACE ORDER
                        </button>
                    </Link>
                </div>
            </div>

            {/* Right side  */}
            <div className="bg-white p-5 w-full md:w-1/4">
                <table className="w-full text-sm md:text-base">
                    <tbody>
                        <tr>
                            <td className="text-lg text-gray-600 border-b pb-2" colSpan={2}>
                                Price Details
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Total Items</td>
                            <td className="py-2 text-right">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Total Price</td>
                            <td className="py-2 text-right">
                                ₹{cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Discount</td>
                            <td className="py-2 text-right text-green-700">
                                - ₹{cart.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">Delivery Charges</td>
                            <td className="py-2 text-right text-green-700">
                                <span className="text-gray-500 line-through">₹40</span> Free
                            </td>
                        </tr>
                        <tr className="font-medium">
                            <td className="py-2">Total Amount</td>
                            <td className="py-2 text-right">
                                ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-green-700 font-medium py-2" colSpan={2}>
                                You will save ₹
                                {cart.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0).toLocaleString()} on this order
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewCart;

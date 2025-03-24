import { useState } from "react";
import { useCart } from "../context/CartContext";

const CheckOut = () => {
    const { cart } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [addresses, setAddresses] = useState(() => {
        return JSON.parse(localStorage.getItem("addresses")) || [];
    });
    const [selectedAddress, setSelectedAddress] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedAddress")) || null;
    });

    const [editIndex, setEditIndex] = useState(null); // Track which address is being edited
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        pincode: "",
        locality: "",
        address: "",
        state: "",
        landmark: "",
        altPhone: "",
        addressType: "home"
    });

    const states = ["Andhra Pradesh", "Karnataka", "Tamil Nadu", "Maharashtra", "Delhi"];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveAddress = () => {
        let updatedAddresses;
        if (editIndex !== null) {
            // If editing, update the existing address
            updatedAddresses = [...addresses];
            updatedAddresses[editIndex] = formData;
        } else {
            // Otherwise, add a new address
            updatedAddresses = [...addresses, formData];
        }

        setAddresses(updatedAddresses);
        localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

        setSelectedAddress(editIndex !== null ? editIndex : addresses.length); // Set as selected
        setShowForm(false);
        setEditIndex(null); // Reset edit mode
        setFormData({
            name: "",
            phone: "",
            pincode: "",
            locality: "",
            address: "",
            state: "",
            landmark: "",
            altPhone: "",
            addressType: "home"
        });
    };

    const handleEditAddress = (index) => {
        setFormData(addresses[index]); // Load selected address into form
        setEditIndex(index);
        setShowForm(true);
    };

    return (
        <div className="bg-gray-200 flex flex-col md:flex-row gap-5 px-8 py-5">
            {/* Left side */}
            <div className="bg-white w-full md:w-3/4 border border-gray-300">
                <h1 className="bg-blue-500 px-4 py-3 text-white text-lg font-medium">DELIVERY ADDRESS</h1>
                <div className="px-4 py-3">
                    {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                            <div key={index} className="py-2 flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    checked={selectedAddress === index}
                                    onChange={() => setSelectedAddress(index)}
                                />
                                <div>
                                    <p className="font-medium">{address.name}</p>
                                    <p>{address.address}, {address.locality}, {address.state} - {address.pincode}</p>
                                    <p>Phone: {address.phone}</p>
                                    <button
                                        className="text-blue-500 text-sm"
                                        onClick={() => handleEditAddress(index)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No address added yet.</p>
                    )}
                </div>
                <div className="border-t-4 border-gray-200 px-4 py-3">
                    <div
                        className="text-blue-600 font-medium cursor-pointer"
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditIndex(null); // Ensure a new address is added
                        }}
                    >
                        {showForm ? "Cancel" : "Add a new address"}
                    </div>
                </div>
                {showForm && (
                    <div className="px-4 py-3 border-t">
                        <input type="text" name="name" placeholder="Name" className="border w-full p-2 mb-2" value={formData.name} onChange={handleInputChange} />
                        <input type="text" name="phone" placeholder="Phone Number" className="border w-full p-2 mb-2" value={formData.phone} onChange={handleInputChange} />
                        <input type="text" name="pincode" placeholder="Pincode" className="border w-full p-2 mb-2" value={formData.pincode} onChange={handleInputChange} />
                        <input type="text" name="locality" placeholder="Locality" className="border w-full p-2 mb-2" value={formData.locality} onChange={handleInputChange} />
                        <textarea name="address" placeholder="Address" className="border w-full p-2 mb-2" value={formData.address} onChange={handleInputChange}></textarea>
                        <select name="state" className="border w-full p-2 mb-2" value={formData.state} onChange={handleInputChange}>
                            <option value="">Select State</option>
                            {states.map((state, index) => <option key={index} value={state}>{state}</option>)}
                        </select>
                        <input type="text" name="landmark" placeholder="Landmark" className="border w-full p-2 mb-2" value={formData.landmark} onChange={handleInputChange} />
                        <input type="text" name="altPhone" placeholder="Alternative Phone" className="border w-full p-2 mb-2" value={formData.altPhone} onChange={handleInputChange} />
                        <div className="mb-2">
                            <label className="mr-4">
                                <input type="radio" name="addressType" value="home" checked={formData.addressType === "home"} onChange={handleInputChange} /> Home
                            </label>
                            <label>
                                <input type="radio" name="addressType" value="work" checked={formData.addressType === "work"} onChange={handleInputChange} /> Work
                            </label>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={handleSaveAddress}>
                            {editIndex !== null ? "Update Address" : "Save and Deliver Here"}
                        </button>
                        <button className="bg-gray-400 text-white px-4 py-2" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                )}
            </div>

            {/* Right side */}
            <div className="bg-white p-5 w-full md:w-1/4">
                <table className="w-full text-sm md:text-base">
                    <tbody>
                        <tr>
                            <td className="text-lg text-gray-600 border-b pb-2" colSpan={2}>PRICE DETAILS</td>
                        </tr>
                        <tr>
                            <td className="py-2">Total Items</td>
                            <td className="py-2 text-right">{cart.reduce((acc, item) => acc + item.quantity, 0)}</td>
                        </tr>
                        <tr>
                            <td className="py-2">Total Price</td>
                            <td className="py-2 text-right">₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}</td>
                        </tr>
                        <tr className="font-medium">
                            <td className="py-2">Total Payable</td>
                            <td className="py-2 text-right">₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CheckOut;

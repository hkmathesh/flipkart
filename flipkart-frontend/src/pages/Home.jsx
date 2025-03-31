import { Link } from "react-router-dom";

const categories = [
    { name: "Mobiles", path: "/products?category=mobiles" },
    { name: "Laptops", path: "/products?category=laptops" },
    { name: "Dresses", path: "/products?category=dresses" },
    { name: "Accessories", path: "/products?category=accessories" },
    { name: "Shoes", path: "/products?category=shoes" }
];

const Home = () => {
    return (
        <div className="bg-blue-100 min-h-[calc(100vh-4rem)] flex flex-col items-center py-10">
            <h1 className="text-5xl font-extrabold mb-8">Welcome to Our Store</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <Link 
                        key={index} 
                        to={category.path} 
                        className="bg-white shadow-lg p-6 rounded-xl text-center text-2xl font-semibold hover:bg-blue-200 transition duration-300 w-40"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;

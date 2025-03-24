import { Link } from "react-router-dom"

const Home = () => {

    return (
        <>
            <div className="bg-blue-100 min-h-screen"> 
                <h1 className="text-5xl font-extrabold text-center py-5">Home page</h1>
                <p className="text-xl font-medium text-center underline cursor-pointer"><Link to="/products">Product's page</Link></p>
            </div>
        </>
    )
}

export default Home
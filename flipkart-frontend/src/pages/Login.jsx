import { useEffect, useState } from "react"
import auth from "../config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    // const [access, setAccess] = useState(false)
    const [userValidation, setuserValidation] = useState(false)

    const handleUser = (event) => {
        setUser(event.target.value)
    }

    const handlePass = (event) => {
        setPass(event.target.value)
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // console.log("User logged in")
                navigate("/home")
            }
            else {
                // console.log("User not logged in")
            }
        })
    }, [])


    const handleLogin = () => {

        if (user === "" || pass === "") {
            alert("Enter Email ID and password.")
        }
        else {
            signInWithEmailAndPassword(auth, user, pass).then(() => {
                // console.log("Logged in!")
                setuserValidation(false)
                navigate("/home")
            }).catch(() => {
                // console.log("Failed to login")
                setuserValidation(true)
            })
        }
    }

    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center px-5 py-10">
                <div className="flex w-[50%]">
                    <div className="bg-blue-500 text-white p-5 w-[40%]">
                        <h1 className="text-2xl font-bold">Login</h1>
                        <div className="mt-3">
                            <p>Get access to your Orders,</p>
                            <p>Wishlist and Recommendations</p>
                        </div>
                    </div>
                    <div className="p-5 bg-white w-[60%]">
                        <div>
                            <p>
                                <label htmlFor="txtEmail" className="text-gray-600">Enter Email ID</label>
                                <input type="email" id="txtEmail" className="border border-t-0 border-l-0 border-r-0 border-b-blue-600 outline-none block w-full text-sm"
                                    value={user} onChange={handleUser} required />
                            </p>
                            <p className="mt-5">
                                <label htmlFor="txtPass" className="text-gray-600">Enter Password</label>
                                <input type="password" id="txtPass" className="border border-t-0 border-l-0 border-r-0 border-b-blue-600 outline-none block w-full text-sm"
                                    value={pass} onChange={handlePass} required />
                            </p>
                            {userValidation && <p className="mt-5 text-red-500">Email ID and password didn't match. Please try again!</p>}
                            <p className="text-gray-600 mt-10">By continuing, you agress to Flipkart's <span className="text-blue-600">Terms of Use</span> and <span className="text-blue-600">Privacy Policy</span></p>
                            <button className="border border-none bg-orange-400 text-white font-medium w-full p-2 my-7 cursor-pointer hover:bg-orange-500"
                                onClick={handleLogin}>Login</button>
                        </div>
                        <p className="text-blue-600 text-center"><Link to="/signup">New to Flipkart? Create an account</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
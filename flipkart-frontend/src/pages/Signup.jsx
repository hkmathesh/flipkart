import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../config"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Signup = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [confirmpass, setconfirmpass] = useState("")
    const [passCheck, setpassCheck] = useState(false)

    const handleUser = (event) => {
        setUser(event.target.value)
    }

    const handlePass = (event) => {
        setPass(event.target.value)
    }

    const handleConfirmPass = (event) => {
        setconfirmpass(event.target.value)
    }

    const handleSignup = () => {
        if (user === "" || pass === "" || confirmpass === "") {
            alert("Enter all the details (Email ID, password and confirm password).")
            setpassCheck(false)
        }
        else if (pass !== confirmpass) {
            setpassCheck(true)
        }
        else {
            createUserWithEmailAndPassword(auth, user, pass).then(() => {
                // console.log("User registered!")
                setpassCheck(false)
                navigate("/login")
            })
        }
    }

    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center px-5 py-10">
                <div className="flex w-[50%]">
                    <div className="bg-blue-500 text-white p-5 w-[40%]">
                        <h1 className="text-2xl font-bold">Looks like you're new here!</h1>
                        <div className="mt-3">
                            <p>Sign up with your mobile number to get started</p>
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
                            <p className="mt-5">
                                <label htmlFor="txtPass" className="text-gray-600">Confirm Password</label>
                                <input type="password" id="txtConfirmPass" className="border border-t-0 border-l-0 border-r-0 border-b-blue-600 outline-none block w-full text-sm"
                                    value={confirmpass} onChange={handleConfirmPass} required />
                            </p>
                            {passCheck && <p className="mt-5 text-red-500">Password and confirm password doesn't match.</p>}
                            <p className="text-gray-600 mt-10">By continuing, you agress to Flipkart's <span className="text-blue-600 cursor-pointer">Terms of Use </span>
                            and <span className="text-blue-600 cursor-pointer">Privacy Policy</span></p>
                            <button className="border border-none bg-orange-400 text-white font-medium w-full p-2 my-7 cursor-pointer hover:bg-orange-500"
                                onClick={handleSignup}>Sign up</button>
                        </div>
                        <p className="text-blue-600 text-center p-2 shadow-[0px_3px_8px_rgba(0,0,0,0.24)] hover:shadow-[0px_5px_8px_rgba(0,0,0,0.24)]"><Link to="/login">Existing User? Log in</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup


import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [passCheck, setpassCheck] = useState(false);

  const handleUser = (event) => {
    setUser(event.target.value);
  };

  const handlePass = (event) => {
    setPass(event.target.value);
  };

  const handleConfirmPass = (event) => {
    setconfirmpass(event.target.value);
  };

  const handleSignup = () => {
    if (user === "" || pass === "" || confirmpass === "") {
      alert("Enter all the details (Email ID, password, and confirm password).");
      setpassCheck(false);
    } else if (pass !== confirmpass) {
      setpassCheck(true);
    } else {
      createUserWithEmailAndPassword(auth, user, pass).then(() => {
        setpassCheck(false);
        navigate("/login");
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-2xl shadow-lg">
        {/* Left Section */}
        <div className="bg-blue-500 text-white p-6 md:w-2/5 flex flex-col justify-center">
          <h1 className="text-2xl font-bold">Looks like you're new here!</h1>
          <p className="mt-2">Sign up with your email to get started</p>
        </div>

        {/* Right Section */}
        <div className="p-6 bg-white md:w-3/5">
          {/* Input Fields */}
          <p className="mb-4">
            <label htmlFor="txtEmail" className="text-gray-600">Enter Email ID</label>
            <input
              type="email"
              id="txtEmail"
              className="border-b border-blue-600 outline-none w-full text-sm p-2"
              value={user}
              onChange={handleUser}
              required
            />
          </p>
          <p className="mb-4">
            <label htmlFor="txtPass" className="text-gray-600">Enter Password</label>
            <input
              type="password"
              id="txtPass"
              className="border-b border-blue-600 outline-none w-full text-sm p-2"
              value={pass}
              onChange={handlePass}
              required
            />
          </p>
          <p className="mb-4">
            <label htmlFor="txtConfirmPass" className="text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="txtConfirmPass"
              className="border-b border-blue-600 outline-none w-full text-sm p-2"
              value={confirmpass}
              onChange={handleConfirmPass}
              required
            />
          </p>

          {/* Validation Message */}
          {passCheck && <p className="text-red-500 mb-4">Password and confirm password don't match.</p>}

          {/* Terms and Conditions */}
          <p className="text-gray-600 text-sm mb-4">
            By continuing, you agree to Flipkart's{" "}
            <span className="text-blue-600 cursor-pointer">Terms of Use </span>
            and <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
          </p>

          {/* Signup Button */}
          <button
            className="w-full bg-orange-400 text-white font-medium p-2 hover:bg-orange-500 transition-all duration-200"
            onClick={handleSignup}
          >
            Sign up
          </button>

          {/* Login Link */}
          <p className="text-blue-600 text-center p-3 mt-4 shadow-md hover:shadow-lg transition-all duration-200">
            <Link to="/login">Existing User? Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

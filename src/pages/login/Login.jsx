import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeIZTXFxo12kM7Bu2ZIpxqc06C_LIiqn8",
  authDomain: "pcparts-bb425.firebaseapp.com",
  projectId: "pcparts-bb425",
  storageBucket: "pcparts-bb425.appspot.com",
  messagingSenderId: "380361184608",
  appId: "1:380361184608:web:bf9e389abd1f68d2003a05",
  measurementId: "G-Q9T6YJ5PP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const saveUser = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token); // Save token for authorization
    window.dispatchEvent(new Event("userUpdate")); // Notify other components of the update
    const redirectPath = localStorage.getItem("redirectPath") || "/";
    navigate(redirectPath);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear any existing messages
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      saveUser(response.data.user, response.data.token);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in");
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear any existing messages
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });
      saveUser(response.data.user, response.data.token);
      setMessage("Registration successful!");
      setIsRegistering(false); // Switch to login view
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering");
      console.error("Registration error:", error);
    }
  };

  const handleGoogleAuth = async () => {
    setMessage(""); // Clear any existing messages
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("http://localhost:5000/api/users/auth/google", {
        idToken,
      });
      saveUser(response.data.user, response.data.token);
      setMessage("Google login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error with Google login");
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h1 className="login-title">{isRegistering ? "Register" : "Login"}</h1>
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="login-form">
          {isRegistering && (
            <div className="login-input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="login-input"
              />
            </div>
          )}
          <div className="login-input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="login-input"
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required={!isRegistering}
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            {isRegistering ? "Register" : "Log In"}
          </button>
        </form>
        <p className="login-message">{message}</p>
        <hr />
        <button onClick={handleGoogleAuth} className="google-login-button">
          Log in with Google
        </button>
        <p className="login-switch">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegistering(!isRegistering)} className="login-switch-button">
            {isRegistering ? "Log In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

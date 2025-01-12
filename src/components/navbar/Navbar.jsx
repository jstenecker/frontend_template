import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTools, FaEnvelope, FaUserCircle } from "react-icons/fa";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("userUpdate", handleUserUpdate);
    return () => {
      window.removeEventListener("userUpdate", handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <FaHome /> Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link">
            <FaEnvelope /> Contact
          </Link>
        </li>
        {user && (
          <li className="navbar-item">
            <Link to="/my-builds" className="navbar-link">
              <FaTools /> My Builds
            </Link>
          </li>
        )}
      </ul>
      <div className="navbar-profile">
        {user?.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Google Profile Picture"
            className="profile-picture"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "https://via.placeholder.com/40"; // Fallback image
            }}
            onClick={toggleDropdown}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              objectFit: "cover",
            }}
          />
        ) : (
          <FaUserCircle
            className="profile-icon"
            onClick={toggleDropdown}
          />
        )}
        {dropdownVisible && (
          <ProfileDropdown
            user={user}
            closeDropdown={() => setDropdownVisible(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
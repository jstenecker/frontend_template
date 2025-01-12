import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import PropTypes from "prop-types";
import "./ProfileDropdown.css";

const ProfileDropdown = ({ user, closeDropdown }) => {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  const navigate = (path) => {
    closeDropdown();
    window.location.assign(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    const event = new Event("userUpdate");
    window.dispatchEvent(event);
    navigate("/");
  };

  const handleLogin = () => {
    localStorage.setItem("redirectPath", window.location.pathname);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("darkMode", newTheme === "dark");
    setDarkMode(!darkMode); // Update local state
  };

  useEffect(() => {
    // Sync the theme state with the current theme on mount
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setDarkMode(currentTheme === "dark");
  }, []);

  return (
    <div className="profile-dropdown">
      <button onClick={closeDropdown} className="dropdown-close-btn">
        ✕
      </button>
      {user ? (
        <>
          <p className="welcome-text">Hello, {user.name}!</p>
          <button
            onClick={() => navigate("/profile")}
            className="dropdown-btn"
          >
            Profile
          </button>
          <button onClick={handleLogout} className="dropdown-btn">
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p className="welcome-text">You are not signed in</p>
          <button onClick={handleLogin} className="dropdown-btn">
            Login
          </button>
        </>
      )}
      <hr className="dropdown-divider" />
      <div className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </div>
    </div>
  );
};

ProfileDropdown.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
  closeDropdown: PropTypes.func.isRequired,
};

export default ProfileDropdown;

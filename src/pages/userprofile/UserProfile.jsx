import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; // Import the external CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      setMessage("Please log in to access your profile.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Save user data to state and localStorage
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));

        // Dispatch custom event to notify other components
        const userUpdatedEvent = new Event("userUpdated");
        window.dispatchEvent(userUpdatedEvent);

        // Debugging log to verify the profile picture
        console.log("Fetched user data:", response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
        setMessage("Error fetching profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch saved builds
  const fetchBuilds = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to load your builds.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/users/builds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedBuilds(response.data);
    } catch (error) {
      console.error("Error fetching builds:", error.response?.data || error);
      setMessage("Error fetching saved builds.");
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to delete your account.");
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Dispatch custom event to notify other components
      const userUpdatedEvent = new Event("userUpdated");
      window.dispatchEvent(userUpdatedEvent);

      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      console.error("Error deleting account:", error.response?.data || error);
      setMessage("Error deleting account.");
    }
  };

  if (loading) {
    return <div className="user-profile">Loading user data...</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {user ? (
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Registered on:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          )}
        </div>
      ) : (
        <p className="error-message">{message}</p>
      )}
      <hr />
      <h2>Saved PC Builds</h2>
      <button className="load-builds-btn" onClick={fetchBuilds}>
        Load Builds
      </button>
      <ul className="builds-list">
        {savedBuilds.length > 0 ? (
          savedBuilds.map((build) => (
            <li key={build.id} className="build-item">
              {build.name}
            </li>
          ))
        ) : (
          <p>No saved builds found.</p>
        )}
      </ul>
      <hr />
      <button className="delete-account-btn" onClick={handleDeleteAccount}>
        Delete Account
      </button>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default UserProfile;

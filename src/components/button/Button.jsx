// Creates button for various uses
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Button = ({ route, onClick, children }) => {
    const navigate = useNavigate();

    //custom click behavior can be passed in with "onClick" prop, otherwise button will be used for route navigation
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (route) {
            navigate(route);
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1, backgroundColor: "#535bf2", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            style={{
                padding: "0.6em 1.2em",
                fontSize: "1em",
                fontWeight: "500",
                borderRadius: "8px",
                border: "1px solid transparent",
                backgroundColor: "#646cff",
                color: "white",
                cursor: "pointer",
                transition: "background-color 0.3s",
            }}
        >
            {children}
        </motion.button>
    );
};

// Add prop validation
Button.propTypes = {
    label: PropTypes.string.isRequired, // The label for the button
    route: PropTypes.string.isRequired, // The route to navigate to
};

export default Button;

import { useEffect } from "react";
import "./Home.css"; // Import the CSS file

const images = [
  { src: "/assets/image1.jpg", caption: "Add caption here" },
  { src: "/assets/image2.jpg", caption: "Add caption here" },
  { src: "/assets/image3.jpg", caption: "Add caption here" },
];

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".image-container");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to ...</h1>
      <p className="home-description">
        Insert your website description here. This is a placeholder text that can be replaced with your own content.
      </p>
      <p className="home-description">
        Insert your website description here. This is a placeholder text that can be replaced with your own content.
      </p>
      <div className="home-images-wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${
              index % 2 === 0 ? "slide-in-left" : "slide-in-right"
            }`}
          >
            <img src={image.src} alt={image.caption} className="home-image" />
            <p className="home-caption">{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

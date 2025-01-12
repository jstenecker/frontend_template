import { useEffect } from "react";
import "./Home.css"; // Import the CSS file

const images = [
  { src: "/assets/image1.jpg", caption: "High-performance CPUs for your PC build." },
  { src: "/assets/image2.jpg", caption: "Next-generation GPUs for immersive gaming." },
  { src: "/assets/image3.jpg", caption: "Reliable RAM to enhance system performance." },
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
      <h1 className="home-title">Welcome to PC Parts Builder!</h1>
      <p className="home-description">
        At PC Parts Builder, we make it easy to build your dream PC! Whether you are a gamer, creator, or enthusiast, our platform helps you find compatible parts tailored to your needs.
      </p>
      <p className="home-description">
        Use our intuitive PC Parts Builder tool to mix and match components like CPUs, GPUs, motherboards, RAM, and more. Avoid compatibility headaches as we guide you to create a perfectly compatible build with seamless functionality.
      </p>
      <p className="home-description">Get started now and bring your ideal PC to life!</p>
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

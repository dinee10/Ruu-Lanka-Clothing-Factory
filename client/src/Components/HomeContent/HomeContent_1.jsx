import React from "react";
import logo from "../../assets/logo.png";
import banner from "../../assets/bgecom.png";
import HomeContent_2 from "./HomeContent_2";
import { useNavigate } from "react-router-dom";

function HomeContent_1() {
  const navigate = useNavigate()

  const scrollToProducts = () => {
    const productSection = document.getElementById("products-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <section
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "calc(100vh - 4rem)",
        }}
        className="d-flex p-4 rounded align-items-center justify-content-between"
      >
        <div className="w-50 text-white">
          <h1 className="display-1 fw-bold mb-4 font-serif">
            Ultimate Comfort Premium Cotton
          </h1>
          <p className="lead text-muted mb-8 font-sans">
            Elevate your wardrobe with our Cuban shirt, crafted from the finest
            premium fabric for unmatched comfort and style. Its breathable
            material and sleek design ensure you look sharp and feel great
            whether you're out in the town or relaxing.
          </p>
          <div>
            <button className="btn border-outline btn-outline-dark py-2 px-6 fw-semibold" onClick={scrollToProducts}>
              Shop Now
            </button>
            <button className="btn border-outline btn-outline-dark py-2 px-6 mx-2 fw-semibold">
              About
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeContent_1;

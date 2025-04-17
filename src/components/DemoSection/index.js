import React from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./ClientSection.css"; // Ensure you have relevant styles imported
import NewsSection from "./NewsSection";
import clientImg from "../../assets/images/relationship.jpg";
import quoteIcon from "../../assets/images/img1.png";

const ClientSection = () => {
  return (
<div className="client_section layout_padding">
  <div id="my_slider" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      {[1, 2, 3].map((item, index) => (
        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
          <div className="container">
            <h1 className="client_taital">What Patients Say</h1>
            <p className="client_text">Quality healthcare makes all the difference in patients’ lives</p>
            <div className="client_section_2">
              <div className="client_left">
                <div>
                  <img src={clientImg} className="client_img" alt="Patient" />
                </div>
              </div>
              <div className="client_right">
                <h3 className="distracted_text">Trusted Healthcare</h3>
                <p className="lorem_text">
                  Access to quality medical care has transformed the way patients experience treatment. The use of digital health records ensures that medical professionals can provide accurate diagnoses and timely care, enhancing overall well-being.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <a className="carousel-control-prev" href="#my_slider" role="button" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    </a>
    <a className="carousel-control-next" href="#my_slider" role="button" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
    </a>
  </div>
  <NewsSection/>
</div>

  );
};

export default ClientSection;
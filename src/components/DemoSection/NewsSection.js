import React from "react";
import "./NewsSection.css";
import icon2 from "../../assets/images/pngtree-health-workers-fight-coronavirus-png-image_5349560.jpg";
import icon3 from "../../assets/images/24-7-service-islamic-holy-quran-thumbnail-removebg-preview.png";
import icon4 from "../../assets/images/lovepik-medical-health-png-image_401560406_wh1200-removebg-preview.png";

const NewsSection = () => {
  return (
    <div className="news_section layout_padding">
      <div className="container-fluid">
        <h1 className="health_taital">Why choose 24hr home care</h1>
        <p className="health_text">
          Labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>
        {/* Bootstrap Row for Cards */}
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="box_main">
              <div className="icon_1">
                <img src={icon2} alt="Daily care experts" />
              </div>
              <h4 className="daily_text">Daily care experts</h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="box_main active">
              <div className="icon_1">
                <img src={icon3} alt="Available 24/7" />
              </div>
              <h4 className="daily_text_1">Available 24/7</h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="box_main">
              <div className="icon_1">
                <img src={icon4} alt="Balanced care" />
              </div>
              <h4 className="daily_text_1">Balanced care</h4>
            </div>
          </div>
        </div>
        {/* Get Quote Button */}
        <div className="getquote_bt">
          <a href="#">
            Get A Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
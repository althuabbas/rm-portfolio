import React from "react";
import "./CommercialShoot.scss";

import Logo from '../../assets/images/commercial-shoots/american-rag-cie-logo-png-transparent.png'
import transparent from '../../assets/images/commercial-shoots/work1-6-Photoroom.png'
import cs1 from '../../assets/images/commercial-shoots/work1-1.jpeg'
import cs2 from '../../assets/images/commercial-shoots/work1-2.jpeg'
import cs3 from '../../assets/images/commercial-shoots/work1-3.jpeg'
import cs4 from '../../assets/images/commercial-shoots/work1-4.jpeg'
import cs5 from '../../assets/images/commercial-shoots/work1-5.jpeg'
import cs6 from '../../assets/images/commercial-shoots/work1-6.jpeg'

const CommercialShoot = () => {
  return (
    <>
      <div className="wrapper">
        <div className="about-subtitle">American Rag Cie</div>
        <div className="mood_board__text_area">
          {/* <h2 className="mood_board__header header_text">Editorial Styling</h2> */}
          <h2 className="about-title">
            Commercial{" "}
            <strong className="title-highlight">
              shoot
              <span className="title-highlight-span"></span>
            </strong>{" "}
          </h2>
          <div className="mood_board__info">
            <ul className="mood_board__list">
              <li>Commercial lookbook styling</li>
              <li>Creative Director: katerina Nikolaeva</li>
              <li>Photographer: Rita Tyrchyk</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="commercial_shoot">
        <div className="commercial_shoot__image_grid">
        <img
            src={Logo}
            alt=""
            className="commercial_shoot__logo"         
          />
          <img
            src={transparent}
            alt=""
            className="commercial_shoot__bg_removed"
          />
          <img
            src={cs1}
            alt=""
            className="commercial_shoot__1"
          />
          <img
           src={cs2}
            alt=""
            className="commercial_shoot__2"
          />
          <img
            src={cs3}
            alt=""
            className="commercial_shoot__3"
          />
          <img
           src={cs4}
            alt=""
            className="commercial_shoot__4"
          />
          <img
           src={cs5}
            alt=""
            className="commercial_shoot__5"
          />
          <img
            src={cs6}
            alt=""
            className="commercial_shoot__6"
          />
        </div>
      </div>
    </>
  );
};

export default CommercialShoot;

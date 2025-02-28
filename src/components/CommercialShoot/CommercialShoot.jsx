import React from "react";
import "./CommercialShoot.scss";

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
            src="/src/assets/images/commercial-shoots/american-rag-cie-logo-png-transparent.png"
            alt=""
            className="commercial_shoot__logo"         
          />
          <img
            src="/src/assets/images/commercial-shoots/work1-6-Photoroom.png"
            alt=""
            className="commercial_shoot__bg_removed"
          />
          <img
            src="/src/assets/images/commercial-shoots/work1-1.jpeg"
            alt=""
            className="commercial_shoot__1"
          />
          <img
            src="/src/assets/images/commercial-shoots/work1-2.jpeg"
            alt=""
            className="commercial_shoot__2"
          />
          <img
            src="/src/assets/images/commercial-shoots/work1-3.jpeg"
            alt=""
            className="commercial_shoot__3"
          />
          <img
            src="/src/assets/images/commercial-shoots/work1-4.jpeg"
            alt=""
            className="commercial_shoot__4"
          />
          <img
            src="/src/assets/images/commercial-shoots/work1-5.jpeg"
            alt=""
            className="commercial_shoot__5"
          />
          <img
            src="/src/assets/images/commercial-shoots/work1-6.jpeg"
            alt=""
            className="commercial_shoot__6"
          />
        </div>
      </div>
    </>
  );
};

export default CommercialShoot;

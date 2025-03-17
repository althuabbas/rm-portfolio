import "./ProductStyling.scss";

import ps1 from "../../assets/images/mesarati/mesarati-1.webp";
import ps2 from "../../assets/images/mesarati/mesarati-2.webp";

const ProductStyling = () => {
  return (
    <>
      {/* <div className="wrapper">
        <div className="about-subtitle">Maserati watch</div>
        <div className="mood_board__text_area">
        
          <h2 className="about-title">
            Product{" "}
            <strong className="title-highlight">
              Styling
              <span className="title-highlight-span"></span>
            </strong>{" "}
          </h2>
          <div className="mood_board__info">
            <ul className="mood_board__list">
              <li>
                Creative Director:
                <span className="mood_board__list_title">Kanwal Rauf</span>
              </li>
              <li>
                Photographer:
                <span className="mood_board__list_title">Tejas Wighagada</span>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      <div>
        <div className="louis-vuitton-subtitle">Maserati watch</div>
        <h2 className="about-title louis-vuitton-title">
          Product{"  "} {"  "}
          <strong className="title-highlight">
            Styling
            <span className="title-highlight-span"></span>
          </strong>{" "}
        </h2>
      </div>


      <div className="product_styling">
        <div className="product_styling__img_grid">
          <img src={ps1} alt="" className="product_styling__1" />
          <img src={ps2} alt="" className="product_styling__2" />
        </div>
      </div>

      <div className="section__info wrapper">
        <ul className="section__list">
          <li>
            Creative Director:{" "}
            <span className="section__list_title">Kanwal Rauf</span>
          </li>
          <li>
            Photographer:{" "}
            <span className="section__list_title">Tejas Wighagada</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProductStyling;

import "./ProductStyling.scss";

const ProductStyling = () => {
  return (
    <>
      <div className="wrapper">
        <div className="about-subtitle">Maserati watch</div>
        <div className="mood_board__text_area">
          {/* <h2 className="mood_board__header header_text">Editorial Styling</h2> */}
          <h2 className="about-title">
            Product{" "}
            <strong className="title-highlight">
              Styling
              <span className="title-highlight-span"></span>
            </strong>{" "}
          </h2>
          <div className="mood_board__info">
            <ul className="mood_board__list">
              <li>Creative Director: Kanwal Rauf</li>
              <li>Photographer: Tejas Wighagada</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="product_styling">
        <div className="product_styling__img_grid">      
          <img
            src="/src/assets/images/mesarati/mesarati-1.jpg"
            alt=""
            className="product_styling__1"
          />
          <img
            src="/src/assets/images/mesarati/mesarati-2.jpg"
            alt=""
            className="product_styling__2"
          />
        </div>
      </div>
    </>
  );
};

export default ProductStyling;

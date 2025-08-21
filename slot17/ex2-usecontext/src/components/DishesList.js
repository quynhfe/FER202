import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import PropTypes from "prop-types";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4 fw-bold p-3 ">Danh sách món ăn</h2>
      <div className="row g-4">
        {dishes.map((dish) => (
          <div key={dish.id} className="col-md-3 col-sm-6">
            <div className="card h-100 shadow-sm d-flex flex-column">
              <div className="img-box">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="card-img-top"
                />
              </div>
              <div className="card-body text-center flex-grow-1">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text text-muted">{dish.description}</p>
                <p className="fw-bold text-primary">
                  {`$${parseFloat(dish.price).toFixed(2)}`}
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 text-center">
                <button
                  onClick={() => addToCart(dish)}
                  className="btn btn-success w-50"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;

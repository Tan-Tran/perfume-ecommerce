import React, { Component, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { IMG_URL } from "../../utils/constants/url";
import Spinner from "../../components/Spinner/Spinner";
import { fetchCart, removeFromCart } from "../../actions/cart-actions";
import {
  faMinusSquare,
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const deleteFromCart = (perfumeId) => {
    const perfume = cartItems.find((item) => item.id === perfumeId);
    dispatch(removeFromCart(perfume));
  };

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="container mt-5 pb-5">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <h2>Cart is empty</h2>
            </div>
          ) : (
            <div>
              <p className="h4 mb-4 text-center">
                <FontAwesomeIcon className="mr-2" icon={faShoppingCart} /> Cart
              </p>
              {cartItems.map((perfume) => {
                return (
                  <div
                    key={perfume.id}
                    className="card mb-3 mx-auto"
                    style={{ maxWidth: "940px" }}
                  >
                    <div className="row no-gutters">
                      <div className="col-3 ml-3 mt-3">
                        <img
                          src={IMG_URL + `${perfume.filename}`}
                          className="rounded mx-auto w-50"
                        />
                      </div>
                      <div className="col-6">
                        <div className="card-body">
                          <h4 className="card-title">
                            {perfume.perfume + " " + perfume.perfumeTitle}
                          </h4>
                          <p className="card-text">{perfume.type}</p>
                          <p className="card-text">
                            <span>{perfume.volume}</span> ml.
                          </p>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="card-body">
                          <h5 className="card-title">
                            <span>$ {perfume.price}</span>
                          </h5>
                          <button
                            className="btn btn-warning mb-2"
                            onClick={() => deleteFromCart(perfume.id)}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faMinusSquare}
                            />{" "}
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <hr className="my-3" />
              <div className="row">
                <div className="col-9">
                  <p className="h5 text-right">
                    Total: $ <span>{totalCartPrice}</span>
                  </p>
                </div>
                <div className="col-3">
                  <div className="form-row">
                    <Link to={"/order"}>
                      <button className="btn btn-success">
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faShoppingBag}
                        />{" "}
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;

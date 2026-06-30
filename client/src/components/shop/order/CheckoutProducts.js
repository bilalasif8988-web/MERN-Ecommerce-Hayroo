import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { quantity, totalCost } from "../partials/Mixins";
import { cartListProduct } from "../partials/FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

/* ====== Fetch Cart Products ====== */
const fetchData = async (apiFunc, dispatch) => {
  try {
    const response = await apiFunc();
    dispatch({ type: "CART_LIST_PRODUCT", payload: response });
  } catch (err) {
    console.log(err);
  }
};

export const CheckoutComponent = () => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: "",
    success: "",
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
  }, [dispatch]);

  /* ====== Place Order (COD) ====== */
  const placeOrderCOD = async () => {
    if (!state.address || !state.phone) {
      return setState({ ...state, error: "Address & phone are required" });
    }

    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (!jwt || !jwt.user) {
      return setState({ ...state, error: "User not logged in" });
    }

    const orderData = {
      allProduct: data.cartProduct.map((p) => ({
        id: p._id,
        quantity: quantity(p._id),
      })),
      user: jwt.user._id,
      amount: totalCost(),
      address: state.address,
      phone: state.phone,
    };

    try {
      const res = await fetch(`${apiURL}/api/order/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const json = await res.json();

      if (json.success) {
        setState({ ...state, success: "Order placed successfully!", error: "" });
        dispatch({ type: "CLEAR_CART" });

        setTimeout(() => history.push("/user/orders"), 1500);
      } else {
        setState({ ...state, error: "Order failed", success: "" });
      }
    } catch (err) {
      setState({ ...state, error: "Something went wrong", success: "" });
    }
  };

  return (
    <div className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
      <h2 className="text-2xl mb-6">Order Summary</h2>

      {/* ===== SHOW CART PRODUCTS ===== */}
      <CheckoutProducts products={data.cartProduct} />

      {/* ===== ALERTS ===== */}
      {state.error && (
        <div className="bg-red-200 p-3 mb-3 rounded">{state.error}</div>
      )}
      {state.success && (
        <div className="bg-green-200 p-3 mb-3 rounded">{state.success}</div>
      )}

      {/* ===== ADDRESS INPUT ===== */}
      <div className="mb-4">
        <label className="font-semibold">Delivery Address</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={state.address}
          onChange={(e) =>
            setState({ ...state, address: e.target.value, error: "" })
          }
        />
      </div>

      {/* ===== PHONE INPUT ===== */}
      <div className="mb-6">
        <label className="font-semibold">Phone Number</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={state.phone}
          onChange={(e) =>
            setState({ ...state, phone: e.target.value, error: "" })
          }
        />
      </div>

      {/* ===== BUTTON ===== */}
      <button
        onClick={placeOrderCOD}
        className="w-full bg-black text-white py-3 rounded text-lg"
      >
        Place Order (COD)
      </button>
    </div>
  );
};

/* ========================================================= */
/* =============== PRODUCT LIST COMPONENT ================== */
/* ========================================================= */

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <div
            key={index}
            className="border p-4 flex items-center space-x-4 rounded shadow-sm"
          >
            <img
              onClick={() => history.push(`/products/${product._id}`)}
              src={`${apiURL}/uploads/products/${product.pImages[0]}`}
              alt="product"
              className="w-20 h-20 object-cover cursor-pointer rounded"
            />

            <div>
              <h3 className="font-semibold text-lg">{product.pName}</h3>
              <p className="text-gray-600">Price: ${product.pPrice}</p>
              <p className="text-gray-600">
                Quantity: {quantity(product._id)}
              </p>
              <p className="text-gray-600">
                Subtotal: ${product.pPrice * quantity(product._id)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No products found in cart.</p>
      )}
    </div>
  );
};

export default CheckoutProducts;

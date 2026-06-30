import React, { useEffect, useState } from "react";

const apiURL = process.env.REACT_APP_API_URL;

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  const jwt = JSON.parse(localStorage.getItem("jwt"));

  useEffect(() => {
    fetch(`${apiURL}/api/order/order-by-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: jwt.user._id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.Order) {
          setOrders(data.Order);
        }
      })
      .catch(err => console.log(err));
  }, [jwt.user._id]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 && (
        <div>No orders found.</div>
      )}

      {orders.map((order, index) => (
        <div
          key={index}
          className="border p-4 mb-4 rounded shadow"
        >
          <div className="font-semibold mb-2">
            Order ID: {order._id}
          </div>
          <div>Status: {order.status}</div>
          <div>Total Amount: ${order.amount}</div>

          <div className="mt-3 font-semibold">Products:</div>

          {order.allProduct.map((p, i) => (
            <div key={i} className="flex items-center space-x-3 mt-2">
              <img
                src={`${apiURL}/uploads/products/${p.id.pImages[0]}`}
                className="w-16 h-16 object-cover rounded"
                alt=""
              />
              <div>
                <div>{p.id.pName}</div>
                <div>Price: ${p.id.pPrice}</div>
                <div>Qty: {p.quantity}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

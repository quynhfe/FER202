import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Card } from "react-bootstrap";
import { removeFromCart, decreaseQuantity, addToCart } from "./cartSlice";
import { FaTrash } from "react-icons/fa"; // Import icon

export default function Cart() {
  const cart = useSelector((state) => state.cart.items) || [];
  const dispatch = useDispatch();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card className="mt-4 shadow-sm border-0 cart-card">
      {" "}
      {/* Thêm class cart-card */}
      <Card.Header as="h5">🛍️ Giỏ hàng</Card.Header>
      <Card.Body>
        {cart.length === 0 ? (
          <p className="text-center text-muted">Giỏ hàng trống.</p>
        ) : (
          <Table responsive className="cart-table">
            {" "}
            {/* Thêm class cart-table */}
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th className="text-center">Số lượng</th>
                <th className="text-end">Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-info">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="product-image-small"
                      />
                      <div>
                        <div className="product-title">{item.title}</div>
                        <div className="product-price">
                          {item.price.toLocaleString()}₫
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="quantity-controls">
                      <Button
                        size="sm"
                        variant="light"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </Button>
                      <span className="quantity-display">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="light"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="text-end align-middle">
                    <strong>
                      {(item.price * item.quantity).toLocaleString()}₫
                    </strong>
                  </td>
                  <td className="text-center align-middle">
                    <Button
                      variant="light"
                      className="remove-btn"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="text-end">
                  <strong>Tổng cộng:</strong>
                </td>
                <td colSpan="2" className="text-end total-amount">
                  <strong>{totalAmount.toLocaleString()}₫</strong>
                </td>
              </tr>
            </tfoot>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

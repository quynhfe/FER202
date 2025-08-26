import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
import { ListGroup, Button } from "react-bootstrap";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <>
      <h3>Shopping Cart</h3>
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="d-flex justify-content-between"
          >
            {item.name} - ${item.price}
            <Button
              variant="danger"
              size="sm"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

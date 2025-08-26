import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Button } from "react-bootstrap";

export default function UserInfo() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) return null;

  return (
    <div className="mt-3">
      <h4>Welcome, {user.username}!</h4>
      <Button variant="secondary" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  );
}

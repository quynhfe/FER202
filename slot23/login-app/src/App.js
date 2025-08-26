import React from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import { Container } from "react-bootstrap";

function AppContent() {
  const user = useSelector((state) => state.auth.user);
  return <>{user ? <UserInfo /> : <LoginForm />}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <Container className="mt-4 d-flex flex-column align-items-center">
        <h2>🔐 Login App</h2>
        <AppContent />
      </Container>
    </Provider>
  );
}

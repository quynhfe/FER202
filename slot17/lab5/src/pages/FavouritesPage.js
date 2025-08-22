import React, { useContext } from "react";
import { Container, Alert } from "react-bootstrap";
import { FavouritesContext } from "../context/FavouritesContext";
import DishesList from "../components/DishesList";
import { FaHeart } from "react-icons/fa";

const FavouritesPage = () => {
  const { favouritesState } = useContext(FavouritesContext);
  const favouriteDishes = favouritesState.items;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">
        <FaHeart className="text-danger me-2" /> My Favourite Dishes
      </h1>
      {favouriteDishes.length > 0 ? (
        <DishesList dishes={favouriteDishes} isFavouritesPage={true} />
      ) : (
        <Alert variant="info" className="text-center p-4">
          <h4>Your Favourites List is Empty</h4>
          <p className="mb-0">
            You can add dishes to your favourites by clicking the heart icon on
            any dish.
          </p>
        </Alert>
      )}
    </Container>
  );
};

export default FavouritesPage;

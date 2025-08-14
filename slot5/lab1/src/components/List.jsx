import { useState } from "react";
import styled from "styled-components";
import { Pagination, Toast, Badge, Button } from "react-bootstrap";

const RecipeList = ({ recipes = [], onViewRecipe }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [recipesPerPage, setRecipesPerPage] = useState(6);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handleToggleFavourite = (recipe) => {
    const isFav = favourites.some(fav => fav.id === recipe.id);
    if (isFav) {
      setFavourites(favourites.filter(fav => fav.id !== recipe.id));
      setToastMsg(`❌ Removed from favourites`);
    } else {
      setFavourites([...favourites, recipe]);
      setToastMsg(`✅ Added to favourites`);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-end mb-3 gap-2">
        <Button variant="outline-danger">
          ❤️ Favourites <Badge bg="danger">{favourites.length}</Badge>
        </Button>

        <select
          value={recipesPerPage}
          onChange={(e) => {
            setRecipesPerPage(Number(e.target.value));
            setCurrentPage(1); 
          }}
          className="form-select w-auto"
        >
          <option value={6}>6 per page</option>
          <option value={9}>9 per page</option>
          <option value={12}>12 per page</option>
        </select>
      </div>

      <div className="row">
        {currentRecipes.map((recipe) => {
          const isFav = favourites.some(fav => fav.id === recipe.id);
          return (
            <div key={recipe.id} className="col-12 col-md-6 col-lg-4">
              <RecipeCard>
                <RecipeImage src={recipe.image} alt={recipe.title} />
                <RecipeContent>
                  <RecipeTitle>{recipe.title}</RecipeTitle>
                  <RecipeDescription>{recipe.description}</RecipeDescription>
                  <RecipeInfo>
                    <InfoItem>👥 Servings: {recipe.servings}</InfoItem>
                    <InfoItem>⏱ Prep: {recipe.prep} mins</InfoItem>
                    {recipe.cook > 0 && (
                      <InfoItem>🔥 Cook: {recipe.cook} mins</InfoItem>
                    )}
                  </RecipeInfo>

                  <ViewRecipeButton onClick={() => onViewRecipe(recipe)}>
                    View Recipe
                  </ViewRecipeButton>

                  <FavButton
                    $isFav={isFav}
                    onClick={() => handleToggleFavourite(recipe)}
                  >
                    {isFav ? "❤️ Added to Favourite" : "♡ Add to Favourite"}
                  </FavButton>
                </RecipeContent>
              </RecipeCard>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <StyledPagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </StyledPagination>
        </div>
      )}

      <Toast
        bg="success"
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        autohide
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <Toast.Body className="text-white">{toastMsg}</Toast.Body>
      </Toast>
    </div>
  );
};

export default RecipeList;


const StyledPagination = styled(Pagination)`
  .page-item .page-link {
    color: black !important;
  }
  .page-item.active .page-link {
    background-color: #2c5530 !important;
    border-color: #2c5530 !important;
    color: #fff !important;
  }
`;

const RecipeCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeContent = styled.div`
  padding: 1.5rem;
`;

const RecipeTitle = styled.h3`
  color: #2c5530;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const RecipeDescription = styled.p`
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const RecipeInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #6c757d;
`;

const InfoItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ViewRecipeButton = styled.button`
  background: #2c5530;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  width: 100%;
  font-weight: 500;
  margin-bottom: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: #1e3a21;
  }
`;

const FavButton = styled.button`
  background: ${({ $isFav }) => ($isFav ? "#d9534f" : "transparent")};
  color: ${({ $isFav }) => ($isFav ? "white" : "#d9534f")};
  border: 1px solid #d9534f;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  width: 100%;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #d9534f;
    color: white;
  }
`;

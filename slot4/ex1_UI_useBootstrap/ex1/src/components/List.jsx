import React from 'react';
import styled from 'styled-components';

const RecipeCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  transition: background 0.2s;
  
  &:hover {
    background: #1e3a21;
  }
`;

const RecipeList = ({ recipes, onViewRecipe }) => {
  return (
    <div className="container mb-5">
      <div className="row">
        {recipes.map(recipe => (
          <div key={recipe.id} className="col-12 col-md-6 col-lg-4">
            <RecipeCard>
              <RecipeImage src={recipe.image} alt={recipe.title} />
              <RecipeContent>
                <RecipeTitle>{recipe.title}</RecipeTitle>
                <RecipeDescription>{recipe.description}</RecipeDescription>
                <RecipeInfo>
                  <InfoItem>👥 Servings: {recipe.servings}</InfoItem>
                  <InfoItem>⏱ Prep: {recipe.prep} mins</InfoItem>
                  {recipe.cook > 0 && <InfoItem>🔥 Cook: {recipe.cook} mins</InfoItem>}
                </RecipeInfo>
                <ViewRecipeButton onClick={() => onViewRecipe(recipe)}>
                  View Recipe
                </ViewRecipeButton>
              </RecipeContent>
            </RecipeCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
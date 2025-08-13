import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  color: #2c5530;
  margin: 0;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #2c5530;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const RecipeDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
`;

const RecipeInfo = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 1rem;
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  gap: 1rem;
`;

const AddToCartButton = styled.button`
  background: #2c5530;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  flex: 1;
  
  &:hover {
    background: #1e3a21;
  }
`;

const CloseModalButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  flex: 1;
  
  &:hover {
    background: #495057;
  }
`;

const RecipeModal = ({ recipe, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !recipe) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{recipe.title}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <RecipeImage src={recipe.image} alt={recipe.title} />
          <RecipeDescription>{recipe.description}</RecipeDescription>
          <RecipeInfo>
            <span>👥 Servings: {recipe.servings}</span>
            <span>⏱ Prep: {recipe.prep} mins</span>
            {recipe.cook > 0 && <span>🔥 Cook: {recipe.cook} mins</span>}
          </RecipeInfo>
        </ModalBody>
        <ModalFooter>
          <AddToCartButton onClick={() => onAddToCart(recipe)}>
            Add to Cart
          </AddToCartButton>
          <CloseModalButton onClick={onClose}>
            Close
          </CloseModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RecipeModal;
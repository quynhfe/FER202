import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Introduction from './components/Introdution';
import Filter from './components/Filter';
import RecipeList from './components/List';
import RecipeModal from './components/RecipeModal';
import Footer from './components/Footer';

const recipes = [
  {
    id: 1,
    title: "Mediterranean Chickpea Salad",
    description: "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    servings: 2,
    prep: 10,
    cook: 0,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Avocado & Tomato Wholegrain Toast",
    description: "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    servings: 1,
    prep: 5,
    cook: 5,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "One-Pan Lemon Garlic Salmon",
    description: "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    servings: 2,
    prep: 5,
    cook: 12,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Quinoa Veggie Power Bowl",
    description: "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    servings: 2,
    prep: 10,
    cook: 15,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Sweet Potato Black Bean Tacos",
    description: "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    servings: 3,
    prep: 10,
    cook: 15,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Greek Yogurt Berry Parfait",
    description: "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    servings: 1,
    prep: 5,
    cook: 0,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    title: "Lentil & Spinach Soup",
    description: "A hearty 30-minute soup rich in plant protein and iron.",
    servings: 4,
    prep: 10,
    cook: 20,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    title: "Banana Oat Pancakes",
    description: "Flour-free pancakes sweetened naturally with ripe bananas.",
    servings: 2,
    prep: 5,
    cook: 10,
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop"
  }
];

const MainContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [maxCookTime, setMaxCookTime] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrepTime = !maxPrepTime || recipe.prep <= parseInt(maxPrepTime);
      
      const matchesCookTime = !maxCookTime || recipe.cook <= parseInt(maxCookTime);
      
      return matchesSearch && matchesPrepTime && matchesCookTime;
    });
  }, [searchTerm, maxPrepTime, maxCookTime]);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleAddToCart = (recipe) => {
    alert(`${recipe.title} has been added to your cart!`);
    handleCloseModal();
  };

  return (
    <MainContainer>
      <Header />
      
      <Introduction />

      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        maxPrepTime={maxPrepTime}
        setMaxPrepTime={setMaxPrepTime}
        maxCookTime={maxCookTime}
        setMaxCookTime={setMaxCookTime}
      />

      <RecipeList 
        recipes={filteredRecipes} 
        onViewRecipe={handleViewRecipe}
      />

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      <Footer />
    </MainContainer>
  );
};

export default App;
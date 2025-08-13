import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { recipes } from '../data/recipes';
import styled from 'styled-components';

const RecipeImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
border-radius: 15px;
  
`;

function Slide() {
  return (
    <Carousel data-bs-theme="dark">
      {recipes.map(recipe => (
        <Carousel.Item key={recipe.id}>
          <RecipeImage className="d-block w-100" src={recipe.image} alt={recipe.title} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slide;

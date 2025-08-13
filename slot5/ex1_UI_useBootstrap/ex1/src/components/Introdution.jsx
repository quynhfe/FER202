import styled from 'styled-components';

const SectionWrapper = styled.section`
  text-align: center;
  padding: 40px 20px;
  background-color: #f8f9fa; 
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #025331ff; 
  margin-bottom: 10px;
`;

const Description = styled.p`
  max-width: 700px;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.6;
  color: #5f6c7b;
`;

function Introdution() {
  return (
    <SectionWrapper>
      <Title>Explore our simple, healthy recipes</Title>
      <Description>
        Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing.
        Use the search bar to find a recipe by name or ingredient, or simply scroll the list
        and let something delicious catch your eye.
      </Description>
    </SectionWrapper>
  )
}

export default Introdution

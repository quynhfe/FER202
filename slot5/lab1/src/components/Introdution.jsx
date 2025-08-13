import styled from 'styled-components';
import Slide from './Slide';
import { Row, Col } from 'react-bootstrap';

const SectionWrapper = styled.section`
  text-align: center;
  padding: 40px 20px;
  background-color: #f8f9fa; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 20px;
  max-width: 1200px;
  height: 100%;
  margin: auto;
  padding: 40px 20px;
  @media (max-width: 768px) {
    padding: 20px;
  }
  @media (max-width: 576px) {
    padding: 15px;
  }
  @media (max-width: 400px) {
    padding: 10px;
  }
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

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
`;

function Introdution() {
  return (
    <Container>
      <Row className="mb-5">
        <Col xs={12} md={6}>
        <SectionWrapper>
          <Title>Explore our simple, healthy recipes</Title>
          <Description>
            Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing.
            Use the search bar to find a recipe by name or ingredient, or simply scroll the list
            and let something delicious catch your eye.
          </Description>
        </SectionWrapper>
        </Col>
        <Col xs={12} md={6}>
        <Slide />
        </Col>
      </Row>
    </Container>
  )
}

export default Introdution

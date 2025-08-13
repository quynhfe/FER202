import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Introduction from "./components/Introdution";
import Footer from "./components/Footer";
import RecipeManagement from "./components/RecipeManagement";

const MainContainer = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const App = () => {
  return (
    <MainContainer>
      <Header />
      <Introduction />
      <RecipeManagement />
      <Footer />
    </MainContainer>
  );
};

export default App;

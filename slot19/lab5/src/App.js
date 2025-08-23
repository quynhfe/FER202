import React, { useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { isDarkMode } = useContext(ThemeContext);
  React.useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "";
  }, [isDarkMode]);

  return <AppRoutes />;
}

export default App;

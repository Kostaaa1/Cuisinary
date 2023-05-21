import Pages from "./pages/Pages";
import Search from "./pages/navbar/components/Search";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import Header from "./pages/navbar/Header";
import { GlobalContextProvider } from "./setup/app-context-menager/GlobalContext";
import Footer from "./pages/Footer";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user } = useAuth0;

  return (
    // <AuthContextProvider>
    <BrowserRouter>
      <GlobalContextProvider>
        {/* <Header /> */}
        <Pages />
      </GlobalContextProvider>
    </BrowserRouter>
    // </AuthContextProvider>
  );
}

export default App;

import Pages from "./pages/Pages";
import Search from "./pages/navbar/components/Search";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import Header from "./pages/navbar/Header";
import { GlobalContextProvider } from "./setup/app-context-menager/GlobalContext";
import Footer from "./pages/Footer";

function App() {
  return (
    // <AuthContextProvider>
    <BrowserRouter>
      <GlobalContextProvider>
        {/* <Header /> */}
        <Pages />
        {/* <Footer /> */}
      </GlobalContextProvider>
    </BrowserRouter>
    // </AuthContextProvider>
  );
}

export default App;

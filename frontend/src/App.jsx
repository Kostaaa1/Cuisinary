import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import { GlobalContextProvider } from "./setup/app-context-menager/GlobalContext";

function App() {
  return (
    // <AuthContextProvider>
    <BrowserRouter>
      <GlobalContextProvider>
        <Pages />
      </GlobalContextProvider>
    </BrowserRouter>
    // </AuthContextProvider>
  );
}

export default App;

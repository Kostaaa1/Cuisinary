import Pages from "./pages/Pages";
import Search from "./pages/navbar/components/Search";
import { BrowserRouter, Link } from "react-router-dom";
import "./styles.css";
import Navbar from "./pages/navbar/Navbar";
import { RecipeNamesProvider } from "./setup/app-context-menager/RecipeNameContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAuth } from "./setup/auth/useAuth";
import AuthContext, {
    AuthContextProvider,
} from "./setup/app-context-menager/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <RecipeNamesProvider>
                    <Navbar />
                    <Pages />
                </RecipeNamesProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;

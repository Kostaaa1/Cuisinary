import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./setup/auth/useAuth";
import { AuthContextProvider } from "./setup/app-context-menager/AuthContext";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <AuthContextProvider>
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
            audience="CatPiss123"
            scope="openid profile email"
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Auth0Provider>
    </AuthContextProvider>
    // </React.StrictMode>
);

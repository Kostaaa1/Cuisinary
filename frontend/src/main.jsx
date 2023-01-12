import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./setup/auth/useAuth";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
            audience="CatPiss123"
            scope="openid profile email"
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            <App />
        </Auth0Provider>
    </QueryClientProvider>
    // </React.StrictMode>
);

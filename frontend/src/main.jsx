import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./setup/app-context-menager/AuthContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    scope="openid profile email"
    cacheLocation="localstorage"
    // audience="CatPiss123"
    // useRefreshTokens={true}
  >
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </Auth0Provider>
  // </React.StrictMode>
);

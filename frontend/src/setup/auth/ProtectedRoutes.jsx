import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { loginWithRedirect } = useAuth0();
  const valid = JSON.parse(
    localStorage.getItem(
      "@@auth0spajs@@::Iori8HXqCllLPmy2JEeZOrkjW5lt8bcR::@@user@@"
    )
  );

  if (valid) {
    return <Outlet />;
  } else {
    loginWithRedirect();
  }
};

export default ProtectedRoutes;

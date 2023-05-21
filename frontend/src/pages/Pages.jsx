import Home from "./home/Home";
import Recipe from "./recipe/Recipe";
import AddRecipe from "./AddRecipe";
import Searched from "./searched/Searched";
import MyProfile from "./profile/MyProfile";
import Category from "./category/Category";
import PasswordForm from "./profile/components/change-password/PasswordForm";
import Success from "./profile/components/change-password/Success";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoutes from "../setup/auth/ProtectedRoutes";
import { profileLists, StaticList } from "../utils/constants/constants-pages";
import UserInfo from "./profile/components/user/UserInfo";
import CollectionPage from "./profile/components/user/CollectionPage";
import Header from "./navbar/Header";

const Pages = () => {
  const location = useLocation();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const route = location.pathname.slice(16);
    const currentComponent = lists.filter((list) => list.selected);

    if (currentComponent.route !== route) {
      setLists(
        profileLists.map((list) =>
          list.route === route
            ? { ...list, selected: true }
            : { ...list, selected: false }
        )
      );
    }
  }, [location.pathname]);

  const shouldRenderHeader = !(
    location.pathname === "/account/forgot-password-reset" ||
    location.pathname === "/account/forgot-password-success"
  );

  return (
    <>
      {shouldRenderHeader && <Header />}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/category/:recipe" element={<Category />} />
        <Route path="/recipe/:id" element={<Recipe />} />

        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/account/addRecipe/" element={<AddRecipe />} />
        <Route
          path="/account/forgot-password-reset"
          element={<PasswordForm />}
          showHeader={false}
        />
        <Route
          path="/account/forgot-password-success"
          element={<Success />}
          showHeader={false}
        />
        <Route
          path="/account/profile/"
          element={
            <MyProfile
              listContent={lists}
              staticList={StaticList}
              setLists={setLists}
            />
          }
        />
        <Route
          path="/account/profile/:name/"
          element={
            <MyProfile
              listContent={lists}
              staticList={StaticList}
              setLists={setLists}
            />
          }
        />
        <Route
          path="/account/profile/:name/:id"
          element={
            <MyProfile
              listContent={lists}
              staticList={StaticList}
              setLists={setLists}
            />
          }
        />
        <Route path="/profile/:profileId" element={<UserInfo />} />
        <Route
          path="/profile/:profileId/collection/:collectionId"
          element={<CollectionPage />}
        />
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default Pages;

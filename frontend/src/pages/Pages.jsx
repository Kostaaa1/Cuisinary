import Home from "./home/Home";
import Cuisine from "./Cuisine";
import Recipe from "./Recipe";
import AddRecipe from "./AddRecipe";
import Searched from "./searched/Searched";
import MyProfile from "./profile/MyProfile";
import Category from "./category/Category";
import PasswordForm from "./profile/components/change-password/PasswordForm";
import Success from "./profile/components/change-password/Success";
// import Category from "./common/Category";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams, Navigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProtectedRoutes from "../setup/auth/ProtectedRoutes";
import { useAuth } from "../setup/auth/useAuth";
// import { profileLists, StaticList } from "./constants-pages";
import { profileLists, StaticList } from "../utils/constants/constants-pages";
import UserInfo from "./profile/components/user/UserInfo";
import CollectionPage from "./profile/components/user/CollectionPage";

const Pages = () => {
  const location = useLocation();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const route = location.pathname.slice(16);
    const currentComponent = lists.filter((list) => list.selected);

    if (currentComponent.route !== route) {
      setLists(
        profileLists.map((list) => (list.route === route ? { ...list, selected: true } : { ...list, selected: false }))
      );
    }
  }, [location.pathname]);

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/category/:recipe" element={<Category />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/account/addRecipe/" element={<AddRecipe />} />
        <Route path="/account/forgot-password-reset" element={<PasswordForm />} />
        <Route path="/account/forgot-password-success" element={<Success />} />

        <Route element={<ProtectedRoutes />}>
          <Route
            path="/account/profile/"
            element={<MyProfile listContent={lists} staticList={StaticList} setLists={setLists} />}
          />
          <Route
            path="/account/profile/:name/"
            element={<MyProfile listContent={lists} staticList={StaticList} setLists={setLists} />}
          />
          <Route
            path="/account/profile/:name/:id"
            element={<MyProfile listContent={lists} staticList={StaticList} setLists={setLists} />}
          />
          <Route path="/profile/:profileId" element={<UserInfo />} />
          <Route path="/profile/:profileId/collection/:collectionId" element={<CollectionPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Pages;

import Home from "./home/Home";
import Cuisine from "./Cuisine";
import Recipe from "./Recipe";
import AddRecipe from "./AddRecipe";
import Searched from "./searched/Searched";
import MyProfile from "./profile/MyProfile";
import PersonalInfo from "./profile/components/PersonalInfo";
import PublicProfile from "./profile/components/PublicProfile";
import ChangePassword from "./profile/components/change-password/ChangePassword";
import PersonalRecipes from "./profile/components/PersonalRecipes";
import Collections from "./profile/components/collections/Collections";
import SavedItems from "./profile/components/saved-items/SavedItems";
import Category from "./category/Category";
import Reviews from "./profile/components/Reviews";
import PasswordForm from "./profile/components/change-password/PasswordForm";
import Success from "./profile/components/change-password/Success";
// import Category from "./common/Category";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams, Navigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProtectedRoutes from "../setup/auth/ProtectedRoutes";
import { useAuth } from "../setup/auth/useAuth";
import { profileLists, StaticList } from "./constants-pages";

const Pages = () => {
  const location = useLocation();
  const [lists, setLists] = useState([]);

  // const [lists, setLists] = useState([
  //   {
  //     id: 0,
  //     text: "Personal Info",
  //     selected: false,
  //     component: "PersonalInfo",
  //     route: "",
  //   },
  //   {
  //     id: 1,
  //     text: "Public Profile Settings",
  //     selected: false,
  //     component: "PublicProfile",
  //     route: "/public-profile",
  //   },
  //   {
  //     id: 2,
  //     text: "Change Password",
  //     selected: false,
  //     component: "ChangePassword",
  //     route: "/change-password",
  //   },
  //   {
  //     id: 3,
  //     text: "Saved Items & Collections",
  //     icon: "FaHeart",
  //     selected: false,
  //     component: "Collections",
  //     route: "/collection",
  //   },

  //   {
  //     id: 4,
  //     text: "Personal Recipes",
  //     selected: false,
  //     icon: "FaUtensilSpoon",
  //     component: "PersonalRecipes",
  //     route: "/recipes",
  //   },
  //   {
  //     id: 5,
  //     text: `Reviews`,
  //     selected: false,
  //     icon: "MdReviews",
  //     component: "Reviews",
  //     route: "/reviews",
  //   },
  //   {
  //     id: 6,
  //     component: "SavedItems",
  //     route: "/saved-items",
  //   },
  // ]);

  // const StaticList = {
  //   PersonalInfo,
  //   PublicProfile,
  //   ChangePassword,
  //   PersonalRecipes,
  //   Collections,
  //   Reviews,
  //   SavedItems,
  // };

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
    <Routes location={location} key={location.pathname}>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/category/:recipe" element={<Category />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/account/addRecipe/" element={<AddRecipe />} />
      <Route path="/account/forgot-password-reset" element={<PasswordForm />} />
      <Route path="/account/forgot-password-success" element={<Success />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/account/profile/" element={<MyProfile listContent={lists} staticList={StaticList} />} />
        <Route path="/account/profile/:name/" element={<MyProfile listContent={lists} staticList={StaticList} />} />
        <Route path="/account/profile/:name/:id" element={<MyProfile listContent={lists} staticList={StaticList} />} />
      </Route>
    </Routes>
  );
};

export default Pages;

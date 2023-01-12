import Home from "./home/Home";
import Cuisine from "./Cuisine";
import Recipe from "./Recipe";
import AddRecipe from "./AddRecipe";
import Searched from "./searched/Searched";
import MyProfile from "./profile/MyProfile";
import PersonalInfo from "./profile/components/PersonalInfo";
import PublicProfile from "./profile/components/PublicProfile";
import ChangePassword from "./profile/components/ChangePassword";
import PersonalRecipes from "./profile/components/PersonalRecipes";
import Collections from "./profile/components/collections/Collections";
import SavedItems from "./profile/components/saved-items/SavedItems";
import Category from "./category/Category";
import Reviews from "./profile/components/Reviews";

// import Category from "./common/Category";
import { useEffect, useState } from "react";
import {
    Route,
    Routes,
    useLocation,
    useParams,
    Navigate,
} from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProtectedRoutes from "../setup/auth/ProtectedRoutes";
import { useAuth } from "../setup/auth/useAuth";

const Pages = () => {
    const location = useLocation();
    const { currentUser, setCurrentUser } = useAuth();
    const [lists, setLists] = useState([
        {
            id: 0,
            text: "Personal Info",
            selected: false,
            component: "PersonalInfo",
            route: "",
        },
        {
            id: 1,
            text: "Public Profile Settings",
            selected: false,
            component: "PublicProfile",
            route: "/public-profile",
        },
        {
            id: 2,
            text: "Change Password",
            selected: false,
            component: "ChangePassword",
            route: "/change-password",
        },
        {
            id: 3,
            text: "Saved Items & Collections",
            icon: "FaHeart",
            selected: false,
            component: "Collections",
            route: "/collections",
        },
        {
            id: 4,
            text: "Personal Recipes",
            selected: false,
            icon: "FaUtensilSpoon",
            component: "PersonalRecipes",
            route: "/recipes",
        },
        {
            id: 5,
            text: `Reviews`,
            selected: false,
            icon: "MdReviews",
            component: "Reviews",
            route: "/reviews",
        },
        {
            id: 6,
            component: "SavedItems",
            route: "/saved-items",
        },
    ]);
    const StaticList = {
        PersonalInfo,
        PublicProfile,
        ChangePassword,
        PersonalRecipes,
        Collections,
        Reviews,
        SavedItems,
    };

    useEffect(() => {
        const route = location.pathname.slice(16);
        const currentComponent = lists.filter((list) => list.selected);

        if (currentComponent.route !== route) {
            setLists(
                lists.map((list) =>
                    list.route === route
                        ? { ...list, selected: true }
                        : { ...list, selected: false }
                )
            );
        }
    }, [location.pathname]);

    return (
        <Wrapper>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/cuisine/:type" element={<Cuisine />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/category/:recipe" element={<Category />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/account/addRecipe/" element={<AddRecipe />} />
                <Route element={<ProtectedRoutes />}>
                    <Route
                        path="/account/profile/"
                        element={
                            <MyProfile
                                listContent={lists}
                                staticList={StaticList}
                            />
                        }
                    />
                    <Route
                        path="/account/profile/:name"
                        element={
                            <MyProfile
                                listContent={lists}
                                staticList={StaticList}
                            />
                        }
                    />
                </Route>
            </Routes>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 1250px;
    margin: 0 auto;
    min-height: 100vh;
`;

export default Pages;

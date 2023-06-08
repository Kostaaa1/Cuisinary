import React, { useState } from "react";
import Search from "./Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../setup/auth/useAuth";

const SideNavbar = ({ showSideNav, showSearched, setShowSideNav }) => {
  const navigate = useNavigate();
  const categoryNavigation = (query) => {
    navigate("/category/" + query);
    setShowSideNav(false);
  };
  const { authenticated } = useAuth();
  const [clickedCategory, setClickedCategory] = useState("");
  const categoryData = [
    {
      name: "DINNERS",
      categories: [
        { list: "Quick & Easy", query: "quick" },
        { list: "Main Dishes", query: "main" },
        { list: "Soups", query: "soup" },
        { list: "Stews", query: "stew" },
        { list: "30-Minute Meals", query: "minute" },
      ],
    },
    {
      name: "MEALS",
      categories: [
        { list: "Breakfast", query: "breakfast" },
        { list: "Lunch", query: "lunch" },
        { list: "Healthy", query: "healthy" },
        { list: "Salads", query: "salad" },
        { list: "Bread", query: "bread" },
        { list: "Desserts", query: "dessert" },
      ],
    },
    {
      name: "INGREDIENTS",
      categories: [
        { list: "Chicken", query: "chicken" },
        { list: "Beef", query: "beef" },
        { list: "Pork", query: "pork" },
        { list: "Pasta", query: "pasta" },
        { list: "Fruits", query: "fruits" },
        { list: "Vegetables", query: "vegetables" },
      ],
    },
    {
      name: "CUISINES",
      categories: [
        { list: "Mexican", query: "mexican" },
        { list: "Italian", query: "italian" },
        { list: "Chinese", query: "chinese" },
        { list: "Indian", query: "indian" },
        { list: "German", query: "german" },
        { list: "Greek", query: "greek" },
        { list: "Filipino", query: "filipino" },
        { list: "Japanese", query: "japenese" },
      ],
    },
    {
      name: "OCCASIONS",
      categories: [
        { list: "Christmas", query: "christmas" },
        { list: "Thanksgiving", query: "thanksgiving" },
        { list: "Easter", query: "easter" },
      ],
    },
    // {
    //   name: "My Account",
    //   categories: [
    //     { list: "My Profile", query: "christmas" },
    //     { list: "Saved Items & Collections", query: "thanksgiving" },
    //     { list: "Add a Recipe", query: "easter" },
    //     { list: "Log Out", query: "easter" },
    //     { list: "Log Out", query: "easter" },
    //   ],
    // },
  ];

  return (
    <>
      {clickedCategory === "" ? (
        <div className="sidenav-wrapper">
          <div className="category-wrap">
            <Search
              showSideNav={showSideNav}
              showSearched={showSearched}
              setShowSideNav={setShowSideNav}
              style={{
                alignItems: "start",
                flexDirection: "column",
                height: "80px",
              }}
            />
            <ul>
              {categoryData.map((category, id) => (
                <li key={id} onClick={() => setClickedCategory(category)}>
                  {category.name}
                  <ArrowForwardIosIcon />
                </li>
              ))}
            </ul>
          </div>
          <div className="sidenav-user">
            <span className="user">
              <FaUserCircle />
              {authenticated ? "My Profile" : "Log in"}
            </span>
          </div>
        </div>
      ) : (
        <div className="category-wrap">
          <span>
            <ArrowBack onClick={() => setClickedCategory("")} />
            <h2>
              {clickedCategory.name[0] +
                clickedCategory.name
                  .slice(1, clickedCategory.name.length)
                  .toLowerCase()}
            </h2>
          </span>
          <ul>
            {clickedCategory.categories.map((category) => (
              <li
                key={category.list}
                onClick={() => categoryNavigation(category.query)}
              >
                {category.list}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SideNavbar;

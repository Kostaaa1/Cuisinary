import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const categoryNavigation = (query) => {
    navigate("/category/" + query);
  };
  const [categoryData, setCategoryData] = useState([
    {
      visibility: false,
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
      visibility: false,
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
      visibility: false,
      name: "INGREDIENTS",
      categories: [
        { list: "Chicken", query: "chicken" },
        { list: "Beef", query: "beef" },
        { list: "Pork", query: "pork" },
        { list: "Pasta", query: "pasta" },
        { list: "Fruits", query: "Fruits" },
        { list: "Vegetables", query: "vegetables" },
      ],
    },
    {
      visibility: false,
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
      visibility: false,
      name: "OCCASIONS",
      categories: [
        { list: "Christmas", query: "christmas" },
        { list: "Thanksgiving", query: "thanksgiving" },
        { list: "Hanukkah", query: "hanukkah" },
        { list: "Easter", query: "easter" },
      ],
    },
  ]);

  const hanldeDropDownEnter = (visibility, index) => {
    setCategoryData(
      categoryData.map((category, i) =>
        i === index ? { ...categoryData[index], visibility: true } : { ...category, visibility: false }
      )
    );
  };

  const hanldeDropDownLeave = (visibility, index) => {
    setCategoryData(
      categoryData.map((category, i) =>
        i === index ? { ...categoryData[index], visibility: false } : { ...category, visibility: false }
      )
    );
  };

  return (
    <Nav>
      {categoryData.map((category, index) => (
        <Wrapper key={index}>
          <h5
            onMouseEnter={() => hanldeDropDownEnter(category.visibility, index)}
            onMouseLeave={() => hanldeDropDownLeave(category.visibility, index)}
          >
            {category.name}
          </h5>
          <CategoryDropdown
            onMouseEnter={() => hanldeDropDownEnter(category.visibility, index)}
            onMouseLeave={() => hanldeDropDownLeave(category.visibility, index)}
            className="ul-dropdown"
            style={{ display: category.visibility ? "flex" : "none" }}
          >
            {category.categories.map((data, id) => (
              <li
                key={id}
                onClick={(e) => {
                  categoryNavigation(data.query), hanldeDropDownLeave(category.visibility, index);
                }}
              >
                {data.list}
              </li>
            ))}
          </CategoryDropdown>
        </Wrapper>
      ))}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  max-height: 20%;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--red-color);
    text-underline-offset: 5px;
    text-decoration-thickness: 10%;

    .ul-dropdown {
      display: flex;
    }
  }

  h5 {
    line-height: 30px;
    letter-spacing: 1px;
    margin-right: 40px;
    color: black;
    font-size: 12px;
    cursor: pointer;
  }
`;

const CategoryDropdown = styled.ul`
  position: absolute;
  top: 85%;
  left: 0;
  transform: translate(-5%);
  width: 210px;
  background-color: white;
  border-radius: 3px;
  flex-direction: column;
  padding: 4px 12px;

  li {
    padding: 15px 0;
    list-style: none;
    font-size: 14px;
    color: var(--grey-color);
    cursor: pointer;
    font-weight: 500;

    &:hover {
      color: #312f2f;
    }
  }
`;

export default Navbar;

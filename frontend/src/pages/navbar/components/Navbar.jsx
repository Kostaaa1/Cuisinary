import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
        { list: "Easter", query: "easter" },
      ],
    },
  ]);

  const hanldeDropDownEnter = (index) => {
    setCategoryData(
      categoryData.map((category, i) =>
        i === index
          ? { ...categoryData[index], visibility: true }
          : { ...category, visibility: false }
      )
    );
  };

  const hanldeDropDownLeave = (index) => {
    setCategoryData(
      categoryData.map((category, i) =>
        i === index
          ? { ...categoryData[index], visibility: false }
          : { ...category, visibility: false }
      )
    );
  };

  return (
    <Nav>
      {categoryData.map((category, index) => (
        <Wrapper key={category.name}>
          <h6
            onMouseEnter={() => hanldeDropDownEnter(index)}
            onMouseLeave={() => hanldeDropDownLeave(index)}
          >
            {category.name}
          </h6>
          <CategoryDropdown
            onMouseEnter={() => hanldeDropDownEnter(index)}
            onMouseLeave={() => hanldeDropDownLeave(index)}
            className="ul-dropdown"
            style={{ display: category.visibility ? "flex" : "none" }}
          >
            {category.categories.map((data) => (
              <div key={data.query} className="li-control">
                <li
                  onClick={() => {
                    categoryNavigation(data.query), hanldeDropDownLeave(index);
                  }}
                >
                  {data.list}
                </li>
              </div>
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

  @media (max-width: 1270px) {
    padding: 0 36px;
  }
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

  h6 {
    letter-spacing: 1.4px !important;
    margin-right: 36px;
    font-size: 12px !important;
    color: var(--main-color);
    cursor: pointer;
  }
`;

const CategoryDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translate(-5%);
  width: 210px;
  background-color: white;
  flex-direction: column;

  .li-control {
    li {
      color: var(--main-color);
      margin: 2px 12px;
      font-weight: 500;
      font-size: 1rem;
      letter-spacing: -0.6px;
    }

    &:hover {
      background: #f3f3f3;
    }
  }
`;

export default Navbar;

import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Star, StarHalf, StarRate, FavoriteBorder, Favorite } from "@material-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useLayoutData } from "../pages/profile/hooks/useLayoutData";
import axios from "axios";
import useNoScroll from "../utils/useNoScroll";

const CardDescription = ({ currentRecipe, favorite, setFavorite }) => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipe, setRecipe] = useState();
  const { user } = useAuth0();
  const { layoutData } = useLayoutData();
  const [heart, setHeart] = useState(false);
  useNoScroll(favorite);

  useEffect(() => {
    setRecipeTitle(currentRecipe.title);

    const recipeData = { ...currentRecipe };
    delete recipeData.title;

    setRecipe(recipeData);
  }, []);

  const addRecipeToFavorites = async (e) => {
    setFavorite(true);
    setHeart(true);

    let checkForRecipe = layoutData[0]?.collRecipes
      .map((recipes) => currentRecipe.title === recipes.recipeTitle)
      .includes(true);
    if (checkForRecipe) return;

    axios.post(`/api/auth/${user?.email}`, { recipeTitle: recipeTitle, recipe: recipe });
  };

  return (
    <Card key={currentRecipe.id} className="card">
      <Link to={"/recipe/" + currentRecipe.id}>
        <img src={currentRecipe.image} alt="" />
        <div className="card-desc">
          <h4>{currentRecipe.title}</h4>
          <div className="star-rating">
            <Star />
            <Star />
            <Star />
            <Star />
            <StarHalf />
            <span className="ratings">0 Ratings</span>
          </div>
        </div>
      </Link>
      <div className="favorite" onClick={(e) => addRecipeToFavorites(e)}>
        {heart ? <Favorite /> : <FavoriteBorder />}
      </div>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  background-color: white;
  border-radius: 4px;
  min-height: 370px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 60%;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  a {
    text-decoration: none;
  }

  .favorite {
    position: absolute;
    top: 0;
    right: 10px;
    width: 50px;
    height: 50px;
    background-color: #ce4620;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    cursor: pointer;
    transform: scale(0.9);

    svg {
      color: white;
    }
  }

  .card-desc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;

    h4 {
      text-align: start;
      color: #1f1f1f;
      margin-bottom: 10px;
      margin-top: 5px;
      font-size: 1.3rem;
    }

    .star-rating {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        color: black;
        font-size: 14px;
        margin-left: 10px;
      }
      svg {
        font-size: 1.2rem;
        color: #ce4620;
      }
    }
  }

  &:hover {
    h4 {
      text-decoration: underline;
      text-decoration-color: #f27121;
      text-underline-offset: 5px;
      text-decoration-thickness: 8%;
    }
  }
`;

export default CardDescription;

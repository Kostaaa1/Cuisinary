import { FavoriteBorder, Favorite, Star, StarHalf, StarBorder } from "@material-ui/icons";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../setup/app-context-menager/AuthContext";
import Ingredients from "./components/Ingredients";
import Nutrition from "./components/Nutrition";
import Directions from "./components/Directions";
import RecipeReviews from "./components/RecipeReviews";
import useSmoothScroll from "../../utils/useSmoothScroll";
import Loading from "../../common/Loading";
import { Link } from "react-scroll";
import SimilarRecipes from "./components/SimilarRecipes";

export const RecipeContext = createContext("");

const Recipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const params = useParams();
  const [summary, setSummary] = useState("");
  const [nutritions, setNutritions] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { userData } = useContext(AuthContext);
  const [fetched, setFetched] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [averageRate, setAverageRate] = useState(0);
  const [starArray, setStarArray] = useState([]);

  useSmoothScroll();

  useEffect(() => {
    getRecipe();
  }, [userData]);

  const getRecipe = async () => {
    try {
      const res = await fetch(`/api/recipe/${params.id}/getRecipe`);
      const recipe = await res.json();

      const { nutritions, data, reviews } = recipe;

      if (recipe.length !== 0) {
        setNutritions(nutritions);
        setRecipe(data);
        setReviews(reviews);
        setIngredients(data?.extendedIngredients);
      } else {
        createRecipe();
      }

      const checkCollections = userData?.collections.some((collection) =>
        collection.collRecipes.some((x) => x.recipeTitle === data.title)
      );
      setFavorite(checkCollections);

      setFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const saveRecipeInCollection = async () => {
    try {
      let checkForRecipe = userData.collections[0]?.collRecipes.find((recipes) => recipes.recipeTitle === recipe.title);
      userData.collections[0]?.collRecipes.push({ recipeTitle: recipe.title });
      if (checkForRecipe) return;

      axios.post(`/api/auth/${userData?.email}`, {
        recipeTitle: recipe.title,
        recipe: { id: recipe.id, image: recipe.image, imageType: recipe.imageType },
      });
      setFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (recipe?.summary) {
      let str = recipe.summary;
      let dotCount = 0;
      let index = 0;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === ".") {
          dotCount++;
          if (dotCount === 4) {
            index = i;
            break;
          }
        }
      }
      setSummary(str.slice(0, index + 1));
    }
  }, [recipe]);

  useEffect(() => {
    let sum = reviews.reduce((acc, num) => (acc += num.starRating + 1), 0);
    let average = sum !== 0 ? parseFloat((sum / reviews.length).toFixed(1)) : 0;
    setAverageRate(average);
  }, [reviews]);

  useEffect(() => {
    if (averageRate > 0) {
      let arr = averageRate
        .toString()
        .split(".")
        .map((num) => Number(num));

      setStarArray(
        Array(5)
          .fill("")
          .map((_, i) =>
            i <= arr[0] - 1 ? (
              <Star key={i} />
            ) : i === arr[0] && arr[1] >= 5 ? (
              <StarHalf key={i} />
            ) : (
              <StarBorder key={i} />
            )
          )
      );
    }
  }, [averageRate]);

  const value = {
    recipe,
    averageRate,
    reviews,
    setReviews,
    starArray,
  };

  return (
    <RecipeContext.Provider value={value}>
      <Wrapper>
        {fetched ? (
          <>
            <div className="container">
              <h1 className="recipe-name"> {recipe?.title} </h1>
              {reviews.length > 0 ? (
                <div className="rates-wrap">
                  <div className="star-flex">
                    {starArray.map((star) => star)}
                    <span>
                      <Link to="review-id" smooth={true} duration={500}>
                        {averageRate.toFixed(1).toString()}
                      </Link>
                    </span>

                    <p> ({reviews.length}) </p>
                  </div>
                  <div className="divider-line"></div>
                </div>
              ) : (
                <div className="rates-wrap">
                  <Link to="rates-id" smooth={true} duration={500}>
                    <p className="p-underline">Be the first to rate & review!</p>
                  </Link>
                </div>
              )}
              <p
                className="summary"
                dangerouslySetInnerHTML={{
                  __html: summary,
                }}
              ></p>
              <div className="buttons">
                <button onClick={saveRecipeInCollection}>Save {favorite ? <Favorite /> : <FavoriteBorder />}</button>
              </div>
              <img src={recipe?.image} alt="" />
              <div className="description">
                <div className="desc-wrap">
                  <h4>Prep Time</h4>
                  <p> {recipe?.readyInMinutes} </p>
                </div>
                <div className="desc-wrap">
                  <h4>Cook Time</h4>
                  <p> {recipe?.preparationMinutes} </p>
                </div>
              </div>
              <div className="description">
                <div className="desc-wrap">
                  <h4>Servings</h4>
                  <p> {recipe?.servings} </p>
                </div>
                <div className="desc-wrap">
                  <h4>Price Per Serving</h4>
                  <p> {recipe?.pricePerServing} </p>
                </div>
              </div>
              <div className="line-break"></div>

              <Ingredients ingredients={ingredients} />
              <div className="line-break"></div>

              <Directions recipe={recipe} />
              <div className="line-break"></div>
              <Nutrition nutritions={nutritions} />
              <div className="line-break"></div>
              <RecipeReviews recipe={recipe} setReviews={setReviews} reviews={reviews} recipeId={params.id} />
              <SimilarRecipes />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </Wrapper>
    </RecipeContext.Provider>
  );
};

const Wrapper = styled.div`
  width: 1240px;
  max-width: 100%;
  margin: 200px auto;
  color: var(--main-color);

  .line-break {
    width: 100%;
    margin: 24px 0;
    border: 1px solid rgba(0, 0, 0, 0.14);
  }

  .recipe-name {
    font-size: 3rem;
  }

  .container {
    padding: 60px 80px;
    width: 750px;
    max-width: 100%;

    .buttons {
      margin: 12px 0;

      button {
        cursor: pointer;
        background-color: var(--red-color);
        color: #fff;
        border: none;
        width: 100px;
        height: 50px;
        padding: 0 16px;
        border-radius: 3px;
        display: flex;
        font-weight: 600;
        align-items: center;
        justify-content: space-around;

        &:active {
          outline: 2px solid var(--blue-color);
          border-radius: 3px;
          outline-offset: 1px;
        }
      }
    }

    .description {
      display: flex;
      padding: 20px 20px 0 20px;

      .desc-wrap {
        min-width: 150px;

        h4 {
          color: var(--main-color);
          font-size: 16px;
        }

        p {
          font-size: 14px;
          margin-top: 6px;
        }
      }
    }

    img {
      width: 100%;
    }

    b {
      font-weight: 500;
    }

    .summary {
      line-height: 1.7;
      font-weight: 500;

      b {
        font-size: 16px;
      }
    }

    .rates-wrap {
      padding: 16px 0;
      display: flex;
      align-items: center;

      .divider-line {
        height: 20px;
        width: 1px;
        background-color: #d1d1d1;
        margin: 0 16px;
      }

      .p-underline {
        color: var(--grey-color);
        cursor: pointer;
      }

      .p-underline,
      span {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 2px;
        text-decoration-thickness: 6%;

        &:hover {
          text-decoration-thickness: 12%;
        }
      }

      span {
        font-size: 14px;
        margin-left: 5px;
        font-weight: 600;
      }

      .star-flex {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;

        p {
          color: var(--input-border-color);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1.4px;
        }

        span {
          margin: 0 8px;
        }

        svg {
          font-size: 22px;
          color: var(--red-color);
        }
      }
    }
  }
`;

export default Recipe;

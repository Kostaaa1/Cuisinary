import { FavoriteBorder, HearingTwoTone, Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../setup/app-context-menager/AuthContext";
import Ingredients from "./components/Ingredients";
import Nutrition from "./components/Nutrition";
import Directions from "./components/Directions";
import RecipeReviews from "./components/RecipeReviews";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [active, setActive] = useState(true);
  const params = useParams();
  const [summary, setSummary] = useState("");
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getDetails();
  }, [params.id]);

  const getDetails = async () => {
    try {
      const res = await fetch(`/api/recipe/${params.id}`);
      const data = await res.json();

      if (data.length !== 0) {
        setRecipe(data[0].data);
        setIngredients(data[0].data.extendedIngredients);
        setInstructions(data[0].data);
      } else {
        await fetchDetails(params.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetails = async (id) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`
    );
    const infoData = await res.json();
    axios.post("/api/recipe/createInfo", { id: params.id, info: infoData });

    setRecipe(infoData);
    setIngredients(infoData.extendedIngredients);
    setInstructions(infoData.analyzedInstructions[0].steps);
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

  return (
    <Wrapper>
      <>
        <div className="container">
          <h1 className="recipe-name"> {recipe?.title} </h1>
          <div className="rates-wrap">
            <div className="star-flex">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              <span>5.0</span>
            </div>
            <p style={{ cursor: "pointer" }}>Add your rating & review</p>
          </div>
          <p
            className="summary"
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          ></p>
          <div className="buttons">
            <button
              onClick={() => axios.post(`/api/auth/${user?.email}`, { recipeTitle: recipe.title, recipe: recipe })}
            >
              Save <FavoriteBorder />
            </button>
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
          <Nutrition />
          <div className="line-break"></div>
          <RecipeReviews recipe={recipe} />
          {/* <div className="content-div">
            <div className="content-head">
              <h1>Reviews (0)</h1>
            </div>

            <div className="content-reviews">
              <div className="profile-flex">
                <img src={recipe?.image} alt="" />
                <h4> {recipe?.title} </h4>
              </div>
              <div className="rate-container">
                <h4>Your Rating:</h4>
                <div className="star-flex">
                  <StarBorder />
                  <StarBorder />
                  <StarBorder />
                  <StarBorder />
                  <StarBorder />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1250px;
  max-width: 100%;
  margin: 200px auto;
  color: var(--main-color);

  .line-break {
    width: 100%;
    margin: 30px 0;
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
    }

    .rates-wrap {
      padding: 16px 0;
      display: flex;
      align-items: center;

      p {
        margin-left: 5px;
        color: var(--main-color);
      }

      p,
      span {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 2px;
        text-decoration-thickness: 6%;
      }

      span {
        font-size: 14px;
        margin-left: 5px;
        margin-right: 15px;
        font-weight: 600;
      }

      .star-flex {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;

        svg {
          font-size: 22px;
          color: var(--red-color);
        }
      }
    }
  }
`;

export default Recipe;

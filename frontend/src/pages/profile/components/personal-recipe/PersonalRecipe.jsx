import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";
import Loading from "../../../../common/Loading";
import { AccessTime, Check, RiceBowl } from "@mui/icons-material";
import LineBreak from "../../../../common/LineBreak";

const PersonalRecipe = () => {
  const params = useParams();
  const { userData } = useContext(AuthContext);

  const fetchPersonalRecipe = async () => {
    try {
      console.log("called");

      const res = await axios.get(
        `/api/user/${userData?.email}/${params.id}/getPersonalRecipe`
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: recipeData, isLoading } = useQuery(
    ["personal-recipes"],
    fetchPersonalRecipe,
    { enabled: !!userData, refetchOnMount: "always" }
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Recipe>
          <h1>{recipeData.title}</h1>
          <p> {recipeData.summary} </p>
          <div className="head-wrap">
            <img src={recipeData?.picture.image} alt="" />
            <div className="recipe-info">
              <AccessTime />
              <div className="info-wrap">
                <h5>Prep:</h5>
                <span>{recipeData.preparationMinutes}</span>
              </div>
              <div className="info-wrap">
                <h5>Cook:</h5>
                <span>{recipeData.readyInMinutes}</span>
              </div>
              <div className="info-wrap">
                <h5>Servings:</h5>
                <span>{recipeData.servings}</span>
              </div>
            </div>
          </div>
          <section>
            <div className="line-break">
              <LineBreak />
              <RiceBowl />
            </div>
            <div className="ul-wrap ingredients">
              <h2>Ingredients</h2>
              <ul>
                {recipeData.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}> {ingredient.value} </li>
                ))}
              </ul>
            </div>
            <div className="line-break">
              <LineBreak />
              <RiceBowl />
            </div>
            <div className="ul-wrap">
              <h2>Directions</h2>
              <ul>
                {recipeData.directions.map((ingredient, id) => (
                  <div className="li-wrap">
                    <span className="steps">
                      <Check />
                      <h6>Step {id + 1} </h6>
                    </span>
                    <li key={ingredient.id}> {ingredient.value} </li>
                  </div>
                ))}
              </ul>
            </div>
            <div className="line-break">
              <LineBreak />
              <RiceBowl />
            </div>
          </section>
          <div className="popular-recipes"></div>
        </Recipe>
      )}
    </>
  );
};

const Recipe = styled.div`
  position: relative;
  width: 1240px;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 250px 0;

  @media screen and (max-width: 1270px) {
    padding: 250px 36px;
  }

  .line-break {
    position: relative;
    margin: 30px 0;

    svg {
      position: absolute;
      right: 0;
      transform: translateY(-50%);
      font-size: 36px;
      background: #fff;
      padding-left: 6px;
      color: var(--gold-color);
    }
  }

  .ul-wrap {
    .li-wrap {
      margin: 32px 0;
    }

    .steps {
      display: flex;
      align-items: center;
      margin: 16px 0;

      svg {
        margin-right: 12px;
        color: #fff;
        border-radius: 50%;
        padding: 4px;
        background: var(--grey-color);
      }
    }

    ul {
      list-style: none;

      li {
        font-size: 16px;
        color: var(--main-color);
      }
    }
  }

  .ingredients {
    ul {
      margin-top: 24px;
      padding: 0 20px;
      list-style: disc;

      li {
        margin: 12px 0;
      }

      li::marker {
        color: var(--gold-color);
      }
    }
  }

  p {
    margin: 18px 0;
  }

  h1 {
    font-size: 42px !important;
    font-weight: 800;
  }

  section {
    width: 600px;
  }

  .head-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    img {
      width: 600px;
      margin-bottom: 12px;
    }

    .recipe-info {
      position: relative;
      margin-left: 16px;
      height: 100%;
      box-shadow: var(--card-shadow-border);
      padding: 20px;
      padding-right: 52px;

      @media screen and (max-width: 880px) {
        padding: 0;
        width: 100%;
        /* padding: 0; */
      }

      .info-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 14px 0;

        span {
          margin-left: 8px;
          font-size: 15px;
        }
      }

      svg {
        position: absolute;
        top: -12px;
        right: -12px;
        background-color: #fff;
        z-index: 5;
        width: 40px;
        height: 40px;
        padding: 4px;
        color: var(--gold-color);
      }
    }
  }
`;

export default PersonalRecipe;

import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RecipeContext } from '../Recipe';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import axios from 'axios';
import { useUser } from '../../../setup/auth/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../../setup/app-context-menager/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

const Description = () => {
  const { recipe, favorite, reviews, averageRate, setFavorite } =
    useContext(RecipeContext);
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const userData = queryClient.getQueryData(['user-data', user?.email]);

  const checkIfRecipeExists = () => {
    let checkForRecipe = userData?.collections[0]?.collRecipes.find(
      (recipes) => recipes.recipeTitle === recipe?.title
    );

    return checkForRecipe;
  };

  useEffect(() => {
    const checkForRecipe = checkIfRecipeExists();
    if (checkForRecipe) setFavorite(true);
  }, [userData]);

  const saveRecipeInCollection = async () => {
    try {
      const checkForRecipe = checkIfRecipeExists();
      userData.collections[0]?.collRecipes.push({ recipeTitle: recipe.title });

      if (checkForRecipe) {
        toast.info('This recipe is already in your collection!');
        return;
      }
      setFavorite(true);

      await toast.promise(
        axios.post(`/api/auth/${userData?.email}`, {
          id: recipe.id,
        }),
        {
          pending: 'Saving recipe...',
          success: 'Recipe saved to your collection!',
          error: 'An error occurred while saving the recipe!',
        }
      );
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while saving the recipe!');
    }
  };

  return (
    <Container>
      <div className="buttons">
        <button onClick={saveRecipeInCollection}>
          {favorite ? (
            <>
              Save <Favorite />
            </>
          ) : (
            <>
              Saved <FavoriteBorder />
            </>
          )}
        </button>
      </div>
      <img src={recipe?.image} alt="recipe-image" />
      <div className="description">
        <div className="desc-wrap">
          <h4>Prep Time</h4>
          <p> {recipe?.readyInMinutes} mins</p>
        </div>
        <div className="desc-wrap">
          <h4>Cook Time</h4>
          <p> {recipe?.preparationMinutes} mins</p>
        </div>
        <div className="desc-wrap">
          <h4>Servings</h4>
          <p> {recipe?.servings} mins</p>
        </div>
        <div className="desc-wrap">
          <h4>Price Per Serving</h4>
          <p> {recipe?.pricePerServing} </p>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 100%;

  img {
    width: 600px;
    height: 100%;
  }

  .description {
    background-color: #f4f7ea;
    display: flex;
    margin-top: 14px;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 140px;
    height: 180px;

    .desc-wrap {
      padding: 10px;

      p {
        font-weight: 600;
        font-size: 16px;
        margin-top: 8px;
        color: var(--grey-color);
      }
    }
  }

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
`;

export default Description;

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Ingredients from './components/Ingredients';
import Nutrition from './components/Nutrition';
import Directions from './components/Directions';
import RecipeReviews from './components/reviews/RecipeReviews';
import Loading from '../../common/Loading';
import SimilarRecipes from './components/SimilarRecipes';
import Description from './components/Description';
import RecipeHeader from './components/RecipeHeader';
import Summary from './components/Summary';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import useSmoothScroll from '../../utils/useSmoothScroll';
import { useUser } from '../../setup/auth/useAuth';

export const RecipeContext = createContext('');

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth0();
  const [isFetched, setIsFetched] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteForSimilar, setFavoriteForSimilar] = useState(false);
  const [averageRate, setAverageRate] = useState('');
  const { getUserData } = useUser();
  useSmoothScroll();

  const { data: userData } = useQuery(['user-data', user?.email], getUserData, {
    enabled: !!user,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (userData) {
      getRecipe();
      isFavorite();
    }
  }, [userData]);

  const getRecipe = async () => {
    try {
      const recipeData = await axios.get(`/api/recipe/${params.id}/getRecipe`);
      const recipe = recipeData.data;

      console.log(recipe, 'yooooooooo');
      setRecipe(recipe[0].data);
      setReviews(recipe[1]);
      setAverageRate(recipe[0].averageRate);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetched(true);
    }
  };

  const isFavorite = () => {
    const checkCollections = userData?.collections.some((coll) =>
      coll.collRecipes.some((col) => col.recipeTitle === recipe.title)
    );
    setFavorite(checkCollections);
  };

  const summary = useMemo(() => {
    if (recipe?.summary) {
      let str = recipe.summary;
      let dotCount = 0;
      let index = 0;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === '.') {
          dotCount++;
          if (dotCount === 4) {
            index = i;
            break;
          }
        }
      }
      return str.slice(0, index + 1);
    }
  }, [recipe]);

  const value = {
    recipe,
    averageRate,
    setAverageRate,
    favorite,
    summary,
    setFavorite,
    reviews,
    favoriteForSimilar,
    setFavoriteForSimilar,
    setReviews,
    getRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>
      {recipe && isFetched && userData ? (
        <>
          <Wrapper>
            <div className="container">
              <RecipeHeader />
              <Summary />
              <Description />
              <Ingredients />
              <Directions />
              <Nutrition />
              <RecipeReviews />
            </div>
          </Wrapper>
          <SimilarRecipes />
        </>
      ) : (
        <Loading />
      )}
    </RecipeContext.Provider>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1040px;
  background-color: white;
  padding: 250px 0 0 0;
  margin: 0 auto;

  @media screen and (max-width: 1270px) {
    margin: 180px auto 0 auto;
    padding: 0 36px;
  }

  @media screen and (max-width: 1120px) {
    margin: 180px auto 0 auto;
  }

  @media screen and (max-width: 800px) {
    align-items: center;
    max-width: 1240px;
    padding: 62px;
  }

  .line-break {
    margin: 28px 0;
  }

  h1 {
    color: var(--main-color);
    font-weight: 800;
  }

  .container {
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media screen and (max-width: 800px) {
      max-width: 100%;
    }
  }
`;

export default Recipe;

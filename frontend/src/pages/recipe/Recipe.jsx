import { Star, StarHalf, StarBorder } from '@mui/icons-material';
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
import { useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import useSmoothScroll from '../../utils/useSmoothScroll';

export const RecipeContext = createContext('');

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth0();
  const [isFetched, setIsFetched] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteForSimilar, setFavoriteForSimilar] = useState(false);
  const [comments, setComments] = useState([]);
  useSmoothScroll();

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user-data', user?.email]);

  useEffect(() => {
    getRecipe();
  }, [userData]);

  const getRecipe = async () => {
    try {
      const recipeData = await axios.get(`/api/recipe/${params.id}/getRecipe`);
      const recipe = recipeData.data;

      setRecipe(recipe[0].data);
      setReviews(recipe[1]);

      const checkCollections = userData?.collections.some((collection) =>
        collection.collRecipes.some((col) => col.recipeTitle === recipe.title)
      );

      setFavorite(checkCollections);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetched(true);
    }
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

  const averageRate = useMemo(() => {
    if (reviews) {
      let sum = reviews?.reduce((acc, num) => (acc += num.starRating + 1), 0);
      let average =
        sum !== 0 ? parseFloat((sum / reviews?.length).toFixed(1)) : 0;
      setComments(reviews.filter((review) => review.comment !== ''));
      return average;
    }
  }, [reviews]);

  const starArray = useMemo(() => {
    if (averageRate > 0) {
      let arr = averageRate
        .toString()
        .split('.')
        .map((num) => Number(num));

      return Array(5)
        .fill('')
        .map((_, i) =>
          i <= arr[0] - 1 ? (
            <Star key={i} />
          ) : i === arr[0] && arr[1] >= 5 ? (
            <StarHalf key={i} />
          ) : (
            <StarBorder key={i} />
          )
        );
    }
  }, [averageRate]);

  const value = {
    recipe,
    averageRate,
    comments,
    favorite,
    summary,
    setFavorite,
    reviews,
    favoriteForSimilar,
    setFavoriteForSimilar,
    setReviews,
    getRecipe,
    starArray,
  };

  return (
    <RecipeContext.Provider value={value}>
      {recipe && isFetched ? (
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
  /* position: relative;
  width: 1040px;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  margin: 200px auto 0 auto; */
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1040px;
  background-color: white;
  padding: 250px 0 0 0;
  margin: 0 auto;

  @media screen and (max-width: 1120px) {
    margin: 180px auto 0 auto;
    padding: 0 18px;
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
    padding: 0 20px;
  }
`;

export default Recipe;

import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import RecipeCard from '../../../common/RecipeCard';
import axios from 'axios';
import { RecipeContext } from '../Recipe';
import { motion } from 'framer-motion';
import SavedModal from '../../../common/SavedModal';
import LineBreak from '../../../common/LineBreak';
import { useParams } from 'react-router-dom';

const SimilarRecipes = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { recipe, favoriteForSimilar, setFavoriteForSimilar } = useContext(RecipeContext);
  const recipes = queryClient.getQueryData(['similar-recipe']);

  const fetchSimilarRecipes = async () => {
    try {
      if (!!recipes && recipes?.recipeId === params.id) {
        return recipes;
      } else {
        const res = await axios.get(
          `/api/recipe/${recipe?.title}/${params.id}/getSimilarRecipes`
        );
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: similarData, status } = useQuery(
    ['similar-recipe'],
    fetchSimilarRecipes,
    {
      enabled: !!recipe && Object.entries(recipe)?.length > 0,
      refetchOnMount: 'always',
    }
  );

  return (
    <>
      {status === 'success' && (
        <Similar>
          <h2>You'll also love</h2>
          <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {similarData?.data?.results?.length > 0 ? (
              <>
                {similarData.data.results.map((recipe, id) => (
                  <RecipeCard
                    params={similarData?.name}
                    key={id}
                    recipeData={recipe}
                    favorite={favoriteForSimilar}
                    setFavorite={setFavoriteForSimilar}
                  />
                ))}
              </>
            ) : (
              <>
                {similarData?.data?.slice(0, 16)?.map((recipe, id) => (
                  <RecipeCard
                    params={similarData?.name}
                    key={id}
                    recipeData={recipe}
                    favorite={favoriteForSimilar}
                    setFavorite={setFavoriteForSimilar}
                  />
                ))}
              </>
            )}
          </Grid>
          {favoriteForSimilar && <SavedModal setFavorite={setFavoriteForSimilar} />}
        </Similar>
      )}
    </>
  );
};

const Similar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto 120px auto;
  height: 100%;
  background-color: white;

  @media screen and (max-width: 1270px) {
    padding-left: 36px;
    padding-right: 36px;
  }

  @media screen and (max-width: 800px) {
    padding: 0 62px;
  }

  h2 {
    font-size: 28px;
    padding: 24px 0;
  }
`;

const Grid = styled(motion.div)`
  display: grid;

  @media screen and (min-width: 730px) {
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    grid-gap: 2rem;
  }
`;

export default SimilarRecipes;

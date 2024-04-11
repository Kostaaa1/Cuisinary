import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import SavedModal from '../../common/SavedModal';
import useSmoothScroll from '../../utils/useSmoothScroll';
import { motion } from 'framer-motion';
import RecipeCard from '../../common/RecipeCard';
import Loading from '../../common/Loading';

const Category = () => {
  const params = useParams();
  const [favorite, setFavorite] = useState(false);
  useSmoothScroll();

  const fetchCategorized = async () => {
    const res = await axios.get(`/api/category/${params.recipe}`);
    const data = await res.data;

    const category = data[0].data.results ?? [];
    return category;
  };

  const { data: categoryRecipes, status } = useQuery(
    ['category', params.recipe],
    fetchCategorized
  );

  const RecipeCardProps = (favorite, params, setFavorite, key, recipeData) => {
    return (
      <RecipeCard
        favorite={favorite}
        params={params}
        setFavorite={setFavorite}
        key={key}
        recipeData={recipeData}
      />
    );
  };

  return (
    <Container>
      <h1>
        Explore
        {` ${params.recipe.slice(0, 1).toUpperCase()}${params.recipe.slice(
          1,
          params.recipe.length
        )} `}
        Recipes
      </h1>
      {status === 'success' ? (
        <Grid
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {categoryRecipes
            ?.slice(3, categoryRecipes.length)
            ?.map((recipe, id) =>
              RecipeCardProps(favorite, params.recipe, setFavorite, id, recipe)
            )}
        </Grid>
      ) : (
        <Loading className="loading" />
      )}
      {favorite && <SavedModal setFavorite={setFavorite} />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1240px;
  background-color: white;
  padding: 200px 0;
  margin: 0 auto;

  @media screen and (max-width: 1270px) {
    padding-left: 36px;
    padding-right: 36px;
    padding-top: 160px;
  }

  .loading {
    transform: translateY(10%);
  }

  h1 {
    text-align: center;
    color: var(--main-color);
    font-size: 32px;
    margin-bottom: 32px;
    letter-spacing: -0.9px !important;
    font-weight: 800;
  }
`;

const Grid = styled(motion.div)`
  display: grid;

  @media screen and (min-width: 730px) {
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    grid-gap: 2rem;
  }

  /*
  @media screen and (max-width: 709px) {
    display: block;
    grid-template-columns: initial;
    grid-gap: 0;
  } */
`;

export default Category;

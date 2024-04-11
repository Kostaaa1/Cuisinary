import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import RecipeCard from '../../common/RecipeCard';
import { useQuery } from '@tanstack/react-query';
import SavedModal from '../../common/SavedModal';
import SearchForm from './components/SearchForm';
import axios from 'axios';
import useSmoothScroll from '../../utils/useSmoothScroll';
import Loading from '../../common/Loading';

const SearchedRecipes = () => {
  let params = useParams();
  const [favorite, setFavorite] = useState(false);
  useSmoothScroll();

  const fetchSearched = async () => {
    try {
      const res = await fetch(`/api/searched/${params.search}`);
      const data = await res.json();

      if (data.length === 0) {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
            import.meta.env.VITE_SPOONACULAR_API_KEY
          }&number=60&query=${params.search}`
        );
        const data = await res.json();

        if (data.results.length === 0) return [];
        await axios.post('/api/searched/createSearched', {
          name: params.search,
          data: data,
        });

        return data.results;
      }

      return data[0].data ?? [];
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, data } = useQuery(['searched', params.search], fetchSearched);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SearchForm />
          {data?.length === 0 && (
            <h3>
              We do not have recipes for <span> {params.search}</span>
            </h3>
          )}
          <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {data?.length > 0
              ? data?.map((recipe, id) => (
                  <RecipeCard
                    favorite={favorite}
                    params={params.search}
                    setFavorite={setFavorite}
                    key={id}
                    recipeData={recipe}
                  />
                ))
              : data?.results?.map((recipe, id) => (
                  <RecipeCard
                    favorite={favorite}
                    params={params.search}
                    setFavorite={setFavorite}
                    key={id}
                    recipeData={recipe}
                  />
                ))}
          </Grid>
          {favorite && <SavedModal setFavorite={setFavorite} />}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 1240px;
  max-width: 100%;
  margin: 0 auto;
  min-height: 50vh;
  height: 100%;
  padding: 200px 0;
  color: var(--main-color);

  @media screen and (max-width: 1270px) {
    padding: 180px 36px 0 36px;
  }

  h3 {
    color: var(--grey-color);

    span {
      text-decoration: underline;
      font-size: inherit;
      color: var(--red-color);
    }
  }

  h2 {
    color: var(--main-color);
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 2rem;
`;

export default SearchedRecipes;

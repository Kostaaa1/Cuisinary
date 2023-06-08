import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import CardDescription from "../../common/CardDescription";
import { useQuery } from "@tanstack/react-query";
import SavedModal from "../../common/SavedModal";
import SearchForm from "./components/SearchForm";
import axios from "axios";
import useSmoothScroll from "../../utils/useSmoothScroll";

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

        await axios.post("/api/searched/createSearched", {
          name: params.search,
          data: data,
        });
        return data.results;
      }

      return data[0]?.data ?? [];
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, data, isSuccess } = useQuery(
    ["searched", params.search],
    fetchSearched
  );

  console.log(data);

  return (
    <Container>
      <SearchForm />
      {data?.length === 0 && (
        <h3>
          We do not have recipes for <span> {params.search}</span>
        </h3>
      )}
      {isLoading && <h2 style={{ color: "white" }}>Loading...</h2>}
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {data?.length > 0
          ? data?.map((recipe, id) => (
              <CardDescription
                favorite={favorite}
                params={params.search}
                setFavorite={setFavorite}
                key={id}
                recipeData={recipe}
              />
            ))
          : data?.results.map((recipe, id) => (
              <CardDescription
                favorite={favorite}
                params={params.search}
                setFavorite={setFavorite}
                key={id}
                recipeData={recipe}
              />
            ))}
      </Grid>
      {favorite && <SavedModal setFavorite={setFavorite} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1240px;
  margin: 170px auto;
  color: var(--main-color);

  /* @media screen and (max-width: 1270px) {
    padding: 0 36px;
  } */

  h3 {
    color: var(--grey-color);

    span {
      text-decoration: underline;
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

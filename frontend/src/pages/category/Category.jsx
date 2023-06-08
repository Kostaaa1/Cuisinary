import { useEffect, memo, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CardDescription from "../../common/CardDescription";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import SavedModal from "../../common/SavedModal";
import useSmoothScroll from "../../utils/useSmoothScroll";
import { motion } from "framer-motion";

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

  const { data: categoryRecipes } = useQuery(
    ["category", params.recipe],
    fetchCategorized
  );

  const CardDescriptionProps = (
    favorite,
    params,
    setFavorite,
    key,
    recipeData
  ) => {
    return (
      <CardDescription
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
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {categoryRecipes
          ?.slice(3, categoryRecipes.length)
          ?.map((recipe, id) =>
            CardDescriptionProps(
              favorite,
              params.recipe,
              setFavorite,
              id,
              recipe
            )
          )}
      </Grid>
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
  margin: 200px auto;
  height: 100%;
  background-color: white;

  @media screen and (max-width: 1270px) {
    padding: 0 36px;
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

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  grid-gap: 4.6rem;
  padding-bottom: 60px;

  img {
    height: 240px;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;

export default Category;

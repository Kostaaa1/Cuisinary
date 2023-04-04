import { useEffect, memo, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CardDescription from "../../common/CardDescription";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import SavedModal from "../../common/SavedModal";
import useSmoothScroll from "../../utils/useSmoothScroll";
import AuthContext from "../../setup/app-context-menager/AuthContext";

const Category = () => {
  const params = useParams();
  const [favorite, setFavorite] = useState(false);
  const { userData } = useContext(AuthContext);
  useSmoothScroll();

  const fetchCategorized = async () => {
    // const postRes = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=f4eb30e350ef4261a02e333108f3ad33&cuisine=japanese&number=30`
    // );
    // const post = await axios.post(`/api/category/${params.recipe}/createCategory`, {
    //   name: params.recipe,
    //   data: postRes.data,
    // });
    const res = await axios.get(`/api/category/${params.recipe}`);
    const data = await res.data;

    const category = data[0].data.results ?? [];
    return category;
  };

  const { isLoading, data: categoryRecipes, isSuccess } = useQuery(["category", params.recipe], fetchCategorized);

  return (
    <Container>
      <h2>Our {params.recipe} recipes:</h2>
      <Grid animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        {categoryRecipes?.map((recipe, id) => (
          <CardDescription
            favorite={favorite}
            params={params.recipe}
            setFavorite={setFavorite}
            key={id}
            currentRecipe={recipe}
          />
        ))}

        {isLoading && <h2 style={{ color: "white" }}>Loading...</h2>}
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
  max-width: 1250px;
  margin: 200px auto;
  height: 100%;
  background-color: white;

  @media (max-width: 1270px) {
    padding: 0 25px;
  }

  h2 {
    color: var(--main-color);
    margin: 40px 0;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 2rem;
`;

export default Category;

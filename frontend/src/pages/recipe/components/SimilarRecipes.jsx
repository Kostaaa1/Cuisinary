import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CardDescription from "../../../common/CardDescription";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../Recipe";
import { motion } from "framer-motion";
import Loading from "../../../common/Loading";
import SavedModal from "../../../common/SavedModal";

const SimilarRecipes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { recipe, favoriteForSimilar, setFavoriteForSimilar } =
    useContext(RecipeContext);

  const fetchSimilarRecipes = async () => {
    try {
      if (!!recipe?.title) {
        const res = await axios.get(
          `/api/recipe/${recipe?.title}/getSimilarRecipes`
        );

        if (res.data) setIsLoading(false);
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data: similarData, isSuccess } = useQuery(
    ["similar-recipes"],
    fetchSimilarRecipes,
    {
      enabled: !!recipe?.title,
      refetchOnMount: "always",
    }
  );

  useEffect(() => {
    if (similarData) {
      console.log(similarData.data.results);
    }
  }, [similarData]);

  return (
    <>
      {isSuccess && (
        <>
          <Recipes>
            <h2>You'll also love</h2>
            <Grid
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {similarData.data.results.length > 0 ? (
                <>
                  {similarData.data.results.map((recipe, id) => (
                    <CardDescription
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
                    <CardDescription
                      params={similarData?.name}
                      key={id}
                      recipeData={recipe}
                      favorite={favoriteForSimilar}
                      setFavorite={setFavoriteForSimilar}
                    />
                  ))}
                </>
              )}
              {isLoading && <h2 style={{ color: "white" }}>Loading...</h2>}
            </Grid>
            {favoriteForSimilar && (
              <SavedModal setFavorite={setFavoriteForSimilar} />
            )}
          </Recipes>
        </>
      )}
    </>
  );
};

const Recipes = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  height: 100%;
  background-color: white;
  padding: 0 36px;

  h2 {
    font-size: 28px;
    padding: 24px 0;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 2rem;
`;

export default SimilarRecipes;

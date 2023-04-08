import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardDescription from "../../../common/CardDescription";
import axios from "axios";
import { useParams } from "react-router-dom";

const SimilarRecipes = () => {
  const params = useParams();

  useEffect(() => {
    fetchSimilarRecipes();
  }, [params]);

  const fetchSimilarRecipes = async () => {
    try {
      const res = await axios.get(`/api/recipe/${params.id}/getSimilarRecipes`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  //   const { data, isLoading } = useQuery(["similarRecipes", params.id], fetchSimilarRecipes);
  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  return (
    <Recipes>
      <h2>You'll also love</h2>
    </Recipes>
  );
};

const Recipes = styled.div`
  h2 {
    font-size: 24px;
  }
`;

export default SimilarRecipes;

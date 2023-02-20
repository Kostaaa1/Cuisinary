import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import CardDescription from "../../common/CardDescription";
import { useQuery } from "@tanstack/react-query";

const Searched = () => {
    let params = useParams();

    const fetchSearched = async () => {
        const res = await fetch(`/api/searched/${params.search}`);
        const data = await res.json();

        if (data.length === 0) {
            const res = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
                    import.meta.env.VITE_API_KEY
                }&number=30&query=${params.search}`
            );
            const data = await res.json();

            if (data.results.length === 0) return [];

            fetch("/api/searched/createSearched", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: params.search,
                    data: data,
                }),
            });
        }
        return data[0].data.results ?? [];
    };

    const { isLoading, data, isSuccess } = useQuery(
        ["searched", params.search],
        fetchSearched
    );

    return (
        <Container>
            <h2>Our {params.search} recipes:</h2>
            <Grid
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {isSuccess &&
                    data.map((recipe) => (
                        <CardDescription key={recipe.id} data={recipe} />
                    ))}

                {isLoading && <h2 style={{ color: "white" }}>Loading...</h2>}
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;

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

export default Searched;

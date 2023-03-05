import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "@splidejs/react-splide/css";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import { fetchPopular } from "../hooks/fetch-popular";

const Popular = () => {
  const { isLoading, error, data } = useQuery(["popular"], fetchPopular);
  if (isLoading) return <h1 style={{ color: "white" }}>Loading...</h1>;

  return (
    <div>
      <Wrapper>
        <h3>Our Popular Picks:</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "3rem",
            breakpoints: {
              1024: {
                perPage: 2,
              },
              767: {
                perPage: 1,
              },
            },
          }}
        >
          {data.map((popular, id) => (
            <SplideSlide key={id}>
              <Card>
                <Link to={"/recipe/" + popular.id}>
                  <p>{popular.title}</p>
                  <img src={popular.image} alt="" />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  width: 1250px;
  margin: 0 auto;

  h3 {
    color: white;
    margin-bottom: 20px;
  }
`;
const Card = styled.div`
  min-height: 15rem;
  overflow: hidden;
  position: relative;
  border-radius: 12px;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
    transition: all 0.5s 0s ease;
  }

  p {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    transform: translate(-50%, 0%);
    top: 30%;
    left: 50%;
    text-align: center;
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  border-radius: 12px;
  z-index: 3;
`;

export default Popular;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '@splidejs/react-splide/css/skyblue';

const ArticleSection = () => {
  const getNewsData = async () => {
    try {
      const res = await axios.get('/api/articles/getArticles');
      return res.data.articles;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: articles } = useQuery(['articles'], getNewsData);

  return (
    <Articles>
      <Splide
        style={{ position: 'relative' }}
        options={{
          perPage: 1,
          pagination: false,
          lazyLoad: true,
          drag: {
            snap: true,
          },
        }}
      >
        {articles?.map((article, id) => (
          <SplideSlide key={id}>
            <Link to={article.url} target="_blank" rel="noopener noreferrer">
              <img src={article?.urlToImage} alt="" />
            </Link>
            <div className="article-description">
              <h2> {article?.title} </h2>
              <span>
                <p> {article?.description} </p>
              </span>
              <p>
                Author: <span> {article?.author} </span>
              </p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </Articles>
  );
};

const Articles = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .splide__arrow svg {
    fill: var(--light-grey-hover-color);
    height: 2.5em;
    transition: fill 0.2s linear;
    width: 2.5em;
  }

  .splide__arrow svg:hover {
    fill: var(--light-grey-hover-color) !important;
  }

  img {
    display: inline-block;
    width: 1240px;
    height: 700px;
  }

  .article-description {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px 8px;
    width: 300px;
    bottom: 36px;
    left: 46px;
    color: #fff;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.7);

    span {
      font-weight: 400;
      font-size: 16px;
    }

    p:first-child {
      font-size: 14px;
      font-weight: 600;
      display: inline-flex;
      flex-direction: column;
      margin: 32px 0;
    }

    h2 {
      font-size: 22px !important;
      cursor: pointer;
      color: #fff;

      &:hover {
        text-decoration: underline;
        text-decoration-color: #fff;
        text-underline-offset: 5px;
        text-decoration-thickness: 8%;
      }
    }
  }
`;

export default ArticleSection;

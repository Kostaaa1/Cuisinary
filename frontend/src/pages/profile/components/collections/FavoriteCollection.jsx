import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { DragIndicator, VideocamOff } from "@mui/icons-material";

const FavoriteCollection = ({ collection, onLoad, layoutArr, onClick }) => {
  return (
    <Collection onClick={onClick}>
      <CustomLink>
        <div className="collection-layout">
          {layoutArr?.map((recipe, id) =>
            recipe.data.image ? (
              <img key={id} onLoad={onLoad} src={recipe.data.image} alt="" />
            ) : (
              <div key={id} className="grey-div"></div>
            )
          )}
        </div>
        <div className="collection-description">
          <p>{collection.private ? "PRIVATE" : "PUBLIC"}</p>
          <h3>{collection.collName}</h3>
          <span>
            <DragIndicator /> Collection // {collection?.collRecipes.length}
          </span>
        </div>
      </CustomLink>
    </Collection>
  );
};

const CustomLink = styled(NavLink)`
  text-decoration: none;
  color: var(--main-color);
  cursor: pointer;
`;

const Collection = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  overflow: none;
  height: 400px;

  .collection-description {
    display: flex;
    flex-direction: column;
    word-break: break-all;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px;
    height: 140px;

    span {
      display: flex;
      align-items: center;
      color: var(--grey-color);
      margin-left: -2px;
      font-weight: 500;

      svg {
        transform: rotate(90deg);
      }
    }

    p {
      font-weight: 600;
      letter-spacing: 1.4px;
      font-size: 12px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 20%;
      }
    }

    h3 {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--main-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
      }
    }
  }

  .collection-layout {
    display: grid;
    height: 260px;
    grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
    gap: 2.5px;

    .grey-div {
      background: #b1b1b1;
    }

    div,
    img {
      width: 100%;
      /* height: 180px; */
    }

    div:first-child,
    img:first-child {
      grid-row: 1 / 3;
      grid-column: 1 / 4;
    }

    div:nth-child(n + 2),
    img:nth-child(n + 2) {
      /* height: 80px; */
    }

    div:nth-child(2),
    img:nth-child(2) {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }
    div:nth-child(3),
    img:nth-child(3) {
      grid-row: 3 / 4;
      grid-column: 2 / 3;
    }
    div:nth-child(4),
    img:nth-child(4) {
      grid-row: 3 / 4;
      grid-column: 3 / 4;
    }
  }
`;

export default FavoriteCollection;

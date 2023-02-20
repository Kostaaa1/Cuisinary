import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AppsOutlined, VideocamOff } from "@material-ui/icons";
import { useLayoutData } from "../../hooks/useLayoutData";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";
import SavedItems from "../saved-items/SavedItems";
import { useAuth0 } from "@auth0/auth0-react";

const FavoriteCollection = ({ collection, layoutArr, onClick }) => {
    const { isLoading } = useAuth0;

    return (
        <Collection onClick={onClick}>
            <CustomLink>
                <div className="collection-layout">
                    {layoutArr?.map((recipe, id) =>
                        recipe.data.image ? (
                            <img key={id} src={recipe.data.image} alt="" />
                        ) : (
                            <img key={id}></img>
                        )
                    )}
                </div>
                {isLoading && <h4>Loading...</h4>}
                <div className="collection-description">
                    <p>{collection.private ? "PRIVATE" : "PUBLIC"}</p>
                    <h3>{collection.collName}</h3>
                    <span>
                        <AppsOutlined /> Collection //{" "}
                        {collection?.collRecipes.length}
                    </span>
                </div>
            </CustomLink>
        </Collection>
    );
};

const CustomLink = styled(NavLink)`
    text-decoration: none;
    color: var(--main-color);
`;

const Collection = styled.div`
    display: flex;
    flex-direction: column;
    width: 270px;
    font-size: 14px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
    min-height: 370px;

    .collection-description {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: 100%;
        padding: 20px 20px 16px 20px;

        span {
            display: flex;
            align-items: center;
            color: #595959;
        }
        p {
            letter-spacing: 1.4px;
            font-size: 12px;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
                text-decoration-color: #ce4620;
                text-underline-offset: 5px;
                text-decoration-thickness: 20%;
            }
        }

        h3 {
            font-size: 18px;
            margin: 12px 0;
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
        grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
        gap: 2.5px;
        width: 100%;

        img {
            width: 100%;
            height: 180px;
            background-color: #b1b1b1;
        }

        img:first-child {
            grid-row: 1 / 3;
            grid-column: 1 / 4;
        }

        img:nth-child(n + 2) {
            height: 90px;
        }

        img:nth-child(2) {
            grid-row: 3 / 4;
            grid-column: 1 / 2;
        }
        img:nth-child(3) {
            grid-row: 3 / 4;
            grid-column: 2 / 3;
        }
        img:nth-child(4) {
            grid-row: 3 / 4;
            grid-column: 3 / 4;
        }
    }
`;

export default FavoriteCollection;

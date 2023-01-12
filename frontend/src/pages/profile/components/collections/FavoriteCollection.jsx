import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AppsOutlined, VideocamOff } from "@material-ui/icons";
import { useLayoutData } from "../../hooks/useLayoutData";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";

const FavoriteCollection = ({ collectionData }) => {
    const { arr, length, isSuccess, isLoading } = useLayoutData();
    const { currentUser, loading, validated, authenticated } =
        useContext(AuthContext);

    return (
        <Collection>
            <CustomLink to={"/account/profile/saved-items"}>
                <div className="collection-layout">
                    {arr?.map((recipe, id) => (
                        <img key={id} src={recipe.data.image} alt="" />
                    ))}
                </div>
                {isLoading && <h4>Loading...</h4>}
                <div className="collection-description">
                    <p>PUBLIC</p>
                    <h3>All Saved Items</h3>
                    <span>
                        <AppsOutlined /> Collection // {length}
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
    width: 30%;
    font-size: 14px;
    border: 1px solid rgba(0, 0, 0, 0.2);

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
        gap: 4px;
        width: 100%;

        img {
            width: 100%;
            height: 160px;
            background-color: grey;
        }

        img:first-child {
            grid-row: 1 / 3;
            grid-column: 1 / 4;
        }

        img:nth-child(n + 2) {
            height: 80px;
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

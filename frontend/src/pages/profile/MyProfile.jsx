import styled from "styled-components";
import { NavLink, Route, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useContext, useState, Component, memo } from "react";
import List from "../../pages/profile/components/List";
import ButtonBorder from "../../common/ButtonBorder";
import IndexesContext from "../../setup/app-context-menager/RecipeNameContext";
import AuthContext from "../../setup/app-context-menager/AuthContext";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useAuth } from "../../setup/auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useLayoutData } from "./hooks/useLayoutData";
import ProfileGreet from "./components/ProfileGreet";

const MyProfile = ({ listContent, staticList, setLists }) => {
    const params = useParams();
    const { arrayOfRecipeNames, setArrayOfRecipeNames, collectionId } = useContext(IndexesContext);
    const { userData } = useContext(AuthContext);
    const { user, isLoading } = useAuth0();

    useEffect(() => {
        if (arrayOfRecipeNames.length !== 0) {
            handleDeletionOfIndexes();
            setArrayOfRecipeNames([]);
        }
    }, [location.pathname !== "/account/profile/saved-items"]);

    const handleDeletionOfIndexes = async () => {
        await fetch(`/api/auth/${user?.email}/deleteFavs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titles: arrayOfRecipeNames,
                collectionId: collectionId,
            }),
        });
    };

    useEffect(() => {
        if (params.id) {
            const comp = {
                id: listContent.length + 1,
                component: "SavedItems",
                route: `/collection/${params.id}`,
            };

            if (!listContent.map((x) => x.route === comp.route).includes(true)) {
                listContent.push(comp);
            }
        }
    }, [params.id]);

    return (
        <Container>
            <div className="profile">
                {!userData ? <h4>Loading...</h4> : <ProfileGreet />}
                <div className="profile-info">
                    <ul>
                        {listContent
                            .filter((list) => list.text && list)
                            .map((list, id) => (
                                <CustomLink to={"/account/profile" + list.route} key={id}>
                                    <List className={list.selected ? "selected" : ""} list={list} />
                                </CustomLink>
                            ))}
                    </ul>
                </div>
            </div>
            <div className="components">
                {listContent.map((list) => {
                    if (list.selected) {
                        const Component = staticList[list.component];

                        return <Component key={list.id} data={userData} />;
                    }
                })}
            </div>
        </Container>
    );
};

const CustomLink = styled(NavLink)`
    text-decoration: none;
    color: var(--main-color);
`;

const Container = styled(motion.div)`
    position: relative;
    width: 100%;
    min-height: 85vh;
    max-width: 100%;
    width: 1250px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1162px) {
        padding-left: 20px;
        padding-right: 20px;
    }

    .components {
        width: 960px;

        /* @media (max-width: 70vw) {
            width: 80vw;
        } */
    }

    .profile {
        min-width: 280px;

        h4 {
            margin-bottom: 20px;
            text-align: center;
            padding: 22px;
        }
    }

    .profile-greet {
        display: flex;
        align-items: flex-start;
        margin-bottom: 25px;
        padding: 0 10px;

        img {
            margin-right: 12px;
            width: 60px;
            height: 60px;
            pointer-events: none;
        }

        h3 {
            word-break: break-all;
        }

        svg {
            font-size: 5rem;
            color: #ce4620;
            margin-right: 10px;
        }
    }

    .profile-info {
        ul {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;
        }

        ul li {
            display: inline-flex;
            justify-content: flex-start;
            align-items: center;
            margin-right: 12px;
            list-style: none;
            padding: 0.9rem 0.4rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            cursor: pointer;
            padding-left: 12px;

            svg {
                color: #ce4620;
                margin-right: 10px;
                font-size: 16px;
            }

            &:hover:not(.selected) {
                background-color: rgba(0, 0, 0, 0.16);
                color: #ce4620;
            }
        }

        .selected {
            border-left: 3px solid #ce4620;
            border-top: 1px solid rgba(0, 0, 0, 0.3);
            font-weight: bold;
            color: #ce4620;
        }
    }
`;

export default MyProfile;

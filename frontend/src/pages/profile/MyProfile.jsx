import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import List from "../../pages/profile/components/List";
import ButtonBorder from "../../common/ButtonBorder";
import IndexesContext from "../../setup/app-context-menager/RecipeNameContext";
import AuthContext from "../../setup/app-context-menager/AuthContext";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useAuth } from "../../setup/auth/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyProfile = ({ listContent, staticList }) => {
    const { arrayOfRecipeNames, setArrayOfRecipeNames } =
        useContext(IndexesContext);
    const { userDataContext } = useContext(AuthContext);
    const { isLoading, isAuthenticated, getAccessTokenSilently, user } =
        useAuth0();
    const [data, setdata] = useState([]);
    // const { validated, authenticated, userDataContext } =
    //     useContext(AuthContext);
    const { token, currentUser } = useAuth();
    const [userData] = useState();

    // useEffect(() => {
    //     if (currentUser) {
    //         console.log(currentUser);
    //     }
    // }, [currentUser]);
    // useEffect(() => {
    //     console.log("fetched user data");
    //     fetchUserData();
    // }, []);

    useEffect(() => {
        if (arrayOfRecipeNames.length !== 0) {
            handleDeletionOfIndexes();
            setArrayOfRecipeNames([]);
        }
    }, [location.pathname !== "/account/profile/saved-items"]);

    const handleDeletionOfIndexes = async () => {
        await fetch(`/api/auth/${user?.email}/deleteFavs`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titles: arrayOfRecipeNames,
                email: user?.email,
            }),
        });
    };

    return (
        <Container>
            <div className="profile">
                {!userDataContext ? (
                    <h4>Loading...</h4>
                ) : (
                    <div className="profile-greet">
                        <img src={userDataContext?.picture} alt="" />
                        <div>
                            <h3>Hi, {userDataContext?.email} </h3>
                            <ButtonBorder value={"View Public Profile"} />
                        </div>
                    </div>
                )}
                <div className="profile-info">
                    <ul>
                        {listContent
                            .filter((list) => list.component !== "SavedItems")
                            .map((list, id) => (
                                <CustomLink
                                    to={"/account/profile" + list.route}
                                    key={id}
                                >
                                    <List
                                        className={
                                            list.selected ? "selected" : ""
                                        }
                                        list={list}
                                    />
                                </CustomLink>
                            ))}
                    </ul>
                </div>
            </div>
            <div className="components">
                {listContent.map((list) => {
                    if (list.selected) {
                        const Component = staticList[list.component];
                        return <Component key={list.id} />;
                    }
                })}
            </div>
        </Container>
        // </motion.div>
    );
};

const CustomLink = styled(NavLink)`
    text-decoration: none;
    color: var(--main-color);
`;

const Container = styled(motion.div)`
    border-radius: 5px;
    width: 100%;
    background-color: #fffdfb;
    padding: 50px 0;
    display: flex;

    .components {
        width: 75%;
    }

    .profile {
        width: 25%;
        margin-right: 20px;

        h4 {
            margin-bottom: 20px;
            text-align: center;
            padding: 20px;
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

import { GiKnifeFork } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Search from "./components/Search";
import Category from "./components/CategoryNavigation";
import { ArrowDropDown, AccountCircle } from "@material-ui/icons";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useState, memo, useEffect, useContext } from "react";
import { useAuth } from "../../setup/auth/useAuth";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "../../setup/app-context-menager/AuthContext";
import Dropdown from "./components/Dropdown";
import { motion } from "framer-motion";

const Navbar = () => {
    const { user, loginWithPopup, isAuthenticated, logout, isLoading } =
        useAuth0();
    const { authenticated, userLogout, currentUser } = useAuth();
    const { userDataContext, setUserDataContext } = useContext(AuthContext);
    const [searchClick, setSearchedClick] = useState(false);
    const showSearched = () => {
        setSearchedClick(!searchClick);
    };

    useEffect(() => {
        getUser();
        // }, [userDataContext !== undefined]);
    }, [user]);

    const getUser = async () => {
        try {
            const res = await fetch(`/api/auth/${user?.email}`);
            const data = await res.json();

            console.log(data);
            setUserDataContext(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Header>
            <Nav>
                <Control>
                    <Logo to={"/"}>
                        Culinaryyy
                        <GiKnifeFork className="logo" />
                    </Logo>
                    {searchClick && <Search showSearched={showSearched} />}
                    {!searchClick && (
                        <ul className="wrapper">
                            <li className="list">
                                <FaSearch
                                    className="search"
                                    onClick={showSearched}
                                />
                            </li>
                            {authenticated ? (
                                <>
                                    <li className="dropdown list">
                                        <img
                                            src="https://st3.depositphotos.com/4326917/12573/v/450/depositphotos_125734036-stock-illustration-user-sign-illustration-white-icon.jpg"
                                            alt=""
                                            className="user"
                                        />{" "}
                                        My account
                                        <ArrowDropDown className="arrow" />
                                        <Links>
                                            <ul className="user__links">
                                                <NavLink
                                                    to={"/account/profile"}
                                                >
                                                    <li>My Profile</li>
                                                </NavLink>
                                                <NavLink
                                                    to={
                                                        "/account/profile/collections"
                                                    }
                                                >
                                                    <li>
                                                        Saved Items &
                                                        Collections
                                                    </li>
                                                </NavLink>
                                                <NavLink
                                                    to={"/account/addRecipe"}
                                                >
                                                    <li>Add a Recipe</li>
                                                </NavLink>

                                                <div className="line__break"></div>

                                                <NavLink>
                                                    <li>Help</li>{" "}
                                                </NavLink>
                                                <li onClick={userLogout}>
                                                    Log Out
                                                </li>
                                            </ul>
                                        </Links>
                                    </li>
                                </>
                            ) : (
                                <li
                                    className="underline list"
                                    onClick={loginWithPopup}
                                >
                                    <FaUserCircle className="user" /> Log in
                                </li>
                            )}
                            <li className="underline list">About Us</li>
                            <li className="underline list">Contact</li>
                            <li className="underline">Newsletter</li>
                        </ul>
                    )}
                </Control>
                <Category />
            </Nav>
        </Header>
    );
};

const Header = styled.header`
    position: relative;
    max-width: 100vw;
    box-shadow: 0 0.125rem 0.375rem rgb(0 0 0 / 15%);
    margin-top: 30px;
`;

const Control = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    width: 1250px;
    margin: 0 auto;
    margin-bottom: 10px;

    .wrapper {
        display: flex;
        color: var(--main-color);
        font-size: 14px;
        font-weight: 400;
        width: 480px;
        align-items: center;
        justify-content: space-evenly;
    }

    ul li {
        list-style: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 50px;
        letter-spacing: -0.5px;
        /* outline: 1px solid black; */

        .user {
            margin-right: 7px;
            color: var(--red-color);
            width: 25px;
            height: 25px;
            background-color: white;
            border-radius: 50%;
        }

        .search {
            color: var(--grey-color);
            font-size: 1.1rem;
        }
    }

    .list {
        padding-right: 20px;
        /* padding: 0 16px 0 -10px; */
        height: 24px;
        border-right: 1px solid rgba(0, 0, 0, 0.15);
    }

    .underline:hover {
        text-decoration: underline;
        text-decoration-color: var(--red-color);
        text-underline-offset: 5px;
        text-decoration-thickness: 10%;
    }

    .dropdown {
        position: relative;

        &:hover > div {
            visibility: visible;
        }

        div {
            &:focus {
                visibility: hidden;
                border: 20px solid yellow;
            }
        }
    }
`;

const Logo = styled(Link)`
    text-decoration: none;
    font-size: 2rem;
    font-weight: 600;
    font-family: "Lobster two", cursive;
    color: var(--main-color);
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
        font-size: 2.2rem;
        color: #f7af30;
        /* color: var(--main-color); */
        margin-left: 4px;
    }
`;

const Links = styled.div`
    visibility: hidden;

    .user__links {
        position: absolute;
        width: 230px;
        background: white;
        top: 100%;
        left: 0;
        transform: translateX(-5%);
        z-index: 10;
        flex-direction: column;
        color: black;
        padding: 8px 20px;
        font-weight: 500;
        border-radius: 3px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
        max-height: 500px;

        li {
            margin: 2px 0;
            font-size: 14px;
        }

        .line__break {
            width: 100%;
            margin: 10px auto 15px auto;
            border: 1px solid rgba(0, 0, 0, 0.14);
        }
    }
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
    width: 100%;

    &:hover {
        color: #6b6969;
    }
`;

export default memo(Navbar);

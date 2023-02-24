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
import Logo from "../../common/Logo";
import RecipeNames from "../../setup/app-context-menager/RecipeNameContext";

const Navbar = () => {
  const { showSearch, setShowSearch } = useContext(RecipeNames);
  // const {showSearch, setShowSearch} = useState(false);
  const [showDropdown, setShowDropdown] = useState();
  const { user, loginWithPopup, isAuthenticated, logout, isLoading } = useAuth0();
  const { authenticated } = useAuth();

  const showSearched = () => {
    setShowSearch(!showSearch);
  };

  return (
    <Nav>
      <NavWrap>
        <NavControl>
          <Logo to={"/"} />
          {showSearch && <Search showSearched={showSearched} />}
          {!showSearch && (
            <ul className="wrapper">
              <li className="list">
                <FaSearch className="search" onClick={showSearched} />
              </li>
              <div className="divider-line"></div>
              {authenticated ? (
                <>
                  <li
                    className="dropdown list"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <img
                      src="https://st3.depositphotos.com/4326917/12573/v/450/depositphotos_125734036-stock-illustration-user-sign-illustration-white-icon.jpg"
                      alt=""
                      className="user"
                    />{" "}
                    My account
                    <ArrowDropDown className="arrow" />
                    {showDropdown && (
                      <Links>
                        <ul className="user-links">
                          <NavLink to={"/account/profile"}>
                            <li onClick={() => setShowDropdown(false)}>My Profile</li>
                          </NavLink>
                          <NavLink to={"/account/profile/collection"}>
                            <li onClick={() => setShowDropdown(false)}>Saved Items & Collections</li>
                          </NavLink>
                          <NavLink to={"/account/addRecipe"}>
                            <li onClick={() => setShowDropdown(false)}>Add a Recipe</li>
                          </NavLink>

                          <div className="line-break"></div>

                          <NavLink>
                            <li onClick={() => setShowDropdown(false)}>Help</li>{" "}
                          </NavLink>
                          <li onClick={logout}>Log Out</li>
                        </ul>
                      </Links>
                    )}
                  </li>
                  <div className="divider-line"></div>
                </>
              ) : (
                <>
                  <li className="underline list" onClick={loginWithPopup}>
                    <FaUserCircle className="user" /> Log in
                  </li>
                  <div className="divider-line"></div>
                </>
              )}
              <li className="underline list">About Us</li>
              <div className="divider-line"></div>
              <li className="underline list">Contact</li>
              <div className="divider-line"></div>
              <li className="underline">Newsletter</li>
            </ul>
          )}
        </NavControl>
        <Category />
      </NavWrap>
    </Nav>
  );
};

const Nav = styled.nav`
  position: relative;
  width: 100vw;
  margin-bottom: 50px;
  height: 130px;
  padding-top: 20px;
  box-shadow: 0 0.125rem 0.375rem rgb(0 0 0 / 20%);
`;

const NavControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const NavWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  margin: 0 auto;
  margin-bottom: 10px;

  .wrapper {
    display: flex;
    /* color: #646464; */
    color: var(--main-color);
    font-size: 14px;
    font-weight: 500;
    width: 450px;
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
      font-size: 1.2rem;
    }
  }

  .list {
    height: 24px;
  }

  .divider-line {
    height: 24px;
    margin: 10px;
    width: 0;
    border-right: 1px solid #d9d9d9;
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

const Links = styled.div`
  .user-links {
    position: absolute;
    width: 230px;
    background: white;
    top: 100%;
    left: 0;
    transform: translateX(-5%);
    z-index: 10;
    flex-direction: column;
    padding: 8px 12px;
    font-weight: 500;
    border-radius: 3px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
    max-height: 500px;

    li {
      color: var(--main-color);
      margin: 2px 0;
      font-size: 14.5px;
    }

    .line-break {
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

import styled from "styled-components";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useState, memo, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import Logo from "../../common/Logo";
import RecipeNames from "../../setup/app-context-menager/GlobalContext";
import Dropdown from "./components/Dropdown";

const Horizontal = () => {
  const { showSearch, setShowSearch } = useContext(RecipeNames);
  const [showDropdown, setShowDropdown] = useState();
  const { loginWithPopup, logout, user } = useAuth0();

  const showSearched = () => {
    setShowSearch(!showSearch);
  };

  return (
    <ScrolledHeader
      initial={{ y: "30%", height: "90px" }}
      animate={{
        y: 0,
        height: "70px",
      }}
      transition={{ duration: 0.18 }}
    >
      <HeaderControl>
        <Logo to={"/"} />
        {showSearch && <Search showSearched={showSearched} />}
        {!showSearch && <Navbar />}

        {!showSearch && (
          <ul className="wrapper">
            <li className="list">
              <FaSearch className="search" onClick={showSearched} />
            </li>
            <div className="divider-line"></div>
            {user ? (
              <Dropdown />
            ) : (
              <>
                <li className="underline list" onClick={loginWithPopup}>
                  <FaUserCircle className="user" /> Log in
                </li>
              </>
            )}
          </ul>
        )}
      </HeaderControl>
    </ScrolledHeader>
  );
};

const HeaderControl = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const ScrolledHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: 1240px;
  margin: 0 auto;

  .wrapper {
    display: flex;
    color: var(--main-color);
    font-size: 0.9rem;
    font-weight: 500;
    align-items: center;

    .user-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  ul li {
    position: relative;
    list-style: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 50px;

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
      transform: scale(1.3);
    }
  }

  .list {
    height: 24px;
  }

  .divider-line {
    height: 24px;
    margin: 12px;
    width: 1px;
    background: #d9d9d9;
  }

  .underline:hover {
    text-decoration: underline;
    text-decoration-color: var(--red-color);
    text-underline-offset: 5px;
    text-decoration-thickness: 10%;
  }
`;

export default memo(Horizontal);

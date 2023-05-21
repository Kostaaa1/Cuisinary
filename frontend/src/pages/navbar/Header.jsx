import styled from "styled-components";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useState, memo, useEffect, useContext } from "react";
import { useUser } from "../../setup/auth/useAuth";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../common/Logo";
import GlobalContext from "../../setup/app-context-menager/GlobalContext";
import ScrolledHeader from "./ScrolledHeader";
import Dropdown from "./components/Dropdown";
import { useAuth } from "../../setup/auth/useAuth";

const Header = () => {
  const { showSearch, setShowSearch } = useContext(GlobalContext);
  const { loginWithPopup, logout, user } = useAuth0();
  const [activateScrolled, setActivateScrolled] = useState(false);
  const { authenticated } = useAuth();

  const showSearched = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setActivateScrolled(true);
      } else {
        setActivateScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    console.log(authenticated);
  }, [authenticated]);

  return (
    <HeaderContainer>
      {!activateScrolled ? (
        <VerticalHeader>
          <HeaderControl>
            <Logo to={"/"} />
            {showSearch && <Search showSearched={showSearched} />}
            {!showSearch && (
              <ul className="wrapper">
                <li className="list">
                  <FaSearch className="search" onClick={showSearched} />
                </li>
                <div className="divider-line"></div>
                {user ? (
                  <>
                    <Dropdown />
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
                <li className="underline">Newsletter</li>
                <div className="divider-line"></div>
                <li className="underline list">Sweepstakes</li>
              </ul>
            )}
          </HeaderControl>
          <Navbar />
        </VerticalHeader>
      ) : (
        <ScrolledHeader />
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  /* width: 100vw; */
  top: 0;
  left: 0;
  background-color: white;
  box-shadow: 0 0.125rem 0.375rem rgb(0 0 0 / 20%);
  z-index: 10;
`;

const HeaderControl = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const VerticalHeader = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1240px;
  margin: 0 auto;
  padding-bottom: 8px;

  .wrapper {
    color: var(--main-color);
    font-weight: 500;
    display: flex;
    width: 450px;
    align-items: center;
    justify-content: space-between;
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
      width: 20px;
      height: 20px;
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
    height: 22px;
    width: 1px;
    background-color: #d1d1d1;
  }

  .underline:hover {
    text-decoration: underline;
    text-decoration-color: var(--red-color);
    text-underline-offset: 5px;
    text-decoration-thickness: 10%;
  }
`;

export default memo(Header);

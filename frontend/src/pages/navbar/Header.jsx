import styled from "styled-components";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useState, memo, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../common/Logo";
import GlobalContext from "../../setup/app-context-menager/GlobalContext";
import ScrolledHeader from "./ScrolledHeader";
import Dropdown from "./components/Dropdown";
import { useAuth } from "../../setup/auth/useAuth";
import { Close, Menu } from "@mui/icons-material";
import SideNavbar from "./components/SideNavbar";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "../../utils/useWindowSize";

const Header = () => {
  const { showSearch, setShowSearch } = useContext(GlobalContext);
  const { loginWithPopup } = useAuth0();
  const [activateScrolled, setActivateScrolled] = useState(false);
  const { authenticated } = useAuth();
  const [showSideNav, setShowSideNav] = useState(false);
  const windowSize = useWindowSize();

  const showSearched = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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

  return (
    <>
      <HeaderContainer>
        {windowSize[0] > 1120 ? (
          <>
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
                      {authenticated ? (
                        <>
                          <Dropdown />
                          <div className="divider-line"></div>
                        </>
                      ) : (
                        <>
                          <li
                            className="underline list"
                            onClick={loginWithPopup}
                          >
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
          </>
        ) : (
          <HeaderControl>
            {!showSideNav ? (
              <>
                <div className="hamburger-wrap">
                  <Menu onClick={() => setShowSideNav(true)} />
                </div>
                <Logo to={"/"} />
                {showSearch ? (
                  <Search
                    style={{ width: "400px" }}
                    showSearched={showSearched}
                  />
                ) : (
                  <ul className="wrapper-resize">
                    <li className="list">
                      <FaSearch className="search" onClick={showSearched} />
                    </li>
                    <div className="divider-line"></div>
                    <Dropdown />
                  </ul>
                )}
              </>
            ) : (
              <>
                <div className="hamburger-wrap">
                  <Close onClick={() => setShowSideNav(false)} />
                </div>
                <Logo to={"/"} />
                <div className="wrapper-resize"></div>
              </>
            )}
          </HeaderControl>
        )}
      </HeaderContainer>
      <AnimatePresence>
        {showSideNav && (
          <SideNav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="side-navbar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
            >
              <SideNavbar
                showSideNav={showSideNav}
                showSearched={showSearched}
                setShowSideNav={setShowSideNav}
              />
            </motion.div>
          </SideNav>
        )}
      </AnimatePresence>
    </>
  );
};

const SideNav = styled(motion.nav)`
  position: fixed;
  overflow: none;
  content: "";
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  background-color: rgba(22, 22, 22, 0.75);
  z-index: 10;

  .user {
    display: flex;
    align-items: center;
    color: var(--main-color);
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      text-decoration-color: var(--red-color);
      text-underline-offset: 5px;
      text-decoration-thickness: 10%;
    }

    svg {
      margin-right: 7px;
      color: var(--red-color);
      width: 26px;
      height: 26px;
      background-color: white;
      border-radius: 50%;
    }
  }

  .category-wrap {
    span {
      display: flex;
      align-items: center;

      h2 {
        font-size: 22px;
      }

      svg {
        cursor: pointer;
        font-size: 28px;
        margin-right: 10px;
      }
    }

    ul {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      list-style: none;
      margin-top: 22px;

      & > li {
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: 14px 0;
        font-size: 14px;
        color: var(--gray-color);
        font-weight: 400;

        &:hover {
          text-decoration: underline;
          text-decoration-color: var(--red-color);
          text-underline-offset: 5px;
          text-decoration-thickness: 10%;
        }
      }
    }
  }

  .side-navbar {
    padding: 80px 36px 20px 36px;
    width: 380px;
    height: 100%;
    background-color: #fff;

    .sidenav-wrapper {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .category-wrap {
        h4 {
          padding: 8px 0;
        }

        ul {
          list-style: none;
          margin-top: 22px;

          & > li {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 700;
            padding: 14px 0;
            font-size: 14px;
            color: var(--main-color);
            border-bottom: 1px solid var(--grey-hover-color);

            svg {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
`;

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: white;
  box-shadow: 0 0.125rem 0.375rem rgb(0 0 0 / 20%);
  z-index: 100;

  .user {
    margin-right: 7px;
    color: var(--red-color);
    width: 26px;
    height: 26px;
    background-color: white;
    border-radius: 50%;
  }

  ul li {
    position: relative;
    list-style: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 50px;

    .search {
      color: var(--grey-color);
      transform: scale(1.3);
    }
  }

  .divider-line {
    height: 22px;
    width: 1px;
    background-color: #d1d1d1;
  }

  .list {
    height: 24px;
  }
`;

const HeaderControl = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  @media (max-width: 1270px) {
    padding: 0 36px;
  }

  .hamburger-wrap {
    width: 160px;
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }

  .wrapper-resize {
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: space-between;
    width: 160px;
  }
`;

const VerticalHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1240px;
  height: 120px;
  max-width: 100%;
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

  .list {
    height: 24px;
  }

  .underline:hover {
    text-decoration: underline;
    text-decoration-color: var(--red-color);
    text-underline-offset: 5px;
    text-decoration-thickness: 10%;
  }
`;

export default memo(Header);

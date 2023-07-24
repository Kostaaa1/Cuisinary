import styled from 'styled-components';
import Search from './components/Search';
import Navbar from './components/Navbar';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { useState, memo, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import Logo from '../../common/Logo';
import ProfileContext from '../../setup/app-context-menager/GlobalContext';
import Dropdown from './components/Dropdown';

const Horizontal = () => {
  const { showSearch, setShowSearch } = useContext(ProfileContext);
  const { loginWithPopup, user } = useAuth0();

  const showSearched = () => {
    setShowSearch(!showSearch);
  };

  return (
    <ScrolledHeader
      initial={{ y: '20%', height: '80px' }}
      animate={{
        y: 0,
        height: '60px',
      }}
      transition={{ duration: 0.18 }}
    >
      <HeaderControl>
        <div className="flex-1">
          <Logo to={'/'} />
        </div>
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

  @media (max-width: 1270px) {
    padding: 0 36px;
  }

  .wrapper {
    display: flex;
    color: var(--main-color);
    font-size: 0.9rem;
    font-weight: 500;
    align-items: center;
    flex: 1;
    justify-content: flex-end;

    .user-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .flex-1 {
    flex: 1;
    display: flex;
    justify-content: flex-start;
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

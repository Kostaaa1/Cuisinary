import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdRiceBowl } from 'react-icons/md';

const Logo = ({ showSideNav, closeSideNav, style }) => {
  const navigate = useNavigate();

  return (
    <CulinaryLogo
      onClick={() => {
        if (showSideNav) closeSideNav();
        navigate('/');
      }}
      style={style}
    >
      Cuisinary
      <MdRiceBowl className="logo" />
    </CulinaryLogo>
  );
};

const CulinaryLogo = styled.div`
  cursor: pointer;
  text-decoration: none;
  font-size: 2.2rem;
  font-weight: 900;
  font-family: 'Lobster Two', 'Helvetica', sans-serif;
  font-style: italic;
  color: var(--red-color);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  letter-spacing: 0.8;

  .logo {
    font-size: 2.2rem;
    color: var(--gold-color);
  }

  @media screen and (max-width: 729px) {
    font-size: 1.8rem;
  }
`;

export default Logo;

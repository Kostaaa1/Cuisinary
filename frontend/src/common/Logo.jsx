import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdRiceBowl } from "react-icons/md";

const Logo = ({ style }) => {
  return (
    <CulinaryLogo style={style} to={"/"}>
      Cuisinary
      <MdRiceBowl className="logo" />
    </CulinaryLogo>
  );
};

const CulinaryLogo = styled(Link)`
  text-decoration: none;
  font-size: 2.2rem;
  font-weight: 900;
  font-family: "Lobster Two", "Helvetica", sans-serif;
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
`;

export default Logo;

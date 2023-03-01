import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdRiceBowl } from "react-icons/md";

const Logo = ({ style }) => {
  return (
    <CulinaryLogo style={style} to={"/"}>
      Culinary
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
  color: var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  letter-spacing: 0.8;

  .logo {
    font-size: 2.2rem;
    color: #f7af30;
    /* color: var(--main-color); */
    margin-left: 2px;
  }
`;

export default Logo;

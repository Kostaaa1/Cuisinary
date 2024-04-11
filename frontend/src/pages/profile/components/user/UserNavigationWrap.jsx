import { ArrowForwardIos } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigationWrap = ({ links, style }) => {
  return (
    <Nav style={style}>
      {links.map((link, id) =>
        id !== links.length - 1 ? (
          <div key={id}>
            <CustomLink to={link.url}> {link.content} </CustomLink>
            <ArrowForwardIos />
          </div>
        ) : (
          <div key={id}>
            <CustomLink to={link.url}> {link.content} </CustomLink>
          </div>
        )
      )}
    </Nav>
  );
};

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  svg {
    color: var(--main-color);
    font-size: 0.9rem;
    margin: -2px 8px;
    vertical-align: middle;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--red-color);
    text-underline-offset: 5px;
    text-decoration-thickness: 12%;
  }
`;

export default NavigationWrap;

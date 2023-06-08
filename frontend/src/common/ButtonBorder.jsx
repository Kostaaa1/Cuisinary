import React from "react";
import styled from "styled-components";

const ButtonBorder = ({ value, style, onClick, icon }) => {
  return (
    <Button style={style} onClick={onClick}>
      {icon}
      {value}
    </Button>
  );
};

const Button = styled.div`
  color: var(--main-color);
  text-decoration: none;
  outline: 1px solid var(--red-color);
  font-weight: 800;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 12px;
  margin-top: 14px;
  cursor: pointer;

  &:active {
    outline: 2px solid var(--blue-color);
    border-radius: 3px;
    outline-offset: 1px;
  }

  &:hover {
    background-color: var(--red-color);
    color: white;
  }
`;

export default ButtonBorder;

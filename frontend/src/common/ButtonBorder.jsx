import React from 'react';
import styled from 'styled-components';

const ButtonBorder = ({ value, style, onClick, icon }) => {
  return (
    <Button type="button" style={style} onClick={onClick}>
      {icon}
      {value}
    </Button>
  );
};

const Button = styled.button`
  background-color: #fff;
  color: var(--main-color);
  text-decoration: none;
  outline: 2px solid var(--red-color);
  font-weight: 800;
  border-radius: 3px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  border: none;
  user-select: none;
  padding: 6px 0;

  svg {
    margin-right: 4px;
    color: var(--red-color);
  }

  &:active {
    outline: 2px solid var(--blue-color);
    border-radius: 3px;
    outline-offset: 1px;
  }

  &:hover {
    background-color: var(--red-color);
    color: white;

    svg {
      color: white;
    }
  }
`;

export default ButtonBorder;

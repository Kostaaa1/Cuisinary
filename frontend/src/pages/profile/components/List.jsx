import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaUtensilSpoon } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';

const List = ({ list }) => {
  const IconList = {
    FaHeart,
    FaUtensilSpoon,
    MdReviews,
  };
  const Svg = IconList[list.icon];

  return (
    <div>
      <Li className={list.selected ? 'selected' : ''}>
        {list.icon && <Svg />}
        {list.text}
      </Li>
    </div>
  );
};

const Li = styled.li`
  color: var(--main-color);
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 12px;
  list-style: none;
  padding: 0.9rem 0.4rem;
  border-top: 1px solid rgba(0, 0, 0, 0.16);
  padding-left: 12px;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  width: 100%;

  svg {
    color: var(--red-color);
    margin-right: 10px;
    font-size: 16px;
  }

  &:hover:not(.selected) {
    background-color: var(--grey-hover-color);
    color: var(--red-color);
  }
`;

export default List;

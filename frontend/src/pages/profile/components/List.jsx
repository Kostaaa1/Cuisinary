import React from "react";
import styled from "styled-components";
import { FaHeart, FaUtensilSpoon } from "react-icons/fa";
import { MdReviews } from "react-icons/md";

const List = ({ list }) => {
  const IconList = {
    FaHeart,
    FaUtensilSpoon,
    MdReviews,
  };
  const Svg = IconList[list.icon];

  return (
    <div>
      <Li className={list.selected ? "selected" : ""}>
        {list.icon && <Svg />}
        {list.text}
      </Li>
    </div>
  );
};

const Li = styled.li`
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 12px;
  list-style: none;
  padding: 0.9rem 0.4rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding-left: 12px;

  svg {
    color: #ce4620;
    margin-right: 10px;
    font-size: 16px;
  }

  &:hover:not(.selected) {
    background-color: rgba(0, 0, 0, 0.16);
    color: #ce4620;
  }
`;

export default List;

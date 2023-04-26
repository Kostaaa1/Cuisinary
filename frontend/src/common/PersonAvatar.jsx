import { Person } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const PersonAvatar = ({ style }) => {
  return <Avatar style={style} />;
};

const Avatar = styled(Person)`
  color: white;
  background-color: var(--red-color);
  margin-right: 12px;
  width: 70px;
  height: 70px;
  pointer-events: none;
`;

export default PersonAvatar;

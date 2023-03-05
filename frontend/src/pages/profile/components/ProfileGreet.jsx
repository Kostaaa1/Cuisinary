import { Person } from "@material-ui/icons";
import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonBorder from "../../../common/ButtonBorder";
import AuthContext from "../../../setup/app-context-menager/AuthContext";

const ProfileGreet = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Greet>
      {!userData?.picture.image ? (
        <Person />
      ) : (
        <img src={`${userData?.picture.image}`} alt="profile-picture" className="profile-picture" />
      )}

      <div>
        <h3>Hi, {userData?.firstName ? `${userData?.firstName} ${userData?.lastName}` : userData?.email}</h3>
        <ButtonBorder onClick={() => navigate(`/profile/${userData._id}`)} value={"View Public Profile"} />
      </div>
    </Greet>
  );
};

const Greet = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  padding: 0 10px;

  h3 {
    word-break: break-all;
  }

  img {
    margin-right: 12px;
    width: 70px;
    height: 70px;
    pointer-events: none;
    filter: saturate(100%);
  }

  svg {
    color: white;
    background-color: #ce4620;
    margin-right: 12px;
    width: 70px;
    height: 70px;
    pointer-events: none;
  }
`;

export default React.memo(ProfileGreet);

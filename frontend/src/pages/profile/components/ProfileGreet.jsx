import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonBorder from "../../../common/ButtonBorder";
import AuthContext from "../../../setup/app-context-menager/AuthContext";
import PersonAvatar from "../../../common/PersonAvatar";
import { useUser } from "../../../setup/auth/useAuth";

const ProfileGreet = ({ onLoad }) => {
  const { userData } = useUser();
  const navigate = useNavigate();

  return (
    <Greet>
      {!userData?.picture?.image ? (
        <PersonAvatar onLoad={onLoad} />
      ) : (
        <img src={`${userData?.picture?.image}`} onLoad={onLoad} alt="profile-picture" className="profile-picture" />
      )}
      <div>
        <h3>Hi, {userData?.firstName ? `${userData?.firstName} ${userData?.lastName}` : userData?.email}</h3>
        <ButtonBorder
          style={{ width: "140px", height: "36px" }}
          onClick={() => navigate(`/profile/${userData._id}`)}
          value={"View Public Profile"}
        />
      </div>
    </Greet>
  );
};

const Greet = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 10px;

  h3 {
    font-size: 18px;
    word-break: break-all;
  }

  img {
    margin-right: 12px;
    height: 70px;
    width: 70px;
    pointer-events: none;
  }

  svg {
    width: 70px;
    height: 70px;
  }
`;

export default React.memo(ProfileGreet);

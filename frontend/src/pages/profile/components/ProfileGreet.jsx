import React, { useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import ButtonBorder from "../../../common/ButtonBorder";
import AuthContext from "../../../setup/app-context-menager/AuthContext";

const ProfileGreet = () => {
  const { userData } = useContext(AuthContext);

  return (
    <Greet>
      <img
        src={
          !userData?.picture.image
            ? "https://st3.depositphotos.com/4326917/12573/v/450/depositphotos_125734036-stock-illustration-user-sign-illustration-white-icon.jpg"
            : `${userData?.picture.image}`
        }
        alt="profile-picture"
        className="profile-picture"
      />

      <div>
        <h3>Hi, {userData?.firstName ? `${userData?.firstName} ${userData?.lastName}` : userData?.email}</h3>
        <ButtonBorder value={"View Public Profile"} />
      </div>
    </Greet>
  );
};

const Greet = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  padding: 0 10px;

  img {
    margin-right: 12px;
    width: 60px;
    height: 60px;
    pointer-events: none;
    filter: saturate(100%);
  }

  h3 {
    word-break: break-all;
  }

  svg {
    font-size: 5rem;
    color: #ce4620;
    margin-right: 10px;
  }
`;

export default React.memo(ProfileGreet);

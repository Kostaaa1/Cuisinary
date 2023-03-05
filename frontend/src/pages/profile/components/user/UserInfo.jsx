import { ArrowForwardIos, Person } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../../../common/Loading";
import NavigationWrap from "../../../../common/NavigationWrap";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";
import { useLayoutData } from "../../hooks/useLayoutData";
import FavoriteCollection from "../collections/FavoriteCollection";

const UserInfo = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const { layoutData, setLayoutData, layoutArr } = useLayoutData();
  const [activeIndex, setActiveIndex] = useState(0);
  const h3Refs = [useRef(null), useRef(null), useRef(null)];
  const params = useParams();
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const url = window.location.href.slice(21);
  const navigationLinks = [
    { url: "/", content: "Home" },
    { url: `/profile/${userData?._id}`, content: userData?.nickname },
    { url: "/account/profile/collection", content: "Saved Items & Collections" },
  ];

  return (
    <Section>
      {!userData ? (
        <Loading />
      ) : (
        <>
          <ProfileWrap>
            {userData?.picture.image ? (
              <img src={userData?.picture.image} alt="" />
            ) : (
              <Person className="profile-svg" />
            )}
            <div className="profile-info">
              <NavigationWrap links={navigationLinks} />
              <h1>{userData?.nickname}</h1>
              <p>{userData?.tagline} </p>
            </div>
          </ProfileWrap>
          <ProfileContent>
            <div className="saved">
              <div className="saved-wrapper">
                <h5 onClick={() => handleClick(0)} ref={h3Refs[0]} className={activeIndex === 0 ? "selected" : ""}>
                  SAVED ITEMS & COLLECTIONS
                </h5>
                <h5 onClick={() => handleClick(1)} ref={h3Refs[1]} className={activeIndex === 1 ? "selected" : ""}>
                  PERSONAL RECIPES
                </h5>
                <h5 onClick={() => handleClick(2)} ref={h3Refs[2]} className={activeIndex === 2 ? "selected" : ""}>
                  REVIEWS
                </h5>
              </div>
              <div className="collection-flex">
                <h4> {layoutData?.length} Collections </h4>
                <div className="collection-wrap">
                  {activeIndex === 0 &&
                    layoutData
                      ?.filter((x) => !x.private)
                      .map((collection, id) => (
                        <FavoriteCollection
                          key={id}
                          collection={collection}
                          layoutArr={layoutArr[id]}
                          onClick={() => {
                            navigate(
                              collection.collName === "All saved items"
                                ? `${url}/collection/all-saved-items`
                                : `${url}/collection/${collection._id}`
                            );
                          }}
                        />
                      ))}
                </div>
              </div>
            </div>
          </ProfileContent>
        </>
      )}
    </Section>
  );
};

const ProfileWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;

  @media (max-width: 910px) {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .profile-info {
    position: relative;
    border-radius: 2px;
    right: 20px;
    top: -50px;
    width: 100%;
    background-color: #fff;
    max-width: 100%;
    word-break: break-all;
    /* border: 1px solid rgb(0 0 0 / 20%); */
    box-shadow: 0 0.12rem 0.375rem rgb(0 0 0 / 32%);
    border-left: 5px solid #46c5b5;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 24px 28px;

    @media (max-width: 910px) {
      top: 0;
      right: 0;
      margin: 0 auto;
      width: 640px;
    }
  }

  .profile-svg {
    color: white;
    background-color: #ce4620;
    width: 320px;
    height: 320px;
    pointer-events: none;
  }

  img {
    width: 320px;
    height: 320px;
    filter: saturate(100%);
    pointer-events: none;
  }
`;

const ProfileContent = styled.div`
  margin: 20px 0;

  .saved {
    width: 910px;
    max-width: 100%;

    @media (max-width: 910px) {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 640px;
      margin: 0 auto;
    }

    .saved-wrapper {
      display: flex;
      /* flex-direction: column; */
      /* align-content: flex-start; */
      width: 100%;
      margin: 60px 0 10px 0;
      overflow-x: scroll;

      h5 {
        width: max-content;
        /* line-height: 30px; */
        color: var(--grey-color);
        cursor: pointer;
        font-size: 0.9rem;
        padding: 0 16px;
      }
    }

    .selected {
      border-bottom: 3px solid var(--red-color);
      color: black;
    }

    .collection-flex {
      h4 {
        margin: 50px 0 30px 0;
        font-weight: 500;
      }

      .collection-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        row-gap: 30px;
      }
    }
  }
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  margin: 200px auto;
  max-width: 100%;
  width: 1250px;

  @media (max-width: 1250px) {
    padding: 0 22px;
  }

  h1 {
    font-size: 2.2rem;
    margin: 16px 0;
  }
`;

export default UserInfo;

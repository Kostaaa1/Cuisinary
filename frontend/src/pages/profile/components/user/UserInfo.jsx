import { Person } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../../../common/Loading";
import NavigationWrap from "../../../../common/NavigationWrap";
import AuthContext from "../../../../setup/app-context-menager/AuthContext";
import { useLayoutData } from "../../hooks/useLayoutData";
import FavoriteCollection from "../collections/FavoriteCollection";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useSmoothScroll from "../../../../utils/useSmoothScroll";

const UserInfo = () => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { userData } = useContext(AuthContext);
  const { layoutData, layoutArr, collections } = useLayoutData();
  const [activeIndex, setActiveIndex] = useState(0);
  const h3Refs = [useRef(null), useRef(null), useRef(null)];
  const params = useParams();
  const queryClient = useQueryClient();

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const url = window.location.href.slice(21);
  const navigationLinks = [
    { url: "/", content: "Home" },
    { url: "/account/profile/collection", content: "Saved Items & Collections" },
    { url: `/profile/${userData?._id}`, content: userData?.nickname },
  ];
  useSmoothScroll();

  const fetchUserData = async () => {
    const res = await fetch(`/api/auth/${params.profileId}/getUserId`);
    const data = await res.json();

    layoutData(data.collections);

    return data;
  };

  const { data: inspectUserData = {}, isFetching } = useQuery(["user-info"], fetchUserData, {
    enabled: !!userData,
    refetchOnMount: "always",
  });

  useEffect(() => {
    return () => {
      queryClient.setQueryData(["user-info"], {});
    };
  }, [queryClient]);

  return (
    <Section>
      {Object.keys(inspectUserData).length === 0 && !isImageLoaded ? (
        <Loading className="loading" />
      ) : (
        <>
          <ProfileWrap>
            {inspectUserData?.picture?.image && (
              <img src={inspectUserData.picture.image} onLoad={() => setIsImageLoaded(true)} alt="avatar" />
            )}
            {!inspectUserData.picture?.image && <Person className="profile-svg" />}
            <div className="profile-info">
              <NavigationWrap links={navigationLinks} />
              <h1>{inspectUserData?.nickname}</h1>
              <p>{inspectUserData?.tagline} </p>
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
              {layoutData.length > 0 && collections?.length > 0 && (
                <div className="collection-flex">
                  <h3> {collections?.length} Collections </h3>
                  {collections && (
                    <div className="collection-wrap">
                      {activeIndex === 0 &&
                        collections
                          ?.filter((collection) => !collection.private)
                          .map((collection, id) => (
                            <FavoriteCollection
                              key={id}
                              collection={collection}
                              layoutArr={layoutArr[id]}
                              onClick={() => {
                                navigate(
                                  collection.collName === "All Saved Items"
                                    ? `${url}/collection/all-saved-items`
                                    : `${url}/collection/${collection._id}`
                                );
                              }}
                            />
                          ))}
                    </div>
                  )}
                </div>
              )}
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

  img {
    width: 330px;
    height: 330px;
  }

  @media (max-width: 910px) {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .profile-info {
    position: relative;
    right: 24px;
    top: -50px;
    width: 100%;
    background-color: #fff;
    max-width: 100%;
    word-break: break-all;
    box-shadow: 0 0.12rem 0.375rem rgb(0 0 0 / 32%);
    border-left: 5px solid #46c5b5;
    min-height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 24px 28px;

    & > h1 {
      font-size: 2.2rem;
      margin-top: 16px;
    }

    @media (max-width: 910px) {
      top: 0;
      right: 0;
      margin: 0 auto;
      width: 640px;
    }
  }

  .profile-svg {
    color: white;
    background-color: var(--red-color);
    width: 320px;
    height: 320px;
    pointer-events: none;
  }
`;

const ProfileContent = styled.div`
  margin: 18px 0;

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
      width: 100%;
      margin: 50px 0 12px 0;

      h5 {
        width: max-content;
        line-height: 30px;
        color: var(--grey-color);
        cursor: pointer;
        font-weight: 800;
        font-size: 14px;
        padding: 0 16px;

        &:hover {
          color: var(--main-color);
          border-bottom: 3px solid var(--red-color);
        }
      }
    }

    .selected {
      color: var(--grey-color) !important;
      border-bottom: 3px solid var(--red-color);
      color: black;
    }

    .collection-flex {
      & > h3 {
        font-size: 18px !important;
        margin: 50px 0 30px 0;
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
  width: 1240px;

  .loading {
    transform: translate(0, -420px);
  }

  @media (max-width: 1240px) {
    padding: 0 22px;
  }
`;

export default UserInfo;

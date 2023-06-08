import React, { useEffect, useContext, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import List from "../../pages/profile/components/List";
import GlobalContext from "../../setup/app-context-menager/GlobalContext";
import axios from "axios";
import ProfileGreet from "./components/ProfileGreet";
import { useUser } from "../../setup/auth/useAuth";
import Footer from "../Footer";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../common/Loading";

const MyProfile = ({ listContent, staticList, setLists }) => {
  const params = useParams();
  const location = useLocation();
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const {
    arrayOfRecipeNames,
    setArrayOfRecipeNames,
    collectionId,
    collectionParams,
  } = useContext(GlobalContext);
  const { getUserData } = useUser();

  const {
    data: userData,
    isRefetching,
    isLoading,
  } = useQuery(["user-data", user?.email], getUserData, {
    enabled: !!user,
    refetchOnMount:
      (location.pathname === "/account/profile/collection" && "always") ||
      (location.pathname === "/account/profile/reviews" && "always"),
  });

  useEffect(() => {
    if (
      arrayOfRecipeNames.length !== 0 &&
      location.pathname !== "/account/profile/saved-items"
    ) {
      handleDeletionOfRecipes();
      setArrayOfRecipeNames([]);
    }
  }, [location.pathname]);

  const handleDeletionOfRecipes = async () => {
    const recipeNames = {
      titles: arrayOfRecipeNames,
      collectionId: collectionParams === "saved-items" ? "" : collectionId,
    };
    await axios.post(`/api/auth/${userData?.email}/deleteFavs`, recipeNames);
  };

  useEffect(() => {
    if (params.id) {
      const comp = {
        id: listContent.length,
        component: "SavedItems",
        route: `/collection/${params.id}`,
        selected: true,
      };

      if (
        !listContent.map((list) => list.route === comp.route).includes(true)
      ) {
        setLists([...listContent, comp]);
      }
    }
  });

  return (
    <Wrapper>
      <Container>
        <div className="profile">
          {!userData && !loading ? (
            <div className="h4-div">
              <h4>Loading...</h4>
            </div>
          ) : (
            <ProfileGreet onLoad={() => setLoading(true)} />
          )}
          <div className="profile-info">
            <ul>
              {listContent
                .filter((list) => list.text && list)
                .map((list, id) => (
                  <CustomLink to={"/account/profile" + list.route} key={id}>
                    <List
                      className={list.selected ? "selected" : ""}
                      list={list}
                    />
                  </CustomLink>
                ))}
            </ul>
          </div>
        </div>
        <div className="components">
          {listContent.map((list) => {
            if (list.selected) {
              const Component = staticList[list.component];
              if (isRefetching && isLoading) {
                // if (!isRefetching && !isLoading) {
                return (
                  <Component
                    key={list.id}
                    userData={userData}
                    isRefetching={isRefetching}
                  />
                );
              } else {
                return <Loading key={list.id} className="loading" style={{width: '4.2em', height: '4.2em', border: '0.5em solid white'}} />;
              }
            }
          })}
        </div>
      </Container>
      <Footer />
    </Wrapper>
  );
};

const CustomLink = styled(NavLink)`
  text-decoration: none;
  color: var(--main-color);

  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const Wrapper = styled.section`
  position: relative;
  background-color: #f2f2f2;
  min-height: 80vh;

  .line-break {
    margin: 32px 0;
  }
`;

const Container = styled.div`
  display: flex;
  width: 1240px;
  max-width: 100%;
  margin: 0 auto;
  padding: 200px 0 60px 0;

  @media (max-width: 1120px) {
    margin-top: -70px;
  }

  @media (max-width: 1270px) {
    padding: 200px 36px 60px 36px;
  }

  .loading {
    transform: translate(0, -36%);
  }

  .components {
    position: relative;
    background-color: #fff;
    width: 100%;
    word-break: break-all;
    padding: 24px;
  }

  .profile {
    min-width: 260px;
    height: 100%;
    background-color: #fff;
    margin-right: 14px;

    .h4-div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 22px 0;

      h4 {
        font-size: 16px;
      }
    }
  }

  .profile-info {
    background-color: #fff;
    padding-top: 12px;

    ul {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
    }

    .selected {
      border-left: 3px solid var(--red-color);
      font-weight: bold;
      color: var(--red-color);
    }
  }
`;

export default MyProfile;

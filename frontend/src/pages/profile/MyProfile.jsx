import styled from "styled-components";
import {
  NavLink,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import React, { useEffect, useContext, useState, Component, memo } from "react";
import List from "../../pages/profile/components/List";
import GlobalContext from "../../setup/app-context-menager/GlobalContext";
import AuthContext from "../../setup/app-context-menager/AuthContext";
import axios from "axios";
import ProfileGreet from "./components/ProfileGreet";
import { useUser } from "../../setup/auth/useAuth";
import Footer from "../Footer";

const MyProfile = ({ listContent, staticList, setLists }) => {
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const {
    arrayOfRecipeNames,
    setArrayOfRecipeNames,
    collectionId,
    collectionParams,
  } = useContext(GlobalContext);
  const { userData } = useContext(AuthContext);
  const { refetch } = useUser();

  useEffect(() => {
    if (
      arrayOfRecipeNames.length !== 0 &&
      location.pathname !== "/account/profile/saved-items"
    ) {
      handleDeletionOfRecipes();
      setArrayOfRecipeNames([]);
      refetch();
    }
  }, [location.pathname]);

  const handleDeletionOfRecipes = async () => {
    const recipeNames = {
      titles: arrayOfRecipeNames,
      collectionId: collectionParams === "saved-items" ? "" : collectionId,
    };
    axios.post(`/api/auth/${userData?.email}/deleteFavs`, recipeNames);
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

              return <Component key={list.id} data={userData} />;
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
  min-height: 70vh;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 200px 0;
  display: flex;
  width: 1240px;
  max-width: 100%;

  .loading {
    transform: translate(0, -10px) scale(1.2);
  }

  @media screen and (max-width: 1250px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  .components {
    position: relative;
    background-color: #fff;
    width: 100%;
    word-break: break-all;
    padding: 13px 26px 0 13px;
  }

  .profile {
    min-width: 260px;
    height: 100%;
    margin-right: 25px;
    background-color: #fff;

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

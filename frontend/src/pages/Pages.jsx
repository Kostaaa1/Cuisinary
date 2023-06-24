import Home from './home/Home';
import Recipe from './recipe/Recipe';
import AddRecipe from './profile/components/add-recipe/AddRecipe';
import Searched from './searched/Searched';
import MyProfile from './profile/MyProfile';
import Category from './category/Category';
import PasswordForm from './profile/components/change-password/PasswordForm';
import Success from './profile/components/change-password/Success';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoutes from '../setup/auth/ProtectedRoutes';
import { profileLists, StaticList } from '../utils/constants/constants-pages';
import UserInfo from './profile/components/user/UserInfo';
import UserCollectionPage from './profile/components/user/UserCollectionPage';
import Header from './navbar/Header';
import PersonalRecipe from './profile/components/personal-recipe/PersonalRecipe';
import Footer from './Footer';
import styled from 'styled-components';

const Pages = () => {
  const location = useLocation();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const route = location.pathname.slice(16);
    const currentComponent = lists.filter((list) => list.selected);

    if (currentComponent.route !== route) {
      setLists(
        profileLists.map((list) =>
          list.route === route
            ? { ...list, selected: true }
            : { ...list, selected: false }
        )
      );
    }
  }, [location.pathname]);

  const shouldRenderHeader = !(
    location.pathname === '/account/forgot-password-reset' ||
    location.pathname === '/account/forgot-password-success'
  );

  return (
    <>
      {shouldRenderHeader && <Header />}
      <Main>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/searched/:search" element={<Searched />} />
          <Route path="/category/:recipe" element={<Category />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/account/add-recipe" element={<AddRecipe />} />
            <Route
              path="/account/forgot-password-reset"
              element={<PasswordForm />}
              showHeader={false}
            />
            <Route
              path="/account/forgot-password-success"
              element={<Success />}
              showHeader={false}
            />
            <Route
              path="/account/profile/"
              element={
                <MyProfile
                  listContent={lists}
                  staticList={StaticList}
                  setLists={setLists}
                />
              }
            />
            <Route
              path="/account/profile/:name/"
              element={
                <MyProfile
                  listContent={lists}
                  staticList={StaticList}
                  setLists={setLists}
                />
              }
            />
            <Route
              path="/account/profile/:name/:id"
              element={
                <MyProfile
                  listContent={lists}
                  staticList={StaticList}
                  setLists={setLists}
                />
              }
            />
            <Route
              path="/account/:userId/recipe/:id"
              element={<PersonalRecipe />}
            />
            <Route path="/profile/:profileId" element={<UserInfo />} />
            <Route
              path="/profile/:profileId/collection/:collectionId"
              element={<UserCollectionPage />}
            />
          </Route>
        </Routes>
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  position: relative;
  min-height: calc(100vh - 299px);
  /* flex-grow: 1; */
  /* min-height: 60vh; */
`;

export default Pages;

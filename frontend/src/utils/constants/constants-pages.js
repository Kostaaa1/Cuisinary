import PersonalInfo from '../../pages/profile/components/PersonalInfo';
import PublicProfile from '../../pages/profile/components/PublicProfile';
import ChangePassword from '../../pages/profile/components/change-password/ChangePassword';
import PersonalRecipes from '../../pages/profile/components/PersonalRecipes';
import Collections from '../../pages/profile/components/collections/Collections';
import SavedItems from '../../pages/profile/components/saved-items/SavedItems';
import Reviews from '../../pages/profile/components/Reviews';

export const profileLists = [
  {
    id: 0,
    text: 'Personal Info',
    selected: false,
    component: 'PersonalInfo',
    route: '',
  },
  {
    id: 1,
    text: 'Public Profile Settings',
    selected: false,
    component: 'PublicProfile',
    route: '/public-profile',
  },
  {
    id: 2,
    text: 'Change Password',
    selected: false,
    component: 'ChangePassword',
    route: '/change-password',
  },
  {
    id: 3,
    text: 'Saved Items & Collections',
    icon: 'FaHeart',
    selected: false,
    component: 'Collections',
    route: '/collection',
  },

  {
    id: 4,
    text: 'Personal Recipes',
    selected: false,
    icon: 'FaUtensilSpoon',
    component: 'PersonalRecipes',
    route: '/recipes',
  },
  {
    id: 5,
    text: `Reviews`,
    selected: false,
    icon: 'MdReviews',
    component: 'Reviews',
    route: '/reviews',
  },
  {
    id: 6,
    component: 'SavedItems',
    route: '/saved-items',
  },
];

export const StaticList = {
  PersonalInfo,
  PublicProfile,
  ChangePassword,
  PersonalRecipes,
  Collections,
  Reviews,
  SavedItems,
};

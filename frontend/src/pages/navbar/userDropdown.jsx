import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useDropdown() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([
    {
      visibility: false,
      name: 'DINNERS',
      categories: [
        { list: 'Quick & Easy', query: 'quick' },
        { list: 'Main Dishes', query: 'main' },
        { list: 'Soups', query: 'soup' },
        { list: 'Stews', query: 'stew' },
        { list: '30-Minute Meals', query: 'minute' },
      ],
    },
    {
      visibility: false,
      name: 'MEALS',
      categories: [
        { list: 'Breakfast', query: 'breakfast' },
        { list: 'Lunch', query: 'lunch' },
        { list: 'Healthy', query: 'healthy' },
        { list: 'Salads', query: 'salad' },
        { list: 'Bread', query: 'bread' },
        { list: 'Desserts', query: 'dessert' },
      ],
    },
    {
      visibility: false,
      name: 'INGREDIENTS',
      categories: [
        { list: 'Chicken', query: 'chicken' },
        { list: 'Beef', query: 'beef' },
        { list: 'Pork', query: 'pork' },
        { list: 'Pasta', query: 'pasta' },
        { list: 'Fruits', query: 'Fruits' },
        { list: 'Vegetables', query: 'vegetables' },
      ],
    },
    {
      visibility: false,
      name: 'CUISINES',
      categories: [
        { list: 'Mexican', query: 'mexican' },
        { list: 'Italian', query: 'italian' },
        { list: 'Chinese', query: 'chinese' },
        { list: 'Indian', query: 'indian' },
        { list: 'German', query: 'german' },
        { list: 'Greek', query: 'greek' },
        { list: 'Filipino', query: 'filipino' },
        { list: 'Japanese', query: 'japenese' },
      ],
    },
    {
      visibility: false,
      name: 'OCCASIONS',
      categories: [
        { list: 'Christmas', query: 'christmas' },
        { list: 'Thanksgiving', query: 'thanksgiving' },
        { list: 'Easter', query: 'easter' },
      ],
    },
  ]);

  const categoryNavigation = query => {
    navigate('/category/' + query);
  };

  const hanldeDropDownEnter = index => {
    setCategoryData(
      categoryData.map((category, i) =>
        i === index
          ? { ...categoryData[index], visibility: true }
          : { ...category, visibility: false }
      )
    );
  };

  const hanldeDropDownLeave = index => {
    setCategoryData(
      categoryData.map((category, i) =>
        i === index
          ? { ...categoryData[index], visibility: false }
          : { ...category, visibility: false }
      )
    );
  };

  return {
    categoryData,
    hanldeDropDownEnter,
    hanldeDropDownLeave,
    categoryNavigation,
  };
}

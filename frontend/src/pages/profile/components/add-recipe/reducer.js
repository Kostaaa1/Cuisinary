import { arrayMove } from '@dnd-kit/sortable';

export const initialIngredients = [
  { value: '', placeholder: 'e.g 1 cups flour', id: '1' },
  { value: '', placeholder: 'e.g 2 cups flour', id: '2' },
  { value: '', placeholder: 'e.g 3 cups flour', id: '3' },
];

export const initialDirections = [
  { value: '', placeholder: 'e.g Preheat oven to 350 degrees...', id: '1' },
  {
    value: '',
    placeholder: 'e.g Combine all dry ingredients in a large bowl...',
    id: '2',
  },
  {
    value: '',
    placeholder: 'e.g Pour into greased trays and bake for 15-20 minutes...',
    id: '3',
  },
];

export const ingredientReducer = (state, action) => {
  const newId =
    state.length > 0 ? (Number(state[state.length - 1].id) + 1).toString() : '1';

  switch (action.type) {
    case 'ADD_INGREDIENT':
      return [
        ...state,
        {
          value: '',
          placeholder: 'Add another ingredient',
          id: newId,
        },
      ];
    case 'REMOVE_INGREDIENT':
      if (state.length === 1) return state;
      return state.filter((_, index) => index !== action.id);
    case 'SORT_INGREDIENTS':
      return arrayMove(state, action.indexOfActive, action.indexOfOver);
    case 'CHANGE_VALUE':
      return state.map((input) =>
        input.id === action.id ? { ...input, value: action.value } : input
      );
    default:
      return state;
  }
};

export const directionReducer = (state, action) => {
  const newId =
    state.length > 0 ? (Number(state[state.length - 1].id) + 1).toString() : '1';

  switch (action.type) {
    case 'ADD_DIRECTION':
      return [
        ...state,
        {
          value: '',
          placeholder: 'Add another step',
          id: newId,
        },
      ];
    case 'REMOVE_DIRECTION':
      if (state.length === 1) return state;
      return state.filter((_, index) => index !== action.id);
    case 'SORT_DIRECTIONS':
      return arrayMove(state, action.indexOfActive, action.indexOfOver);
    case 'CHANGE_VALUE':
      return state.map((input) =>
        input.id === action.id ? { ...input, value: action.value } : input
      );
    // default:
    //   return state;
  }
};

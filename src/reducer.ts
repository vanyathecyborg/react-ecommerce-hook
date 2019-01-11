// https://github.com/lodash/lodash/issues/3542
import omit = require('lodash.omit');
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from './actionTypes';

export const initialState = {
  addedIds: [],
  quantityById: {},
};

type TypeAddedIds = number[];
interface IQuantityById {
  [key: string]: number;
}

interface IStateType {
  addedIds: TypeAddedIds;
  quantityById: IQuantityById;
}

const addedIds = (state = initialState.addedIds, action): TypeAddedIds => {
  const {
    payload: { id },
  } = action;

  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(id) !== -1) {
        return state;
      }

      return [...state, id];
    case REMOVE_FROM_CART:
      return [...state].filter(item => item !== id);

    default:
      return state;
  }
};

const quantityById = (
  state = initialState.quantityById,
  action
): IQuantityById => {
  const {
    payload: { id, isUnique },
  } = action;

  const handleQuantity = (add = true) => {
    const amount = add ? +1 : -1;

    return {
      ...state,
      [id]: (state[id] || 0) + amount,
    };
  };

  switch (action.type) {
    case ADD_TO_CART:
      if (isUnique === true) {
        return {
          ...state,
          [id]: 1,
        };
      }

      return handleQuantity();

    case REMOVE_FROM_CART:
      return omit(state, id);
    case INCREASE_QUANTITY:
      return handleQuantity();
    case DECREASE_QUANTITY:
      return handleQuantity(false);
    default:
      return state;
  }
};

export const cartReducer = (state = initialState, action): IStateType => {
  switch (action.type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case INCREASE_QUANTITY:
    case DECREASE_QUANTITY:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      };
    default:
      return state;
  }
};

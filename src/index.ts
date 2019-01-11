import { useEffect, useReducer } from 'react';
import { action } from 'typesafe-actions';
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from './actionTypes';
import { cartReducer, initialState } from './reducer';
import { createStorageMethods } from './storageMethods';
import { IAddToCartPayload, IIdPayload } from './types';

const useCart = () => {
  const { set, get } = createStorageMethods('cart');

  const initialReducerState = get() || initialState;

  const [state, dispatch] = useReducer(cartReducer, initialReducerState);

  useEffect(
    () => {
      set(state);
    },
    [state]
  );

  return {
    state,
    addToCart: ({ id, isUnique = false }: IAddToCartPayload) =>
      dispatch(action(ADD_TO_CART, { id, isUnique })),
    removeFromCart: ({ id }: IIdPayload) =>
      dispatch(action(REMOVE_FROM_CART, { id })),
    increaseQuantity: ({ id }: IIdPayload) =>
      dispatch(action(INCREASE_QUANTITY, { id })),
    decreaseQuantity: ({ id }: IIdPayload) => {
      const currentQuantity = state.quantityById[id];

      if (currentQuantity === 1) {
        return dispatch(action(REMOVE_FROM_CART, { id }));
      }

      return dispatch(action(DECREASE_QUANTITY, { id }));
    },
  };
};

export default useCart;

import { cartReducer, initialState } from '../src/reducer';
import * as actions from '../src/actionTypes';

describe('cart reducer', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it('should add item to cart', () => {
    const createdAction = {
      type: actions.ADD_TO_CART,
      payload: { id: 1 },
    };
    expect(cartReducer(initialState, createdAction)).toEqual({
      ...initialState,
      addedIds: [1],
      quantityById: { 1: 1 },
    });
  });

  it('should add non-unique item to cart twice', () => {
    const createdAction = {
      type: actions.ADD_TO_CART,
      payload: { id: 1 },
    };

    expect(
      cartReducer(
        {
          addedIds: [1],
          quantityById: { 1: 1 },
        },
        createdAction
      )
    ).toEqual({
      ...initialState,
      addedIds: [1],
      quantityById: { 1: 2 },
    });
  });

  it('should add unique item to cart twice', () => {
    const createdAction = {
      type: actions.ADD_TO_CART,
      payload: { id: 1 },
    };

    expect(
      cartReducer(
        {
          addedIds: [1],
          quantityById: { 1: 1 },
        },
        createdAction
      )
    ).toEqual({
      ...initialState,
      addedIds: [1],
      quantityById: { 1: 2 },
    });
  });

  it('should remove item from cart', () => {
    const createAction = (add = true) => ({
      type: add ? actions.ADD_TO_CART : actions.REMOVE_FROM_CART,
      payload: { id: 1 },
    });

    const state = cartReducer(
      {
        addedIds: [1],
        quantityById: { 1: 1 },
      },
      createAction()
    );
    expect(cartReducer(state, createAction(false))).toEqual({
      ...initialState,
      addedIds: [],
      quantityById: {},
    });
  });

  it('should increase items quantity, then decrease it', () => {
    const createAction = (increase = true) => ({
      type: increase ? actions.INCREASE_QUANTITY : actions.DECREASE_QUANTITY,
      payload: { id: 1 },
    });

    const state = cartReducer(
      {
        addedIds: [1],
        quantityById: { 1: 1 },
      },
      createAction()
    ); // { 1: 2 }

    expect(cartReducer(state, createAction(false))).toEqual({
      ...initialState,
      addedIds: [1],
      quantityById: { 1: 1 },
    });
  });
});

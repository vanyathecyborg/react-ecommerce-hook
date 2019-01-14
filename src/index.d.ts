// Type definitions for react-ecommerce-hook
// Definitions by: vanyaistank https://github.com/vanyaistank

export = useCart;

declare function useCart(): EcommerceHook.IEcommerceHookReturn;

declare namespace EcommerceHook {
  type TypeAddedIds = number[];

  interface IQuantityById {
    [key: string]: number;
  }

  export interface ICartState {
    addedIds: TypeAddedIds;
    quantityById: IQuantityById;
  }

  export interface IAddToCartPayload {
    id: number;
    isUnique?: boolean;
  }

  export interface IIdPayload {
    id: number;
  }

  type addToCartAction = {
    type: 'ADD_TO_CART';
    payload: IAddToCartPayload;
  };

  type removeFromCartAction = {
    type: 'REMOVE_FROM_CART';
    payload: IIdPayload;
  };

  type increaseQuantityAction = {
    type: 'INCREASE_QUANTITY';
    payload: IIdPayload;
  };

  type decreaseQuantityAction = {
    type: 'DECREASE_QUANTITY';
    payload: IIdPayload;
  };

  export interface IEcommerceHookReturn {
    state: ICartState;
    addToCart: ({  }: IAddToCartPayload) => addToCartAction;
    removeFromCart: ({  }: IIdPayload) => removeFromCartAction;
    increaseQuantity: ({  }: IIdPayload) => increaseQuantityAction;
    decreaseQuantity: ({  }: IIdPayload) => decreaseQuantityAction;
  }
}

# `react-ecommerce-hook`

> A basic shopping cart react hook, it uses localStorage to persist data

## Install

```sh
yarn add react-ecommerce-hook
```

## Examples
### Product
```jsx harmony
import React from 'react';
import { useCart } from 'react-ecommerce-hook';

export const Product = ({ id }) => {
  	const { 
  	  addToCart, 
  	  removeFromCart, 
  	  increaseQuantity, 
  	  decreaseQuantity 
  	} = useCart();
  	
  	return (
  	  <div>
  	    <h1>Awesome Product</h1>
  	    {/* if item is unique, its maximum quantity is 1 */}
  	    <button onClick={() => addToCart({ id, isUnique: true })}>
  	      Add To Cart Unique Product
  	    </button>
  	    <button onClick={() => addToCart({ id })}>
  	      Add To Cart
        </button>
        <button onClick={() => removeFromCart({ id })}>
          Remove From Cart
        </button>
        <button onClick={() => increaseQuantity({ id })}>
          Increase Quantity
        </button>
        <button onClick={() => decreaseQuantity({ id })}>
          Decrease Quantity
        </button>
  	  </div>
  	);
}
```
### Cart
```jsx harmony
import React from 'react';
import { useCart } from 'react-ecommerce-hook';

export const Cart = () => {
  const { 
    state: {
      addedIds, 
      quantityById,
    },
  } = useCart();
  
  return (
    <div>
      {addedIds.map(id => (
        <div key={id}>
          <h1>Product #{id}</h1>
          <span>Quantity: {quantityById[id]}</span>
        </div>
      ))}
    </div>
  );
}
```

## API
```typescript
interface IEcommerceHookReturn {
    state: {
      addedIds: number[];
      quantityById: {
        [key: string]: number;
      }
    };
    addToCart: ({ id, isUnique }: { id: number; isUnique?: boolean }) => addToCartAction;
    removeFromCart: ({ id }: { id: number }) => removeFromCartAction;
    increaseQuantity: ({ id }: { id: number }) => increaseQuantityAction;
    decreaseQuantity: ({ id }: { id: number }) => decreaseQuantityAction;
}
```

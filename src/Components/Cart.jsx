import React,{useReducer, createContext, useEffect} from "react";
import "./Cart.css";
import {products} from './Products'
import ContextCart from "./ContextCart";
import {reducer} from './Reducer'

export const CartContext = createContext()

const initialState = {
  item:products,
  totalAmount:0,
  totalItem:0
}


const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState)


  const removeItem = (id) =>{
      return dispatch({
        type: 'REMOVE_ITEM',
        payload: id
      })
  }

  const clearCart = () =>{
    return dispatch ({
      type: 'CLEAR_CART'
    })
  }

  const increment = (id) =>{
    return dispatch({
      type: 'INCREMENT',
     payload: id
    })
  }

  const decrement = (id) =>{
    return dispatch({
      type: 'DECREMENT',
     payload: id
    })
  }

  useEffect(() => {
    dispatch({
      type: 'CART_ITEM',
      
    })
    console.log('hello world');
  }, [state.item])
  
  return (
    <>
    <CartContext.Provider value={{...state, removeItem, clearCart,decrement, increment}}>
      <ContextCart/>
    </CartContext.Provider>
      
    </>
  );
};

export default Cart;

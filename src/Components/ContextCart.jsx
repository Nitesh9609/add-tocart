import React, { useState, useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Item from "./Item";
import { CartContext } from "./Cart";

const ContextCart = () => {
  const { item, clearCart, totalItem, totalAmount } = useContext(CartContext);

  if (item.length === 0) {
    return (
      <>
        <header>
          <div className="continue-shopping">
            <img src="./images/arrow.png" alt="cart" className="arrow-icon" />
            <h3>continue shopping</h3>
          </div>

          <div className="cart-icon">
            <img src="./images/cart.png" alt="cart" />
            <p>0</p>
          </div>
        </header>
        <section className="main-cart-section">
        <h1>shopping Cart</h1>
          <p className="total-items">
            you have <span className="total-item-count">0</span> in your
            shopping list
          </p>
        </section>
      </>
    );
  }

  const loadScript = (src) =>{
    return new Promise((resolve)=>{
      const script = document.createElement('script')
      script.src = src

      script.onload = () =>{
        resolve(true)
      }

      script.onerror = () =>{
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }

  const dispalyRazarpay = async(totalAmount) =>{
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if(!res) {
        alert('you are offline....')
        return
      }

      const options = {
        key: 'rzp_test_q4eCdtbRPhS0so',
        currency:'INR',
        amount: totalAmount * 100,
        description: 'Nitesh Cart',

        handler: function (response){
          alert(response.razorpay.razorpay_payment_id)
          alert('payment successfully')
        },

        prefill: {
          name:'Nitesh Cart'
        }

      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
  }

  return (
    <>
      <header>
        <div className="continue-shopping">
          <img src="./images/arrow.png" alt="cart" className="arrow-icon" />
          <h3>continue shopping</h3>
        </div>

        <div className="cart-icon">
          <img src="./images/cart.png" alt="cart" />
          <p>{totalItem}</p>
        </div>
      </header>
      <section className="main-cart-section">
        <h1>shopping Cart</h1>
        <p className="total-items">
          you have <span className="total-item-count">{totalItem}</span> in your shopping
          list
        </p>
        <div className="cart-items">
          <div className="cart-items-container">
            <Scrollbars>
              {item.map((curr) => {
                return <Item data={curr} />;
              })}
            </Scrollbars>
          </div>
        </div>

        <div className="card-total">
          <h3>
            Cart Total : <span>&#x20b9; {totalAmount}</span>
          </h3>
          <button onClick={() => dispalyRazarpay(totalAmount)}> CHECKOUT</button>
          <br />
          <button onClick={clearCart}>CLEAR CART</button>
        </div>
      </section>
    </>
  );
};

export default ContextCart;

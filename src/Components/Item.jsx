import React,{useContext} from "react";
import { CartContext } from "./Cart";

const Item = ({data:{title, description,id,price,quantity,img}}) => {
  const {removeItem, increment, decrement} = useContext(CartContext)
  return (
    <>
      <div className="items-info">
        <div className="product-img">
          <img
            src={img}
            alt="product"
          />
        </div>
        <div className="title">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="add-minus-quantity">
          <i class="fa-solid fa-minus minus" onClick={() => decrement(id)}></i>
          <input type="text" placeholder={quantity} />
          <i class="fa-solid fa-plus add" onClick={() => increment(id)}></i>
        </div>
        <div className="price">
          <h3>&#x20b9; {price}</h3>
        </div>
        <div className="remove-item">
          <i class="fa-solid fa-trash remove" onClick={() => removeItem(id)}></i>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Item;

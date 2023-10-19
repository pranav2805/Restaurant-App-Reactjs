import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.items;
  console.log("cartItems inside cart component", cartItems);
  const mergedResult = {};
  cartItems.forEach((item) => {
    if (!mergedResult[item.id]) {
      mergedResult[item.id] = { ...item };
    } else {
      mergedResult[item.id].quantity =
        Number(mergedResult[item.id].quantity) + Number(item.quantity);
    }
  });

  const mergedArray = Object.values(mergedResult);

  const cartItemsUL = (
    <ul className={classes["cart-items"]}>
      {mergedArray.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
        />
      ))}
    </ul>
  );

  let totalPrice = 0;
  cartItems.forEach(
    (item) => (totalPrice += Number(item.price) * Number(item.quantity))
  );
  totalPrice = totalPrice.toFixed(2);
  return (
    <Modal onClose={props.onHideCart}>
      {cartItemsUL}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

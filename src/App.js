import "./App.css";
import { useEffect, useState } from "react";
import bakeryData from "./assets/bakery-data.json";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [data, setData] = useState(bakeryData);

  const [cart, setCart] = useState([]);
  const [cartSum, setCartSum] = useState(0);

  const loadData = () => {
    setData(bakeryData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addToCart = (name, price) => {
    setCart((prev_cart) => [...prev_cart, name]);
    setCartSum(cartSum + price);
  };

  const buildElements = () => {
    const jsxlist = bakeryData.map((item, index) => (
      <div class="BakeryItem">
        <h3 class="BakeryHeading">
          Bakery Item {index}: {item.name} (${item.price})
        </h3>
        <p>{item.description}</p>
        <button
          onClick={(e) => {
            addToCart(item.name, item.price);
          }}
        >
          Add to Cart
        </button>
      </div>
    ));

    return jsxlist;
  };

  const showCart = () => {
    if (cart.length === 0) {
      console.log("cart is empty");
      return <p>Cart is empty</p>;
    }

    const jsxlist = cart.map((name, index) => {
      return <p key={index}>{name}</p>;
    });
    return jsxlist;
  };

  return (
    <div className="App">
      <div>
        <h1>My Bakery</h1>
        {buildElements()}
      </div>
      <div>
        <h2>Cart</h2>
        <p>Items in cart: {showCart()}</p>
        <h4>Total Price: {cartSum}</h4>
      </div>
    </div>
  );
}

export default App;

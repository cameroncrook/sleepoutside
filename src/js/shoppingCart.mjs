import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity ? item.quantity : 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
  }
  
  export default class ShoppingCart {
    constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
    }
    renderCartContents() {
      const cartItems = getLocalStorage(this.key);
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));

      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      
      if (cartItems.length > 0) {
        let cartTotal = 0;

        cartItems.forEach(item => {
          cartTotal += item.FinalPrice;
        });

        let formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD', 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        });

        const total = formatter.format(cartTotal);
        
        let totalElement = document.getElementById('cart-total');
        totalElement.textContent += total;
        totalElement.className = "";
      } 
    }
  }
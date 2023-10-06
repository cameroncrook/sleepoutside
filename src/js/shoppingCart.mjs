import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
    <p class="cart-card__quantity">qty: <input type="button" id="add-btn" value="+"> <span id="quantity-amount">${item.quantity ? item.quantity : 1}</span> <input type="button" id="subtract-btn" value="-"><input data-product-id="${item.Id}" type="button" value="Save" id="save-btn"></p>
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
        // Change Qunatities
        const cartProducts = document.querySelectorAll('.cart-card');
        cartProducts.forEach(item => {
          let quantityNum = item.querySelector('#quantity-amount');
          item.querySelector('#add-btn').addEventListener('click', () => {
            let intQuantity = parseInt(quantityNum.textContent);

            quantityNum.textContent = intQuantity + 1;
          })
          item.querySelector('#subtract-btn').addEventListener('click', () => {
            let intQuantity = parseInt(quantityNum.textContent);

            quantityNum.textContent = intQuantity - 1;
          })
          item.querySelector('#save-btn').addEventListener('click', () => {
            const id = item.querySelector('#save-btn').dataset.productId;
            const value = parseInt(quantityNum.textContent);
            this.handleSave(id, value);
          })
        })
        

        // Display Cart Total
        const total = this.getCartTotal(cartItems);
        let totalElement = document.getElementById('cart-total');
        totalElement.textContent = `Total: ${total}`;
        totalElement.className = "";

        document.getElementById('checkout-btn').classList.remove('d-none');
      } 
    }
    handleSave(id, value) {
      let cart = getLocalStorage('so-cart');

      cart.forEach(product => {
        if (product.Id == id) {
          product.quantity = value;
          product.FinalPrice = parseInt(product.ListPrice) * value;
        }
      })

      setLocalStorage('so-cart', cart);

      document.querySelector(this.parentSelector).innerHTML = "";
      document.getElementById('cart-total').textContent = "";
      this.renderCartContents();
    }
    checkout() {
      const total = this.getCartTotal();
      const itemsCount = this.getCartCount();
      const tax = .06;
      const taxPrice = total * tax;

      let shippingPrice = 0;
      if (itemsCount > 0) {
        shippingPrice = 10 + (2 * (itemsCount - 1));
      }

      const finalPrice = taxPrice + shippingPrice;
    }
    getCartTotal(cartItems) {
      let cartTotal = 0;

      if (cartItems.length > 0) {
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
  
        return total
      } else {
        return
      }
      
    }
    getCartCount() {
      const cartItems = getLocalStorage(this.key);
      if (cartItems) {
        const cartCount = cartItems.length;

        return cartCount
      } else {
        return
      }
    }
  }
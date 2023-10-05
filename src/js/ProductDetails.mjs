import { doc } from "prettier";
import { setLocalStorage, getLocalStorage, displayCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <div class="quantity">
        <input type="button" id="add-btn" value="+">
        <input id="item-quantity" type="number" value="1" min="1">
        <input type="button" id="subtract-btn" value="-">
      </div>
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    
    // Cart quantity stuff
    const quanityInput = document.getElementById('item-quantity');
    document.getElementById('add-btn').addEventListener("click", function () {
      quanityInput.value = parseInt(quanityInput.value) + 1;
    });
    document.getElementById('subtract-btn').addEventListener("click", function () {
      if (parseInt(quanityInput.value) > 1) {
        quanityInput.value = parseInt(quanityInput.value) - 1;
      }
    });

    function handleAddToCartClick(event) {
      
      this.addToCart();
      
      document.querySelector('#cart-logo').classList.add('wiggling');
    }
    
    document
      .getElementById("addToCart")
      .addEventListener("click", handleAddToCartClick.bind(this));
    
  }
  sayHello() {
    console.log('hello');
  }
  addToCart() {
    // setLocalStorage("so-cart", this.product);
    let soCart = getLocalStorage("so-cart");
    const quantity = parseInt(document.querySelector("#item-quantity").value);
    this.product.quantity = quantity;
    this.product.FinalPrice = this.product.ListPrice * quantity;

    if (soCart === null || !Array.isArray(soCart)) {
      let productStorage = [this.product];

      setLocalStorage("so-cart", productStorage);
    } else {
      soCart.push(this.product);
      setLocalStorage("so-cart", soCart);
    }

    displayCartCount();

    document.getElementById('addToCart').textContent = 'Item Added!';
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}
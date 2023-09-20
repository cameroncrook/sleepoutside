import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

const getCart = () => getLocalStorage("so-cart") || [];

function addProductToCart(product) {
  const cart = getCart();
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);

  // show success message
  const addToCartButton = document.querySelector("#addToCart");

  addToCartButton.innerHTML = "Product Added.";
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

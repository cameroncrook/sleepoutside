import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { displayCartCount, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const prodList = new ProductListing("tents", dataSource, listElement);
prodList.init();

loadHeaderFooter();

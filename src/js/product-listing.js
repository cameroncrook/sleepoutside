import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam('category');

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const prodList = new ProductListing(category, dataSource, listElement);
prodList.init();
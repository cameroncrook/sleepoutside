import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProccess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".orderSummary");
checkout.displaySummary();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    checkout.checkout();
});





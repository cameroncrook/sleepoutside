import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity,
    };
  });
  return simplifiedItems;
}


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.moneyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }
    checkout() {
        const form = document.querySelector('form');

        const jsonData = formDataToJSON(form);
        jsonData.items = packageItems(this.list);
        jsonData.orderTotal = this.orderTotal;
        jsonData.shipping = this.shipping;
        jsonData.tax = this.tax;
        jsonData.orderDate = new Date();

        console.log(jsonData);

        const response = services.checkout(jsonData);
        console.log(response);
    }
    displaySummary() {
        this.getCartItems();
        this.getItemTotal();
        this.calculateTax();
        this.calculateShipping();
        this.calculateOrderTotal();
        this.generateSummary();
    }
    getCartItems() {
        const cartItems = getLocalStorage(this.key);
        if (cartItems) {
            this.list = cartItems;
        }
    }
    getItemTotal() {
        let cartTotal = 0;
        if (this.list.length > 0) {
            this.list.forEach(item => {
              cartTotal += item.FinalPrice;
            });

            this.itemTotal = cartTotal;
      
            // const total = this.moneyFormatter.format(cartTotal);
        }
    }
    calculateTax() {
        const taxPercentage = 0.06;
        const taxPrice = this.itemTotal * taxPercentage;

        this.tax = taxPrice;
    }
    calculateShipping() {
        const itemCount = this.list.length;

        if (itemCount > 0) {
            const shippingPrice = 10 + (2 * (itemCount - 1));

            this.shipping = shippingPrice;
        }
    }
    calculateOrderTotal() {
        const finalPrice = this.tax + this.shipping + this.itemTotal;

        this.orderTotal = finalPrice;
    }
    generateSummary() {

        const template = `<h3>Order Summary</h3><ul>
        <li>
          <label for="cartTotal">Item Subtotal</label>
        </li>
        <p name="cartTotal" class="cartTotal">
        ${this.moneyFormatter.format(this.itemTotal)}
        </p>
   
        <li>
          <label for="shipping">Shipping Cost</label>
        </li>
        <p name="shipping" id="shipping">
        ${this.moneyFormatter.format(this.shipping)}
        </p>
   
        <li>
          <label for="tax">Tax</label>
        </li>
        <p name="tax" id="tax">
        ${this.moneyFormatter.format(this.tax)}
        </p>
   
        <li>
          <label for="orderTotal">Order Total</label>
        </li>
        <p name="orderTotal" id="orderTotal">
        ${this.moneyFormatter.format(this.orderTotal)}
        </p>
      </ul>`;

        document.querySelector(this.outputSelector).innerHTML = template;
    }
}
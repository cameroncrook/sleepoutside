function productCardTemplate() {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=">
        <img src="" alt="Image of ">
        <h3 class="card__brand"></h3>
        <h2 class="card__name"></h2>
        <p class="product-card__price">$</p>
      </a>
    </li>`
  }

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }

    async init() {
      // our dataSource will return a Promise...so we can use await to resolve it.
      const list = await this.dataSource.getData();
      // render the list - to be completed
      this.renderList(list);
    }
    renderList(list){
        this.listElement.innerHTML = '';
        // const template = productCardTemplate();
        const template = document.querySelector('#product-card-template')
        console.log(template);
        list.forEach((product)=> {
            const clone = template.content.cloneNode(true);
            clone.querySelector('a').href += product.Id;
            clone.querySelector('img').src = product.Image;
            clone.querySelector('.card__brand').innerHTML = product.Brand.Name;
            clone.querySelector('.card__name').innerHTML = product.NameWithoutBrand;
            clone.querySelector('.product-card__price').innerHTML += product.FinalPrice;
            this.listElement.appendChild(clone);

        })

    }
  }
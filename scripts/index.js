window.addEventListener("load", changeAddress);
function changeAddress() {
  window.history.replaceState({}, document.title, "/" + "index.html");
}
const basketSize = document.getElementById("basket_size");
const productsList = document.getElementsByClassName("products_list")[0];
const menuItems = Array.from(document.getElementsByClassName("menu_item"));

let basket = [];

const isBasket= window.location.search.substring(8).split("%20").join(' ').split("%22").join('"');
if (isBasket !== "") {
  basket = JSON.parse(isBasket);
  updateBasketSize(basket);
}

function updateBasketSize(basket) {
  if (basket.length === 1) {
    const size = basket[0].quantity;
    if (size === 1) {
      basketSize.innerHTML = "(1 item)";
    } else {
      basketSize.innerHTML = "(" + size + " items)";
    }
  } else if (basket.length > 1) {
    let size = 0;
    for (let i = 0; i < basket.length; i++) {
      size += basket[i].quantity;
    }
    basketSize.innerHTML = "(" + size + " items)";
  }
}

fetch("./json/books.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.map(item => {
      let product;
      if (item.title === "Harry Potter and the Philosopher's Stone"){
        product = `<div class="product_item" id="item_${data.indexOf(item)}">
          <div onclick="openDetails('Harry Potter and the Philosophers Stone')">
            <img src="${item.image}">
            <h3>${item.title}</h3>
            <h4>${item.author}</h4>
            <h5>${parseFloat(item.price).toFixed(2)} €</h5>
          </div>
          <p class="button_primary" onclick="toBasket('Harry Potter and the Philosophers Stone')">Add to Basket</p>
          <p class="item_filters" style="display:none">${item.filters}</p>
        </div>`;
      } else {
        product = `<div class="product_item"id="item_${data.indexOf(item)}">
          <div onclick="openDetails('${item.title}')">
            <img src="${item.image}">
            <h3>${item.title}</h3>
            <h4>${item.author}</h4>
            <h5>${parseFloat(item.price).toFixed(2)} €</h5>
          </div>
          <p class="button_primary" id="button_${data.indexOf(item)}" onclick="toBasket('${item.title}')">Add to Basket</p>
          <p class="item_filters" style="display:none">${item.filters}</p>
        </div>`;
      }
      productsList.innerHTML += product;
    });
  });

function openDetails(title) {
  const basketContent = JSON.stringify(basket);
  location.href = "./productDetail.html?title=" + title + "?basket=" + basketContent;
}

function toBasket(title) {
  let productToCart = {};
  fetch("./json/books.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    if (title === "Harry Potter and the Philosophers Stone") {
      title = "Harry Potter and the Philosopher's Stone";
    }
    const product = data.filter(item => item.title === title)[0];
    if (basket.filter(item => item.title === product.title).length === 0) {
      if (product !== undefined) {
        productToCart = {
          image: product.image,
          title: product.title,
          author: product.author,
          length: product.length,
          format: product.format,
          price: product.price,
          quantity: 1
        };
        basket = [...basket, productToCart];
      }
    } else {
      let inBasketIndex;
      for (let i = 0; i < basket.length; i++) {
        if (basket[i].title === title) {
          inBasketIndex = i;
          break;
        }
      }
      const oldQuantity = basket[inBasketIndex].quantity;
      const newQuantity = oldQuantity + 1;
      productToCart = {
        image: product.image,
        title: product.title,
        author: product.author,
        length: product.length,
        format: product.format,
        price: product.price,
        quantity: newQuantity
      }
      basket[inBasketIndex] = productToCart;
    }
    updateBasketSize(basket);
  });
}

function goToBasket() {
  const basketContent = JSON.stringify(basket);
  location.href='./cart.html?basket=' + basketContent;
}

menuItems.map(item => item.addEventListener("click", () => serveIndex()));
function serveIndex() {
  const basketContent = JSON.stringify(basket);
  location.href='./index.html?basket=' + basketContent;
}

const checkboxes = Array.from(document.getElementsByTagName("input"));
checkboxes.map(item => item.addEventListener("change", checkFilters));
function checkFilters() {
  const isActive = checkboxes.filter(item => item.checked === true);
  const itemFilters = Array.from(document.getElementsByClassName("item_filters")); 
  if (isActive.length > 0) {
    let itemsActive = [];
    for (let i = 0; i < isActive.length; i++) {
      const filterValue = isActive[i].defaultValue;
      for (let k = 0; k < itemFilters.length; k++) {
        const thisFilters = itemFilters[k].innerHTML.split(",");
        for (let l = 0; l < thisFilters.length; l++) {
          if (filterValue === thisFilters[l]) {
            const index = itemFilters[k].parentElement.id.substring(5);
            itemsActive = [...itemsActive, index];
          }
        }
      }
    }
    const parents = Array.from(document.getElementsByClassName("product_item"));
    for (let i = 0; i < parents.length; i++) {
      const index = parents[i].id.substring(5);
      for (let k = 0; k < itemsActive.length; k++) {
        if (index === itemsActive[k]) {
          break;
        } else if (k === itemsActive.length -1) {
          const hideParent = document.getElementById("item_" + index);
          hideParent.style.display = "none";
        }
      }
    }
  } else {
    const parents = Array.from(document.getElementsByClassName("product_item"));
    parents.map(item => {
      item.style.display = "flex";
    })
  }
}
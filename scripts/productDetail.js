window.addEventListener("load", changeAddress);
function changeAddress() {
  window.history.replaceState({}, document.title, "/" + "productDetail.html");
}
const imageSlot = document.getElementById("productImage");
const titleSlot = document.getElementById("productTitle");
const authorSlot = document.getElementById("productAuthor");
const formatSlot = document.getElementById("productFormat");
const pubDateSlot = document.getElementById("productPubDate");
const languageSlot = document.getElementById("productLanguage");
const lengthSlot = document.getElementById("productLength");
const priceSlot = document.getElementById("productPrice");
const summarySlot = document.getElementById("productSummary");
const related = document.getElementsByClassName("related_products")[0];

let title = window.location.search.substring(7).split("%20").join(' ');
if (title === "Harry Potter and the Philosophers Stone") {
  title = "Harry Potter and the Philosopher's Stone"
} 
fetch("./json/books.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    const product = data.filter(item => item.title === title)[0];
    imageSlot.src = product.image;
    titleSlot.innerHTML = product.title;
    authorSlot.innerHTML = product.author;
    formatSlot.innerHTML = product.format;
    pubDateSlot.innerHTML = product.pubDate;
    languageSlot.innerHTML = product.language;
    lengthSlot.innerHTML = product.length;
    priceSlot.innerHTML = product.price.toFixed(2) + " €";
    summarySlot.innerHTML = product.summary;

    const filters = product.filters;
    let relatedItems = [];
    const newData = data.filter(item => item.title !== product.title);
    for (let i = 0; i < filters.length; i++) {
      newData.map(item => {
        const itemFilters = item.filters;
        for (let k = 0; k < itemFilters.length; k++) {
          if (itemFilters[k] === filters[i]) {
            const relatedItem = {
              title: item.title,
              author: item.author,
              image: item.image
            }
            if (relatedItems.length < 4) {
              relatedItems = [...relatedItems, relatedItem];
            } else {
              break;
            }
          }
        }
      });
    }
    relatedItems.map(item => {
      const itemToAdd = `<div class="related_item">
        <img src="${item.image}">
        <h3>${item.title}</h3>
        <h4>${item.author}</h4>
      </div>`;
      related.innerHTML += itemToAdd;
    });
  });

let basket = [];
const basketSize = document.getElementById("basket_size");
function goToBasket() {
  const basketContent = JSON.stringify(basket);
  location.href='./cart.html?basket=' + basketContent;
}
const counterUp = document.getElementById("counter_up");
const counterDown = document.getElementById("counter_down");
const button = document.getElementById("basket_button");
window.addEventListener("load", () => {
  counterUp.addEventListener("click", () => numberUp());
  counterDown.addEventListener("click", () => numberDown());
  button.addEventListener("click", () => toBasket(title));
});


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
    const quantity = parseInt(document.getElementById("counter_number").innerHTML);
    if (product !== undefined) {
      productToCart = {
        image: product.image,
        title: product.title,
        author: product.author,
        length: product.length,
        format: product.format,
        price: product.price,
        quantity: quantity
      };
      basket = [...basket, productToCart];
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
  });
}


const counterQuantity = document.getElementById("counter_number");
function numberUp() {
  const quantity = parseInt(document.getElementById("counter_number").innerHTML);
  if (quantity < 10) {
    const newQuantity = quantity + 1;
    counterQuantity.innerHTML = newQuantity;
  }
}
function numberDown() {
  const quantity = parseInt(document.getElementById("counter_number").innerHTML);
  if (quantity > 1) {
    const newQuantity = quantity - 1;
    counterQuantity.innerHTML = newQuantity;
  }
}



/*
<div class="related_item">
            <img src="./images/potter2.jpeg">
            <h3>Harry Potter and the Chamber of Secrets</h3>
            <h4>J.K. Rowling</h4>
          </div>
*/
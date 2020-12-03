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

const title = window.location.search.substring(7).split("%20").join(' ');
console.log(title);
fetch("./json/books.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    const product = data.filter(item => item.title === title)[0];
    console.log(product);
    imageSlot.src = product.image;
    titleSlot.innerHTML = product.title;
    authorSlot.innerHTML = product.author;
    formatSlot.innerHTML = product.format;
    pubDateSlot.innerHTML = product.pubDate;
    languageSlot.innerHTML = product.language;
    lengthSlot.innerHTML = product.length;
    priceSlot.innerHTML = product.price.toFixed(2) + " €";
    summarySlot.innerHTML = product.summary;
  });

let basket = [];
const basketSize = document.getElementById("basket_size");
function goToBasket() {
  const basketContent = JSON.stringify(basket);
  location.href='./cart.html?basket=' + basketContent;
}

const button = document.getElementById("basket_button");
console.log(button);
button.addEventListener("click", () => toBasket(title));

function toBasket(title) {
  let productToCart = {};
  fetch("./json/books.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
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
        basketSize.innerHTML = "(1 item)";
      } else if (basket.length > 1) {
        basketSize.innerHTML = "(" + basket.length + " items)";
      }
    }
  });
}
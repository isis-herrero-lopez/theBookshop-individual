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

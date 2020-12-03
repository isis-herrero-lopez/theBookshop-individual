let basket = [];
const basketSize = document.getElementById("basket_size");
const productsList = document.getElementsByClassName("products_list")[0];
fetch("./json/books.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.map(item => {
      const product = `<div class="product_item">
        <div onclick="openDetails('${item.title}')">
          <img src="${item.image}">
          <h3>${item.title}</h3>
          <h4>${item.author}</h4>
          <h5>${item.price} €</h5>
        </div>
        <p class="button_primary" onclick="toBasket('${item.title}')">Add to Basket</p>
        <p style="display:none">${item.filters}</p>
    </div>`;
    productsList.innerHTML += product;
    });
  });

function openDetails(title) {
  location.href = "./productDetail.html?title=" + title;
}

function toBasket(title) {
  let productToCart = {};
  fetch("./json/books.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    const product = data.filter(item => item.title === title)[0];
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

function goToBasket() {
  const basketContent = JSON.stringify(basket);
  location.href='./cart.html?basket=' + basketContent;
}
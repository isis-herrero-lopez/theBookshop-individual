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
  console.log(title);
}

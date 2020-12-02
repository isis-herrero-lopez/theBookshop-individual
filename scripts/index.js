const productsList = document.getElementsByClassName("products_list")[0];
fetch("./json/books.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.map(item => {
      const product = `<div class="product_item">
      <img src="${item.image}">
        <h3>${item.title}</h3>
        <h4>${item.author}</h4>
        <h5>${item.price} €</h5>
        <p class="button_primary">Add to Basket</p>
        <p style="display:none">${item.filters}</p>
    </div>`;
    productsList.innerHTML += product;
    });
  });
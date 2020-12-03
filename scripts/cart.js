const basketContent = window.location.search.substring(8).split("%20").join(' ').split("%22").join('"');
const basketSpace = document.getElementById("basket_contents");
const contents = JSON.parse(basketContent);
console.log(contents);
contents.map(item => {
  const basketItem = `<div class="basket_item">
    <img src="${item.image}">
    <div class="basket_info">
      <h3>${item.title}</h3>
      <h4>${item.author}</h4>
      <div class="basket_further">
        <p>${item.length}</p>
        <p>${item.format}</p>
      </div>
    </div>
    <div class="basket_price_section">
      <div class="price_upper">
        <div class="price_item">
          <p class="price_title">Price</p>
          <p class="price_content" id="price_${contents.indexOf(item)}">${item.price.toFixed(2)} €</p>
        </div>
        <div class="price_item">
          <p class="price_title">Quantity</p>
          <div class="quantity_counter">
            <div id="counter">
              <p id="number_${contents.indexOf(item)}">${item.quantity}</p>
            </div>
            <div class="up_down">
              <div id="counter_up" onclick="numberUp('item_` + contents.indexOf(item) + `')">
                <i class="fas fa-sort-up"></i>
              </div>
              <div id="counter_down" onclick="numberDown('item_` + contents.indexOf(item) + `')">
                <i class="fas fa-sort-down"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="price_item">
          <p class="price_title">Total</p>
          <p class="price_content" id="first_total_${contents.indexOf(item)}">${(item.quantity * item.price).toFixed(2)} €</p>
        </div>
      </div>
      <div class="price_lower">
        <p class="button_secondary">Remove</p>
      </div>
    </div>
  </div>`;
  basketSpace.innerHTML += basketItem;
});

function numberUp(item) {
  const number = item.substring(5);
  const digitId = "number_" + number;
  const digit = document.getElementById(digitId);
  const value = parseInt(digit.innerHTML);
  let newValue;
  if (value < 10) {
    newValue = value + 1;
    digit.innerHTML = newValue;
  }
  const priceId = "price_" + number;
  const price = parseFloat(document.getElementById(priceId).innerHTML).toFixed(2);
  const totalId = "first_total_" + number;
  const total = document.getElementById(totalId);
  const newTotal = (price * newValue).toFixed(2);
  total.innerHTML = newTotal + " €";
}
function numberDown(item) {
  const number = item.substring(5);
  const digitId = "number_" + number;
  const digit = document.getElementById(digitId);
  const value = parseInt(digit.innerHTML);
  let newValue; 
  if (value > 1) {
    newValue = value - 1;
    digit.innerHTML = newValue;
  }
  const priceId = "price_" + number;
  const price = parseFloat(document.getElementById(priceId).innerHTML).toFixed(2);
  const totalId = "first_total_" + number;
  const total = document.getElementById(totalId);
  const newTotal = (price * newValue).toFixed(2);
  total.innerHTML = newTotal + " €";
}
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
//------------------------------------------------
function ready() {
  console.log("ya rabbi");
  updateCarttotal();
  var removeCartItemButtons = document.getElementsByClassName(
    "span remove-item"
  );
  console.log(removeCartItemButtons);
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName("item-amount");
  for (let i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  var addToBagButtons = document.getElementsByClassName("bag-btn");
  for (let i = 0; i < addToBagButtons.length; i++) {
    var addToBag = addToBagButtons[i];
    addToBag.addEventListener("click", addToBagClicked);
  }
  document
    .getElementsByClassName("purshase")[0]
    .addEventListener("click", purchaseClicked);
  document.getElementById("start")[0].addEventListener("click", startClicked);
}
//---------------------------------------------------------

//--------------------------------------------------------
function purchaseClicked() {
  alert("thank you for your purshase");
  var cartItems = document.getElementsByClassName("listOfItems")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCarttotal();
}
//----------------------------------------------------------
function addToBagClicked(event) {
  var addToBagButton = event.target;
  var shopProduct = addToBagButton.parentElement.parentElement;
  var title = shopProduct.getElementsByTagName("h3")[0].innerText;
  // console.log(title);
  var imagesrc = shopProduct.getElementsByClassName("product-img")[0].src;
  var price = shopProduct.getElementsByTagName("h4")[0].innerText;
  //console.log(title, price, imagesrc);
  addItemToCart(title, price, imagesrc);
  updateCarttotal();
}
//--------------------------------------------------------

//----------------------------------------------------------
function addItemToCart(title, price, imagesrc) {
  var cartRow = document.createElement("div");
  var cartItems = document.getElementsByClassName("listOfItems")[0];
  cartItemsNames = document.getElementsByTagName("h4");
  console.log(cartItemsNames);
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("item already in the bag");
      return;
    }
  }
  cartRow.classList.add = "cart-item";
  var cartRowContents = ` 
        <div class="cart-item">
            <img
              src="${imagesrc}"
              alt="product"
            />
            <div>
              <h4>${title}</h4>
              <h5>${price}</h5>
              <div class="span remove-item">Remove</div>
            </div>
            <div class="item-quantity-container">
              <input class="item-amount" type="number" value="1" />
            </div>
        </div>
    `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("span remove-item")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("item-amount")[0]
    .addEventListener("change", quantityChanged);
}
//-----------------------------------------------------------
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCarttotal();
}
//------------------------------------------------------
function removeCartItem(event) {
  var buttonCliked = event.target;
  buttonCliked.parentElement.parentElement.remove();
  updateCarttotal();
}
//----------------------------------------------------------
function updateCarttotal() {
  var cartItemContainer = document.getElementsByClassName("cart-content")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-item");
  var total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByTagName("h5")[0];
    var quantityElement = cartRow.getElementsByClassName("item-amount")[0];
    // console.log(priceElement, quantityElement);
    var price = parseFloat(priceElement.innerText.replace(" DNT", ""));
    //console.log(price);
    var quantity = quantityElement.value;
    //console.log(quantity);
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100; //to round the total to 2 digits
  document.getElementsByClassName("cart-total")[0].innerText = total + " DNT";
  var numberOfItemsPurchased = parseInt(
    document.getElementsByClassName("cart-items").innertext
  );
  numberOfItemsPurchased = quantity;
}
//------------------------------------------------------------------


let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}


// Get the modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("cart");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}




const removeItem = document.getElementsByClassName('remove');
for (let i = 0; i < removeItem.length; i++) {
    const button = removeItem[i];
    button.addEventListener('click', removeCartItems);
}

const quantityInputs = document.getElementsByClassName('cart-quantity-input');
for(let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
} 

const addToCardBtn = document.getElementsByClassName('addToCard');
for (let i = 0; i < addToCardBtn.length; i++) {
    const btn = addToCardBtn[i];
    btn.addEventListener('click', addToCartClicked);
}

document.getElementsByClassName('buybtn')[0].addEventListener('click', buyBtnClicked);







// functions for reused:
function buyBtnClicked() {
    alert('Thank you for purchasing from our site!!!');
    let cartItems = document.getElementsByClassName('cart-rows')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
}


function removeCartItems(event) {
    let btnClicked = event.target;
    btnClicked.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
}


function addToCartClicked(event) {
    let btn = event.target;
    let shopItem = btn.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shopItemTitle')[0].innerText;
    let price = shopItem.getElementsByClassName('shopItemPrice')[0].innerText;
    addItemToCart(title, price);
    updateCartTotal();
}


function addItemToCart(title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = document.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added!!!');
            return;
        }   
    }
    let cartRowContents = `
        <table class="cart-items"> 
            <tr class="cart-rows">
                <td>${title}</td>
                <td>
                    <input type="number" class="cart-quantity-input" value="1" min="1" max="10" >
                </td>
                <td class="cart-price">${price}</td>
                <td>
                    <div class="remove">
                        <u>Remove</u>
                    </div>
                </td>
            </tr>
        </table>
      `
    cartRow.innerHTML = cartRowContents 
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItems);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}


function quantityChanged(event) {
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
}


function updateCartTotal() {
    let cartItemsContainer =document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemsContainer.getElementsByClassName('cart-rows');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceELement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceELement.innerText.replace('$',''));
        let quantity = quantityElement.value;
        total = total + (price*quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-amount')[0].innerText = '$'+ total;
}




























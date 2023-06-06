// cart
let carReservation = document.querySelector('.car-reserve');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let addCart = document.querySelector('.reserve-button');
let reserveButton = document.querySelector('.checkout-btn');
const carContent = document.querySelector('.car-content');
const cartContent = document.querySelector('.cart-content');
const cartCountInfo = document.querySelector('.cart-count');
let paymentPage = document.querySelector('.payment-page');
let bodyContent = document.querySelector('.box-content');
let continueButton = document.querySelector('.continue-btn');
let bookingButton = document.querySelector('.booking-btn');
let carReserve = document.querySelector('.car-reserve');
let cartItemID = 1;


// open cart
carReservation.onclick = () => {
    cart.classList.add('active');
};
// close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });

    carContent.addEventListener('click', rentCar);
    
    let removeCartButtons = document.getElementsByClassName('delete-btn');
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    let quantityChangeList = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityChangeList.length; i++) {
        let list = quantityChange[i];
        list.addEventListener('change', quantityChange);
    }

    document.getElementsByClassName('clear-cart')[0]
    .addEventListener('click', clearAllButton);
    
    reserveButton.classList.add('hide-btn');
    paymentPage.classList.add('hide-btn');
    cartCountInfo.classList.add('hide-btn');

    document.getElementsByClassName('checkout-btn')[0]
    .addEventListener('click', reserveButtonClicked);

    document.getElementsByClassName('continue-btn')[0]
    .addEventListener('click', continueButtonClicked);

    document.getElementsByClassName('booking-btn')[0]
    .addEventListener('click', bookingButtonClicked);
}

function showBuyButton(total) {
    if (total > 0) {
        reserveButton.classList.remove('hide-btn');
    } else {
        reserveButton.classList.add('hide-btn');
    }
}

function showCartCount() {
    if (cartCountInfo.textContent > 0) {
        cartCountInfo.classList.remove('hide-btn');
    } else {
        cartCountInfo.classList.add('hide-btn');
    }
}

function continueButtonClicked() {
    paymentPage.classList.add('hide-btn');
    cart.classList.add('active');
    bodyContent.classList.remove('hide-btn');
    carReserve.classList.remove('hide-btn');
}

function bookingButtonClicked() {
    clearAllButton();
}

//Total price on payment page
function totalPrice() {
    let priceElement = document.getElementsByClassName('total-price')[0];
    let price = parseFloat(priceElement.innerText.replace("$",""));
    document.getElementsByClassName('total-payment')[0].innerHTML = "$" + price;
}

//Reserve Car
function reserveButtonClicked() {
    // let cartContent = document.getElementsByClassName('cart-content')[0];
    //     while (cartContent.hasChildNodes()) {
    //     cartContent.removeChild(cartContent.firstChild); 
    // }
    totalPrice();
    updateTotal();
    paymentPage.classList.remove('hide-btn');
    cart.classList.remove('active');
    bodyContent.classList.add('hide-btn');
    carReserve.classList.add('hide-btn');
}

//Remove all items from cart
function clearAllButton() {
    let clearButton = document.getElementsByClassName('cart-content')[0];
    while (clearButton.hasChildNodes()) {
        clearButton.removeChild(clearButton.firstChild);
    }
    deleteProductFromStorage();
    updateTotal();
}

//Remove item from cart
function removeCartItem(event) {
    let removeButton = event.target;
    removeButton.parentElement.parentElement.parentElement.parentElement.remove(); 
    updateTotal();
}

//Change quantity
function quantityChange(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    if (isNaN(input.value) || input.value > 5) {
        alert("Max rent days are 5 days");
        input.value = 5;
    }
    updateTotal();
}

function rentCar(e) {
    if (e.target.classList.contains('reserve-button')) {
        let product = e.target.parentElement.parentElement;
        getCarInfo(product);
    }
    updateTotal();
}

function getCarInfo(product) {
    let productInfo = {
        id: cartItemID,
        availability: product.querySelector('.availability').textContent,
        thumbnail: product.querySelector('.car-picture').src,
        vehicle: product.querySelector('.car-name').textContent,
        pricePerDay: product.querySelector('.car-price').textContent
    }
    cartItemID++;
    if (productInfo.availability == "true") {
        addToCartList(productInfo);
        saveProductInStorage(productInfo);
    } else{
        alert("Sorry, the car is not availabale now. Please try another cars");
    }
    updateTotal();
}

function addToCartList(product) {
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemName = cartItems.getElementsByClassName('car-title');
    for (let i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText == product.vehicle){
            // alert("You have already added this item in the cart");
            return;
        }
    }
    cartItem.innerHTML = `
        <div class="container">
                <div class="row row-cols-5" id="position">
                    <div class="col"><img src="${product.thumbnail}" class="car-picture"></div>
                    <div class="col car-title">${product.vehicle}</div>
                    <div class="col daily-price">${product.pricePerDay}</div>
                    <div class="col"><input type="number" value="1" class="cart-quantity"></div>
                    <div class="col"><button type="button" class="btn btn-primary delete-btn">Delete</button></div>
                </div>
         </div>
    `;
    
    cartContent.appendChild(cartItem);
    cartItem
        .getElementsByClassName('delete-btn')[0]
        .addEventListener('click', removeCartItem);
    cartItem
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChange);
}

//Save product in session storage
function saveProductInStorage(item) {
    let products = getProductFromStorage();
    products.push(item);
    sessionStorage.setItem('products', JSON.stringify(products));
    updateTotal();
}

//Get all the products info if there is any in the session storage
function getProductFromStorage() {
    return sessionStorage.getItem('products') ? JSON.parse(sessionStorage.getItem('products')) : []; 
    updateTotal();
}

function updateAvailability() {
    getProductFromStorage();
    cars[0].availability = false;
}

//Remove products from session
function deleteProductFromStorage() {
    sessionStorage.removeItem('products');
}

//Load cart products
function loadCart() {
    let products = getProductFromStorage();
    if (products.length < 1 ) {
        cartItemID = 1;
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
    }
    products.forEach(product => addToCartList(product));
    updateTotal();
}

function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('daily-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$",""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        //if price contains some cents
        total = Math.round(total *100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
        showBuyButton(total);
}   

function loadJSON() {
    fetch('json/cars.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += `
            <nav class="row">
            
                <div class="col-md-12" >
                    <div class="col-md-6"> 
                        <img src="${product.image}" class="car-picture">
                        <button class='reserve-button'>Add to Cart</button>
                    </div>
                    <div class="col-md-6">
                        <b>Category:</b> <p>${product.category}</p>
                    </div>
                    <div class="col-md-6">
                        <b>Availability</b>: <p class="availability">${product.availability}</p>
                    </div>
                    <div class="col-md-6">
                        <b>Brand</b>: <p>${product.brand}</p>
                    </div>
                    <div class="col-md-6">
                        <b>Model</b>: <p  class="car-name">${product.model}</p>
                    </div>
                    <div class="col-md-6">
                        <b>Model Year</b>: <p>${product.modelYear}</p>
                    </div>
                    <div class="col-md-6">
                        <b>Mileage</b>: <p>${product.mileage}</p>
                    </div>
                    <div class="col-md-6">
                        <b>Fuel Type</b>: <p>${product.fuelType}</p>
                    </div>
                    <div class="col-md-6">
                        <b>Seats</b>: <p>${product.seats}</p>
                    </div>
                    <div class="col-md-6">
                        <b>Price per Day</b>: <p class="car-price">${product.pricePerDay}</p>
                    </div>
                    <div class="col-md-12">
                        <b>Description</b>: <p>${product.description}</p>
                    </div>
                </div>
            </nav>
            `;
        });
        carContent.innerHTML = html;
    })
    .catch(error => {
        alert(`There is problem when retrieving car`);
        console.log(error);
    })
}
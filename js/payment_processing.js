// In another file.js

// Retrieve sell_Product from local storage
const sell_Product = JSON.parse(localStorage.getItem('sell_Product')) || [];

// Now you can use sell_Product array in this file
console.log('sell_Product in another file', sell_Product);

let tbody = document.querySelector('tbody');
let totalElement = document.querySelector('#total');
let totalAmount = 0;

function createTr(data) {
    let tr = document.createElement('tr');
    let idProduct = document.createElement('td');
    let nameProduct = document.createElement('td');
    let categoryProduct = document.createElement('td');
    let dateSold = document.createElement('td');
    let priceProduct = document.createElement('td');
    idProduct.textContent = data.id;
    nameProduct.textContent = data.name;
    categoryProduct.textContent = data.category;
    dateSold.textContent = data.timeStamp;
    priceProduct.textContent = data.price;

    tr.appendChild(idProduct);
    tr.appendChild(nameProduct);
    tr.appendChild(categoryProduct);
    tr.appendChild(dateSold);
    tr.appendChild(priceProduct);

    tbody.appendChild(tr);

    // Add the price to the totalAmount
    totalAmount += parseFloat(data.price.replace('$', ''));
}

sell_Product.forEach((data) => {
    createTr(data);
});

totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;


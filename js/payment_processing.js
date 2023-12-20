// In another file.js

// Retrieve sell_Product from local storage
const sell_Product = JSON.parse(localStorage.getItem('sell_Product')) || [];

// Now you can use sell_Product array in this file
console.log('sell_Product in another file', sell_Product);


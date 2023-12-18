// ------------------------------------------------------------------------------------------add feature
let id_product = 1;

// Show form for adding a product
function toggleForm() {
    document.querySelector('.form-add-product').style.display = 'block';
}

// Hide the form for adding a product
function close_form() {
    document.querySelector('.form-add-product').style.display = 'none';
}
// Hide the form for adding a product
function hideForm() {
    document.querySelector('.form-add-product').style.display = 'none';
}

// Add a product to the table and localStorage
function addToStock() {
    let tbody = document.querySelector('tbody');
    let inputs = document.querySelectorAll('input');

    // Check if required inputs are filled
    if (inputs[0].value === '' && inputs[1].value === '') {
        alert("Complete all inputs, please!");
        return false;
    }

    // Create product data object
    let productData = {
        id: id_product++,
        name: inputs[2].value,
        category: inputs[3].value,
        quantity: inputs[4].value,
        price: `${inputs[5].value}$`
    };

    // Save product data to localStorage
    let savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    savedProducts.push(productData);
    localStorage.setItem('products', JSON.stringify(savedProducts));

    // Add product to the table
    addToTable(productData);

    // Clear input values
    for (let input of inputs) {
        input.value = '';
    }
}

// Add a product to the table
function addToTable(productData) {
    let tbody = document.querySelector('tbody');
    let tr = document.createElement('tr');

    // Populate table row with product data
    tr.innerHTML = `
        <td>00${productData.id}</td>
        <td>${productData.name}</td>
        <td>${productData.category}</td>
        <td>${productData.quantity}</td>
        <td>${productData.price}</td>
        <td>
            <img id="edit" src="../images/icon/edit.svg">
            <img id="delete" src="../images/icon/delete.png">
            <img id="show" src="../images/icon/eye.png">
        </td>
    `;

    // Append the row to the table
    tbody.appendChild(tr);
}

// Load data from localStorage on page load
window.addEventListener('load', function () {
    let savedProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Add products to the table from localStorage
    for (let productData of savedProducts) {
        // Update id_product with the last used ID plus one
        id_product = productData.id + 1;

        addToTable(productData);
    }
});

// ----------------------------------------------------------------------------------------------------

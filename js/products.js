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
    if (inputs[2].value === '') {
        alert("Complete all inputs, please!");
        return false;
    }

    // Create product data object
    let productData = {
        id: id_product++,
        name: inputs[2].value,
        category: inputs[3].value,
        quantity: inputs[4].value,
        price: `${inputs[5].value}$`,
        images: [localStorage.getItem('uploadedImage')] // Store image data in an array
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

    // Reset the image to the default one
    document.getElementById('image-product').src = "../images/draft.jpg";
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
            <div class="image-container"></div> <!-- Container for displaying images -->
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

// Get references to the file input and image elements
const fileInput = document.getElementById('file');
const imageProduct = document.getElementById('image-product');

// Add event listeners for file input and cancel button
fileInput.addEventListener('change', showImage);
document.getElementById('cancel_image').addEventListener('click', cancelImage);

// Function to handle file selection and display the image
function showImage() {
    const file = fileInput.files[0];
    if (file) {
        // Read the selected file as a data URL
        const reader = new FileReader();
        reader.onload = e => (imageProduct.src = e.target.result, saveToLocalStorage(e.target.result));
        reader.readAsDataURL(file);
    }
}

// Function to save image data to local storage
function saveToLocalStorage(imageData) {
    localStorage.setItem('uploadedImage', imageData);
}

// Function to cancel image selection
function cancelImage() {
    // Clear the file input and reset the image to the default one
    fileInput.value = null;
    imageProduct.src = "../images/draft.jpg";

    // Clear the image data from local storage
    localStorage.removeItem('uploadedImage');
}

// Check if there is a saved image in local storage and display it on page load
window.onload = () => {
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) imageProduct.src = savedImage;
};
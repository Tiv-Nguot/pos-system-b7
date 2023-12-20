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
    if (inputs[2].value === '' || inputs[3].value === '' || inputs[4].value === '' || inputs[5].value === '') {
        alert("Complete all inputs, please!");
        return false;
    }

    // Create product data object
    let productData = {
        id: id_product++,
        name: inputs[1].value,
        category: inputs[2].value,
        quantity: inputs[3].value,
        price: `${inputs[4].value}$`,
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
            <img id="delete" src="../images/icon/delete.png" onclick="delete_product(event)">
            <img id="show" src="../images/icon/eye.png"  onclick="showProduct(event)">
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
// function click on categery
function clickCategory(event){
    let option = event.target.value.toLowerCase();
    let categerys = document.querySelectorAll('tbody tr');
    for (const categery of categerys){
        let title= categery.children[2].textContent.toLowerCase();
        categery.textContent.toLowerCase()
        if (title.includes(option)){
            categery.style.display=''
        }else{
            categery.style.display='none'
        }
    }
    
}
let select = document.querySelector('select');
select.addEventListener('click',clickCategory)


// search_name_product
function searchNameProduct(event) {
    let tr = event.target.value.toLowerCase()
    let names = document.querySelectorAll('tbody tr')
    for (const name of names) {
        let title = name.children[1].textContent.toLowerCase()
        name.textContent.toLowerCase()
        if (title.includes(tr)) {
            name.style.display = ''
        } else {
            name.style.display = 'none'
        }
    }
}
const searchs = document.querySelector('.search');
searchs.addEventListener('keyup', searchNameProduct)


// -----------------------------------------------------------------------to delete
// Function to delete a product from the table and localStorage
function delete_product(event) {
    let tr = event.target.closest('tr');
    let productId = tr.querySelector('td:first-child').textContent.substring(2);
    let toConfirm = confirm("Are you sure to delete it?");
    if (toConfirm == true) {
        // Remove the product from the table
        tr.remove();
    }



    // Remove the product from localStorage
    let savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    savedProducts = savedProducts.filter(product => product.id !== parseInt(productId));
    localStorage.setItem('products', JSON.stringify(savedProducts));
}

// --------------------------------------------------------------------------------------


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
    if (savedImage) imageProduct.src = "../images/draft.jpg";
};
const search= document.querySelector('.search');
search.addEventListener('keyup',searchNameProduct)

    if (savedImage) imageProduct.src = savedImage;






function showProduct(event){
    let load=event.target.parentElement.parentElement;
    
    const productId =document.getElementById("id");
    const nameProduct=document.getElementById("name");
    const category=document.getElementById("category");
    const quantity=document.getElementById("quantity");
    const price=document.getElementById("price");
    productId.textContent="ID :"+load.children[0].textContent;
    nameProduct.textContent= "Name Product: "+load.children[1].textContent;
    category.textContent= "Category: "+load.children[2].textContent;
    quantity.textContent= "Quantity: "+load.children[3].textContent;
    price.textContent="Price: "+load.children[4].textContent;
}

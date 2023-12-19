//----------------------------------------------------------------------------get data from product.js
const data = localStorage.getItem('products');
const products_data = JSON.parse(data);
console.log('products_data', products_data)

// -----------------------------------------------------------------------------------------------create card with data from local
function createBox(productData) {
    let box_product = document.querySelector('.box-product');

    let box = document.createElement('div');
    box.className = 'box';

    let picDiv = document.createElement('div');
    picDiv.className = 'pic';

    let priceDiv = document.createElement('div');
    priceDiv.className = 'price';

    let priceH4 = document.createElement('h4');
    priceH4.textContent = productData.price;

    var imgElement = document.createElement('img');
    imgElement.src = productData.images; // You may want to update this dynamically based on productData

    var h4Element = document.createElement('h4');
    h4Element.textContent = productData.name;

    var borderCartDiv = document.createElement('div');
    borderCartDiv.className = 'border-cart';

    var h5Element = document.createElement('h5');
    var aElement = document.createElement('a');
    aElement.href = '/libs/cart.html';
    aElement.textContent = 'Add To Cart';
    h5Element.appendChild(aElement);

    var spanElement = document.createElement('span');
    spanElement.className = 'material-symbols-outlined';
    spanElement.textContent = 'shopping_cart';

    box_product.appendChild(box);
    box.appendChild(picDiv);
    box.appendChild(priceDiv);
    box.appendChild(h4Element);
    box.appendChild(borderCartDiv);

    picDiv.appendChild(priceDiv);
    picDiv.appendChild(imgElement);
    priceDiv.appendChild(priceH4);

    borderCartDiv.appendChild(h5Element);
    borderCartDiv.appendChild(spanElement);
    h5Element.appendChild(aElement);
}

function createBoxesFromData(data) {
    for (let i = 0; i < data.length; i++) {
        createBox(data[i]);
    }
}

// Call the function to create boxes from products_data
createBoxesFromData(products_data);
// ----------------------------------------------------------------------------------------------------
function searchMenu() {
    const boxs = document.querySelectorAll('.box')
    for (const box of boxs) {
        const title = box.firstElementChild.nextElementSibling.textContent.toLowerCase();
        console.log(title);
        if (title.includes(searchMenuInput.value.toLowerCase())) {
            box.style.display = 'block'
        } else {
            box.style.display = 'none'
        }
    }

}

const searchMenuInput = document.querySelector('input')
searchMenuInput.addEventListener('keyup', searchMenu)

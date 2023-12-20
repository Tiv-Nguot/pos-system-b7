const data = localStorage.getItem('products');
const products_data = JSON.parse(data);
console.log('products_data', products_data)

let sell_Product = []
function createBox(productData) {
    let box_product = document.querySelector('.box-product');
    let cardId = document.createElement('spam');
    cardId.setAttribute("id", 'carId');
    cardId.textContent = productData.id;
    cardId.style.display = 'none';

    let card_Category = document.createElement('spam');
    card_Category.setAttribute('id', 'card_Category');
    card_Category.textContent = productData.category;
    card_Category.style.display = 'none';



    let box = document.createElement('div');
    box.className = 'box';

    let picDiv = document.createElement('div');
    picDiv.className = 'pic';

    let priceDiv = document.createElement('div');
    priceDiv.className = 'price';

    let priceH4 = document.createElement('h4');
    priceH4.textContent = productData.price;

    var imgElement = document.createElement('img');
    imgElement.src = productData.images;

    var h4Element = document.createElement('h4');
    h4Element.textContent = productData.name;

    var borderCartDiv = document.createElement('div');
    borderCartDiv.className = 'border-cart';

    var h5Element = document.createElement('h5');
    var aElement = document.createElement('a');
    // aElement.href = '/libs/cart.html';
    aElement.textContent = 'Add To Cart';

    // Add click event listener to the anchor tag

    var spanElement = document.createElement('span');
    spanElement.className = 'material-symbols-outlined';
    spanElement.textContent = 'shopping_cart';

    box_product.appendChild(box);
    box.appendChild(cardId);
    box.appendChild(card_Category);

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

    borderCartDiv.addEventListener('click', saveTo_Array)
    function saveTo_Array() {
        let sell_Data = {
            id: cardId.textContent,
            name: h4Element.textContent,
            category: card_Category.textContent,
            timeStamp: new Date().toISOString(),
            price: priceH4.textContent
        }
    
        // Push the sell data
        sell_Product.push(sell_Data);
        console.log('sell_Data', sell_Product);
    
        // Save sell_Product to local storage
        localStorage.setItem('sell_Product', JSON.stringify(sell_Product));
    }
    
}

function createBoxesFromData(data) {
    for (let i = 0; i < data.length; i++) {
        createBox(data[i]);
    }
}

createBoxesFromData(products_data);

function searchMenu() {
    const boxs = document.querySelectorAll('.box');
    for (const box of boxs) {
        const title = box.firstElementChild.nextElementSibling.textContent.toLowerCase();
        console.log(title);
        if (title.includes(searchMenuInput.value.toLowerCase())) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    }
}

const searchMenuInput = document.querySelector('input');
searchMenuInput.addEventListener('keyup', searchMenu);

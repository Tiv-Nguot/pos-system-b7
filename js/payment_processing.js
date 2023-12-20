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
    let action = document.createElement('td');
    let btnDelete = document.createElement('button');
    btnDelete.textContent = 'delete';
    btnDelete.setAttribute('id', 'btnDelete');
    btnDelete.addEventListener('click', deleteTrow);

    function deleteTrow(event) {
        let tRow = event.target.closest('tr');
        let toConfirm = confirm("Are you sure?");
        if (toConfirm) {
            // Find the index of the deleted item in the sell_Product array
            let index = sell_Product.findIndex(item => item.id === parseInt(tRow.firstElementChild.textContent));
    
            // Remove the item from the array
            if (index !== -1) {
                sell_Product.splice(index, 1);
    
                // Update local storage with the modified array
                localStorage.setItem('sell_Product', JSON.stringify(sell_Product));
            }
    
            // Remove the table row
            tRow.remove();
    
            // Recalculate and update the total amount
            calculateTotal();
        }
    }
    

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
    tr.appendChild(action)
    action.appendChild(btnDelete);

    tbody.appendChild(tr);

    // Add the price to the totalAmount
    totalAmount += parseFloat(data.price.replace('$', ''));
}

function calculateTotal() {
    totalAmount = 0;

    // Recalculate the total amount
    sell_Product.forEach((data) => {
        totalAmount += parseFloat(data.price.replace('$', ''));
    });

    // Update the total amount in the HTML
    totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
}

sell_Product.forEach((data) => {
    createTr(data);
});

totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;

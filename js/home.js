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

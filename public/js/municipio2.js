const items = Array.from(document.querySelectorAll('.carousel-item'));
let index = 0;


function updatePositions() {
items.forEach((item, i) => {
item.classList.remove('left', 'right', 'center');
});


const leftIndex = (index - 1 + items.length) % items.length;
const rightIndex = (index + 1) % items.length;


items[index].classList.add('center');
items[leftIndex].classList.add('left');
items[rightIndex].classList.add('right');
}


document.getElementById('next').onclick = () => {
index = (index + 1) % items.length;
updatePositions();
};


document.getElementById('prev').onclick = () => {
index = (index - 1 + items.length) % items.length;
updatePositions();
};


// Flip ao clicar SOMENTE no que estiver no centro
items.forEach(item => {
item.addEventListener('click', () => {
if (item.classList.contains('center')) {
item.classList.toggle('flip');
}
});
});
const items = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.arrow.left');
const nextBtn = document.querySelector('.arrow.right');

let current = 0;

function updateCarousel() {
  items.forEach((item, i) => {
    item.classList.remove('active', 'prev', 'next', 'hidden');

    const diff = (i - current + items.length) % items.length;

    if (diff === 0) {
      item.classList.add('active');
    } else if (diff === 1) {
      item.classList.add('next');
    } else if (diff === items.length - 1) {
      item.classList.add('prev');
    } else {
      item.classList.add('hidden');
    }
  });
}

nextBtn.addEventListener('click', () => {
  current = (current + 1) % items.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  current = (current - 1 + items.length) % items.length;
  updateCarousel();
});

updateCarousel();

class CircularCarousel {
    constructor() {
      this.currentIndex = 0;
      this.totalItems = 9;
      this.items = document.querySelectorAll('.carousel-item');
      this.indicators = document.querySelectorAll('.indicator');
      this.prevBtn = document.getElementById('prevBtn');
      this.nextBtn = document.getElementById('nextBtn');
      this.isAnimating = false;
      this.init();
    }
    init() {
      // Event listeners para os botões
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
      // Event listeners para os indicadores
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => this.goTo(index));
      });
      // Event listeners para os próprios cards
      this.items.forEach((item, index) => {
        item.addEventListener('click', () => {
          if (!item.classList.contains('center')) {
            this.goTo(index);
          }
        });
      });
      // Suporte a teclado
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });
      // Inicializa a posição
      this.updateCarousel();
    }
    next() {
      if (this.isAnimating) return;
      this.currentIndex = (this.currentIndex + 1) % this.totalItems;
      this.updateCarousel();
    }
    prev() {
      if (this.isAnimating) return;
      this.currentIndex = (this.currentIndex - 1 + this.totalItems) %
        this.totalItems;
      this.updateCarousel();
    }
    goTo(index) {
      if (this.isAnimating || index === this.currentIndex) return;
      this.currentIndex = index;
      this.updateCarousel();
    }
    updateCarousel() {
      this.isAnimating = true;
      // Atualiza as classes dos itens
      this.items.forEach((item, index) => {
        item.classList.remove('center', 'left', 'right', 'hidden');
        if (index === this.currentIndex) {
          item.classList.add('center');
        } else if (index === this.getPrevIndex()) {
          item.classList.add('left');
        } else if (index === this.getNextIndex()) {
          item.classList.add('right');
        } else {
          item.classList.add('hidden');
        }
      });
      // Atualiza os indicadores
      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentIndex);
      });
      // Permite nova animação após o tempo de transição
      setTimeout(() => {
        this.isAnimating = false;
      }, 600);
    }
    getPrevIndex() {
      return (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    }
    getNextIndex() {
      return (this.currentIndex + 1) % this.totalItems;
    }
  }
  // Inicializa o carrossel quando a página carrega
  document.addEventListener('DOMContentLoaded', () => {
    new CircularCarousel();
  });
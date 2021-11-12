class ModalView {
    constructor () {
        this.modal = document.querySelector('.modal__wrapper');
        this.overlay = document.querySelector('.modal__overlay');

    }

    renderGameOver = () => {
        this.modal.querySelector('img').src = './assets/images/vector/cup-broke.svg';
        this.modal.querySelector('.modal__head').textContent = 'Game Over';
        this.modal.querySelector('.modal__desc').textContent = 'Cыграть снова?';
        this.modal.classList.remove('display-none');
        this.overlay.classList.remove('display-none');
    }

    renderWin = () => {
        this.modal.firstChild.src('./assets/images/vector/group-stars.svg');
        this.modal.querySelector('.modal__head').textContent = 'Велликоллепно!';
        this.modal.querySelector('.modal__desc').textContent = 'Наши поздравления!';
        this.modal.querySelector('.btn-text--repeat').remove();
        this.modal.classList.remove('display-none');
        this.overlay.classList.remove('display-none');
    }

    renderResult = (res) => {
        this.modal.firstChild.src('./assets/images/vector/cup-broke.svg');
        this.modal.querySelector('.modal__head').textContent = `${res} / 10`;
        this.modal.querySelector('.modal__desc').textContent = 'Поздравляем!';
        this.modal.classList.remove('display-none');
        this.overlay.classList.remove('display-none');
    }
}

export default ModalView;
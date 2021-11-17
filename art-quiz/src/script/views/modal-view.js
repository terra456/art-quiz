class ModalView {
    constructor () {
        this.modal = document.querySelector('.modal__wrapper');
        this.overlay = document.querySelector('.modal__overlay');

    }

    renderResult = (img, res, text, noBtn, no) => {
        this.modal.querySelector('img').src = `./assets/images/${img}`;
        this.modal.querySelector('.modal__head').textContent = res;
        this.modal.querySelector('.modal__desc').textContent = text;
        if ( noBtn ) {
            this.modal.querySelector('.btn-text--repeat').classList.add('display-none');
            this.modal.querySelector('.btn-text--next').classList.remove('display-none');
        } else {
            this.modal.querySelector('.btn-text--repeat').classList.remove('display-none');
            this.modal.querySelector('.btn-text--next').classList.remove('display-none');
        }
        if (no) {
            this.modal.querySelector('.btn-text--repeat').classList.add('display-none');
            this.modal.querySelector('.btn-text--next').classList.add('display-none');
        }

        this.modal.classList.remove('display-none');
        this.overlay.classList.remove('display-none');
        this.overlay.onclick = this.close;
        this.modal.querySelector('.btn-close-black').onclick = this.close;
    }

    close = () => {
        console.log('close');
        this.modal.classList.add('display-none');
        this.overlay.classList.add('display-none');
        this.modal.querySelector('.modal__img-wrapper').classList.remove('wrong-answer');
        this.modal.querySelector('.modal__img-wrapper').classList.remove('right-answer');
        this.modal.querySelector('.btn-text--next').onclick = null;
        this.modal.querySelector('.btn-text--repeat').onclick = null;     
        this.modal.querySelector('.btn-close-black').onclick = null;
        this.overlay.onclick = null;
    }
}

export default ModalView;
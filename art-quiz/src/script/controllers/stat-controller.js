import StatView from '../views/stat-view';
import LocalStorageModel from '../models/local-storage-model';

class StatController {
    constructor() {
        this.statView = new StatView();
        this.lsModal = new LocalStorageModel();
    }

    statPicture() {
        const res = this.lsModal.getLScategories('pictures'); 
        this.statView.render(res);
        console.log(document.querySelectorAll('.navigation'));
        document.querySelector('.navigation__item--pictures').onclick = this.btnPictureHandler;
        document.querySelector('.navigation__item--res').onclick = this.btnResHandler;
        document.querySelector('.navigation__item--rate').onclick = this.btnRateHandler;
    }

    btnPictureHandler = () => {
        this.statView.renderPictures(this.lsModal.getLScategories('pictures'));
    }

    btnResHandler = () => {
        console.log('stat');
        this.statView.renderResult(this.lsModal.getLScategories('image'), this.lsModal.getLScategories('painter'));
    }

    btnRateHandler = () => {
        this.statView.renderRate();
    }

}

export default StatController;
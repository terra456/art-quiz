import StatView from '../views/stat-view';
import LocalStorageModel from '../models/local-storage-model';
import ModalView from '../views/modal-view';
import images from '../data/images';

class StatController {
    constructor() {
        this.statView = new StatView();
        this.lsModel = new LocalStorageModel();
    }

    statPicture() {
        const res = this.lsModel.getLScategories('pictures'); 
        this.statView.render(res);
        console.log(document.querySelectorAll('.navigation'));
        document.querySelector('.navigation__item--pictures').onclick = this.btnPictureHandler;
        document.querySelector('.navigation__item--res').onclick = this.btnResHandler;
        document.querySelector('.navigation__item--rate').onclick = this.btnRateHandler;
        const pictures = document.querySelectorAll('.card');
        pictures.forEach((el) => el.onclick = this.pictureHandler);
    }

    btnPictureHandler = () => {
        this.statView.renderPictures(this.getResult('pictures'));
    }

    btnResHandler = () => {
        console.log('stat');
        this.statView.renderResult(this.getResult('image'), this.getResult('painter'), this.getAverage('image'), this.getAverage('painter'));
    }

    btnRateHandler = () => {
        console.log(this.getTotal('pictures'));
        this.statView.renderRate();
    }

    pictureHandler() {
        console.log(this.id);
        const modal = new ModalView();
        const desk = images[this.id]
        console.log(desk);
        modal.renderResult(`/full/${this.id}full.jpg`, desk.author, desk.name + ', ' + desk.year, null, true);
    }

    getResult = (name) => {
        return this.lsModel.getLScategories(name);        
    }

    getAverage = (name) => {
        const res = this.lsModel.getLScategories(name);
        const resArr = Object.values(res);
        const resAverage = Math.round(resArr.reduce((acc, el) => { return acc + (el * 100) }, 0) / resArr.length) / 100;
        // console.log(resArr.reduce((acc, el) => {return  acc + (el * 100)}, 0));
        console.log(resAverage);
        return resAverage;
    }

    getSum = (name) => {
        const res = this.lsModel.getLScategories(name);
        const resArr = Object.values(res);
        return resArr.reduce((acc, el) => acc + el);
    }

    getTotal = (name) => {
        const res = this.lsModel.getLScategories(name);
        const resArr = Object.values(res).filter(el => el).length;
        return resArr;
    }

}

export default StatController;
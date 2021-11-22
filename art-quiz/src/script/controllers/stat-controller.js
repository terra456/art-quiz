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
        const res = this.lsModel.getLScategories(localStorage.currentUser + '.' + 'pictures'); 
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
        this.statView.renderResult(this.getResult('image'), this.getResult('painter'), this.getAverage('image'), this.getAverage('painter'));
    }

    btnRateHandler = () => {
        let userList = [];
        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
            }
            const userName = this.lsModel.getLSsettings('name', key);
            console.log(userName);
            if (userName) {
                userList.push({userName: userName, result: this.getTotal(userName)});
            }
        }
        userList.sort((a, b) => { return b.result - a.result });
        console.log(userList);
        this.statView.renderRate(userList, localStorage.currentUser);
    }

    pictureHandler() {
        console.log(this.id);
        const modal = new ModalView();
        const desk = images[this.id]
        console.log(desk);
        modal.renderResult(`/full/${this.id}full.jpg`, desk.author, desk.name + ', ' + desk.year, null, true);
    }

    getResult = (name) => {
        if (localStorage[localStorage.currentUser + '.' + name]) {
            return this.lsModel.getLScategories(localStorage.currentUser + '.' + name);        
        } else {
            return [];
        }
    }

    getAverage = (name) => {
        if (localStorage[localStorage.currentUser + '.' + name]) {
            const res = this.lsModel.getLScategories(localStorage.currentUser + '.' + name);
            console.log(res);
            const resArr = Object.values(res);
            const resAverage = Math.round(resArr.reduce((acc, el) => { return acc + (el * 100) }, 0) / resArr.length) / 100;
            // console.log(resArr.reduce((acc, el) => {return  acc + (el * 100)}, 0));
            console.log(resAverage);
            return resAverage;
        } else {
            return null;
        }
    }

    getSum = (name) => {
        if (localStorage[localStorage.currentUser + '.' + name]) {
            const res = this.lsModel.getLScategories(localStorage.currentUser + '.' + name);
            const resArr = Object.values(res);
            return resArr.reduce((acc, el) => acc + el);
        } else {
            return null;
        }
    }

    getTotal = (userName) => {
        if (localStorage[userName + '.' + 'pictures']) {
            const res = this.lsModel.getLScategories(userName + '.' + 'pictures');
            const resArr = Object.values(res).filter(el => el).length;
            return resArr;
        } else {
            return null;
        }
    }

}

export default StatController;
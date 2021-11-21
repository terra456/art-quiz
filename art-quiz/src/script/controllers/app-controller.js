import { HomeView } from '../views/app-view';
import HomeController from './home-controller';
import CategoryController from './category-controller';
import LocalStorageModel from '../models/local-storage-model';
import StatController from './stat-controller';
import LoginController from './login-controller';
import SettingsController from './settings-controller';

class AppController {
    constructor () {
        this.main = document.querySelector('.content');
        this.homeC = new HomeController();
        this.lsModal = new LocalStorageModel();
    }
    
    startApp = () => {
        this.homeC.showHome();
        document.querySelector('.navigation__item--home').onclick = this.btnHomeHandler;
        document.querySelector('.navigation__item--cat').onclick = this.btnCategoryHandler;
        document.querySelector('.navigation__item--stat').onclick = this.btnStatHandler;
        document.querySelector('.btn-login').onclick = this.btnLoginHandler;
        document.querySelector('.btn-settings').onclick = this.btnSettingsHandler;
        document.querySelector('.settings__close').onclick = this.btnSettingsCloseHandler;
        const settingsController = new SettingsController(localStorage.currentUser);
        settingsController.start();
    }
   

    btnHomeHandler = () => {
        this.homeC.showHome();
    }

    btnCategoryHandler = () => {
        const gameType = this.lsModal.getLSsettings('currentGameType', localStorage.currentUser);
        const catC = new CategoryController(gameType ? gameType : 'painter');
        catC.getCategoryList();
    }

    btnStatHandler = () => {
        const statController = new StatController();
        statController.statPicture();
    }

    btnSettingsHandler = () => {
        document.querySelector('.settings').classList.remove('display-none');
    }

    btnSettingsCloseHandler = () => {
        const settings = document.querySelector('.settings');
        settings.classList.add('hide');
        setTimeout(() => {
            settings.classList.remove('hide');
            settings.classList.add('display-none');
        }, 1000);
    }

    btnLoginHandler = () => {
        const loginForm = document.querySelector('.login');
        loginForm.classList.remove('display-none');
        loginForm.classList.add('login__show');
        const login = new LoginController();
        login.start();
    }

}

export default AppController;
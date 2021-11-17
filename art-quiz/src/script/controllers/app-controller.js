import { HomeView } from '../views/app-view';
import HomeController from './home-controller';
import CategoryController from './category-controller';
import LocalStorageModel from '../models/local-storage-model';
import StatController from './stat-controller';

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
    }
   

    btnHomeHandler = () => {
        this.homeC.showHome();
    }

    btnCategoryHandler = () => {
        const gameType = this.lsModal.getLSsettings('currentGameType');
        const catC = new CategoryController(gameType ? gameType : 'painter');
        catC.getCategoryList();
    }

    btnStatHandler = () => {
        const statController = new StatController();
        statController.statPicture();
    }

}

export default AppController;
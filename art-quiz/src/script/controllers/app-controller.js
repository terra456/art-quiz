import { HomeView } from '../views/app-view';
import HomeController from './home-controller';
import CategoryController from './category-controller';
import LocalStorageModel from '../models/local-storage-model';

class AppController {
    constructor () {
        this.main = document.querySelector('.content');        
        this.homeC = new HomeController();        
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
        const lsModal = new LocalStorageModel();
        const gameType = lsModal.getLSsettings('currentGameType');
        const catC = new CategoryController(gameType ? gameType : 'painter');
        catC.getCategoryList();
    }

    btnStatHandler = () => {

    }

}

export default AppController;
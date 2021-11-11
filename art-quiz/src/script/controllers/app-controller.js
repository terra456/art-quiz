import { HomeView } from '../views/app-view';
import HomeController from './home-controller';

class AppController {
    constructor () {
        this.main = document.querySelector('.content');
        this.homeView = new HomeView();
    }
    
    renderHome = () => {
        const homeV = new HomeView();
        const homeC = new HomeController();
        homeV.render(this.main);
        homeC.buttonsHandler();
    }
}

export default AppController;
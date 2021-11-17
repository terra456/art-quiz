import CategoryView from '../views/category-view';
import CategoryController from './category-controller';
import HomeView from '../views/home-view'

class HomeController {
    constructor () {
        this.main = document.querySelector('.content');
        this.homeView = new HomeView();
    }

    showHome = () => {
        this.homeView.render(this.main);
        this.buttonsHandler();
    }

    buttonsHandler = () => {
        const btns = document.querySelectorAll('.btn-game');
        btns.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                console.log(el.id);
                const catC = new CategoryController(el.id);
                catC.getCategoryList();
            })
        })
    }

    categoryList = (catName) => {
        const catView = new CategoryView(catName);
        catView.render();
    }



}

export default HomeController;
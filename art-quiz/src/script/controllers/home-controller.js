import CategoryView from '../views/category-view';
import CategoryController from './category-controller';

class HomeController {
    constructor () {

    }

    buttonsHandler = () => {
        const btns = document.querySelectorAll('.btn-game');
        btns.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                console.log(el.id);
                const catCont = new CategoryController(el.id);
                catCont.getCategoryList();
            })
        })
    }

    categoryList = (catName) => {
        const catView = new CategoryView(catName);
        catView.render();
    }

}

export default HomeController;
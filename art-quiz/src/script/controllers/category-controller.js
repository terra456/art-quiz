import images from '../data/images';
import CategoryView from '../views/category-view';

class CategoryController {
    constructor(name) {
        this.name = name;
        this.rounds = [];
    }

    getCategoryList = () => {
        console.log(images.length);
        for (let i = 0; i < images.length; i = i + 10) {
            let catList = images.slice(i, i + 10);            
            if (catList.length === 10) {
                this.rounds.push( ( i / 10 )  + 1 );
                console.log(catList);                
            }
        }
        const catV = new CategoryView(this.name);
        catV.render(this.rounds);
        this.cardsClickHandler();
    }

    cardsClickHandler = () => {
        const card = document.querySelectorAll('.card');
        card.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                console.log(el.id);
            })
        });
    }

}

export default CategoryController;
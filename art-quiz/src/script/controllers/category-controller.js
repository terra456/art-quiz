import images from '../data/images';
import CategoryView from '../views/category-view';
import QuestionController from './question-controller';

class CategoryController {
    constructor(name) {
        this.name = name;
        this.rounds = [];
        this.roundsData = [];
        this.imgS = Array.from(images.map((el) => el.imageNum));
        this.painters = new Set();
    }

    getPainters = () => {
        for (let el of images) {
            this.painters.add(el.author);
        }        
    }

    getCategoryList = () => {
        console.log(images.length);
        for (let i = 0; i < images.length; i = i + 10) {
            let catList = images.slice(i, i + 10);            
            if (catList.length === 10) {
                this.rounds.push( ( i / 10 ) );

                this.roundsData.push(catList);
                // console.log(catList);
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
                if (this.name == 'painter') {
                    const questions = new QuestionController(this.name, el.id, this.roundsData[el.id], this.imgS);
                    questions.generatePainterQuestion();
                } else if (this.name == 'image') {
                    this.getPainters();
                    const questions = new QuestionController(this.name, el.id, this.roundsData[el.id], Array.from(this.painters));
                    questions.generateImageQuestion();
                }
                console.log(this.roundsData[el.id]);
            })
        });
    }



}

export default CategoryController;
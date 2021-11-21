import images from '../data/images';
import CategoryView from '../views/category-view';
import QuestionController from './question-controller';
import LocalStorageModel from '../models/local-storage-model';

class CategoryController {
    constructor(name) {
        this.name = name;
        this.rounds = [];
        this.roundsData = [];
        this.imgS = Array.from(images.map((el) => el.imageNum));
        this.painters = new Set();
        this.roundNumber = 0;
        
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
        const lsM = new LocalStorageModel();
        const res = lsM.getLScategories(localStorage.currentUser + '.' + this.name);
        console.log(res);
        lsM.setLSsettings('currentGameType', this.name, localStorage.currentUser);
        const catV = new CategoryView(this.name);
        catV.render(this.rounds, res);
        this.cardsClickHandler();
    }

    playGame = () => {
        const questions = new QuestionController(this.name, this.roundNumber, this.roundsData);
        if (this.name == 'painter') {
            questions.setAnswers(this.imgS);
            questions.generatePainterQuestion();
        } else if (this.name == 'image') {
            this.getPainters();
            questions.setAnswers(Array.from(this.painters));
            questions.generateImageQuestion();
        }
        this.roundNumber++;
    }

    cardsClickHandler = () => {
        const card = document.querySelectorAll('.card');
        card.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.roundNumber = Number(el.id);
                this.playGame();
            })
        });
    }

}

export default CategoryController;
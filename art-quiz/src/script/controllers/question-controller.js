import shuffleArray from '../data/shuffle-array';
import QuestionImageView from '../views/question-image-view';
import QuestionPainterView from '../views/question-painter-view';
import ModalView from '../views/modal-view';
import LocalStorageModel from '../models/local-storage-model';
import CategoryController from './category-controller';

class QuestionController {
    constructor (type, roundNumber, arr) {
        this.typeOfGame = type;
        this.roundNumber = roundNumber;
        this.dataAll = arr;
        this.data = this.dataAll[this.roundNumber];
        this.answers = [];
        this.questionNumber = 0;
        this.rights = 0;
        this.modal = new ModalView();
        this.lsModel = new LocalStorageModel();
    }

    setAnswers = (arr) => {
        this.answers = arr;
    }

    generateAnswers = (rightAnswer) => {
        const arr = shuffleArray(this.answers).slice(0, 3);
        if (arr.every((el) => el !== rightAnswer)) {
            return arr;
        } else {
            console.log('В ответах есть 2 правильных');
            return this.generateAnswers(rightAnswer);
        }
    }

    generateQuestion = () => {
        if (this.typeOfGame == 'painter') {
            this.generatePainterQuestion();
        } else if (this.typeOfGame == 'image') {
            this.generateImageQuestion();
        }
    }

    generateImageQuestion = () => {
        const questionDesc = this.data[this.questionNumber].imageNum;
        const rightAnswer = this.data[this.questionNumber].author;

        const falseAnswers = this.generateAnswers(rightAnswer);
        falseAnswers.push(rightAnswer);

        const questionView = new QuestionImageView();
        questionView.render(questionDesc, shuffleArray(falseAnswers), this.questionNumber, this.roundNumber);
        this.answerImageHandler(document.querySelectorAll('.btn-answer'), rightAnswer);
        document.querySelector('.question__close').onclick = this.questionCloseHandler;
    }

    generatePainterQuestion = () => {
        const questionDesc = this.data[this.questionNumber].author;
        const rightAnswer = this.data[this.questionNumber].imageNum;

        const falseAnswers = this.generateAnswers(rightAnswer);
        falseAnswers.push(rightAnswer);

        const questionView = new QuestionPainterView();
        questionView.render(questionDesc, shuffleArray(falseAnswers), this.questionNumber, this.roundNumber);
        this.answerPainterHandler(document.querySelectorAll('.question__answer'), rightAnswer);
        document.querySelector('.question__close').onclick = this.questionCloseHandler;
    }

    answerImageHandler = (nodeL, rightAnswer) => {
        nodeL.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                const res = this.isAnswerRight(el.textContent, rightAnswer);
                //set LS -1, because it change in isAnswerRight
                this.lsModel.setLSpicture(this.data[this.questionNumber - 1].imageNum, res);

                if (this.questionNumber < 10) {
                    this.generateImageQuestion();
                }
            })
        })
    }

    answerPainterHandler = (nodeL, rightAnswer) => {
        nodeL.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.isAnswerRight((el.firstChild.src).split('/').pop().split('.')[0], rightAnswer);
                if (this.questionNumber < 10) {
                    this.generatePainterQuestion();
                }
            })
        })
    }

    isAnswerRight = (answer, rightAnswer) => {
        this.modal.renderResult(`/full/${this.data[this.questionNumber].imageNum}full.jpg`,
                                this.data[this.questionNumber].author, this.data[this.questionNumber].name, true);

        const img = document.querySelector('.modal__img-wrapper');
        document.querySelector('.btn-text--next').onclick = this.questionModalHandler;

        this.questionNumber++;
        if (answer == rightAnswer) {
            this.rights++;
            
            img.classList.add('right-answer');
            return true;
        } else {
            
            img.classList.add('wrong-answer');
            console.log('Error!!!!!!!!!!');
            return false;
        }
    }

    generateResult = () => {

        setTimeout(() => {
            if (this.rights == 10) {
                this.modal.renderResult('vector/group-stars.svg', 'Велликоллепно!', 'Наши поздравления!', true);
            } else if (this.rights >= 8) {
                this.modal.renderResult('vector/cup.svg', this.rights + ' / 10', 'Поздравляем!', false);
            } else {
                this.modal.renderResult('vector/cup-broke.svg', this.rights + ' / 10', 'Cыграть снова?', false);
            }
            this.rights = 0;
        }, 500);

        //запись данных в локалсторадж
        
        this.lsModel.setLScategorie(this.typeOfGame, this.roundNumber, this.rights);

        console.log(this.roundNumber + 'right' + this.rights);
        
        
        document.querySelector('.btn-text--next').onclick = this.resultNextHandler;
        document.querySelector('.btn-text--repeat').onclick = this.resultRepeatHandler;
        
        // this.resultModalHandler();
        this.questionNumber = 0;
        
    }

    resultNextHandler = () => {
        this.roundNumber = Number(this.roundNumber) + 1;
        this.data = this.dataAll[this.roundNumber];
        this.generateQuestion();
        this.modal.close();
        
    }

    resultRepeatHandler = () => {
        this.generateQuestion();
        this.modal.close();
    }

    questionModalHandler = () => {
        this.modal.close();
        if (this.questionNumber === 10) {
                this.generateResult();
        }
    }

    questionCloseHandler = () => {
        const content = document.querySelector('.content');
        content.classList.add('disappiar');
        setTimeout(() => {
            content.classList.remove('disappiar');
            const catCont = new CategoryController(this.typeOfGame);
            catCont.getCategoryList();
        }, 500);
    }

}

export default QuestionController;
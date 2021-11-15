import shuffleArray from '../data/shuffle-array';
import QuestionImageView from '../views/question-image-view';
import QuestionPainterView from '../views/question-painter-view';
import ModalView from '../views/modal-view';

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
    }

    generatePainterQuestion = () => {
        const questionDesc = this.data[this.questionNumber].author;
        const rightAnswer = this.data[this.questionNumber].imageNum;

        const falseAnswers = this.generateAnswers(rightAnswer);
        falseAnswers.push(rightAnswer);

        const questionView = new QuestionPainterView();
        questionView.render(questionDesc, shuffleArray(falseAnswers), this.questionNumber, this.roundNumber);
        this.answerPainterHandler(document.querySelectorAll('.question__answer'), rightAnswer);
    }

    answerImageHandler = (nodeL, rightAnswer) => {
        nodeL.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.isAnswerRight(el.textContent, rightAnswer);
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
        this.modal.renderResult(`mini/${this.data[this.questionNumber].imageNum}.jpg`,
                                this.data[this.questionNumber].author, this.data[this.questionNumber].name, true);

        const img = document.querySelector('.modal__img-wrapper');
        document.querySelector('.btn-text--next').onclick = this.questionModalHandler;
        this.questionNumber++;
        if (answer == rightAnswer) {
            this.rights++;
            img.classList.remove('wrong-answer');
            img.classList.add('right-answer');
            return true;
        } else {
            img.classList.remove('right-answer');
            img.classList.add('wrong-answer');
            console.log('Error!!!!!!!!!!')
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
            this.questionNumber = 0;
            this.rights = 0;
        }, 100);

        //ToDo добавить запись данных в локалсторадж
        console.log(this.roundNumber + 'right' + this.rights);
        
        
        document.querySelector('.btn-text--next').onclick = this.resultNextHandler;
        document.querySelector('.btn-text--repeat').onclick = this.resultRepeatHandler;
        
        // this.resultModalHandler();
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

}

export default QuestionController;
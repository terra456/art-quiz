import shuffleArray from '../data/shuffle-array';
import QuestionImageView from '../views/question-image-view';
import QuestionPainterView from '../views/question-painter-view';
import ModalView from '../views/modal-view';

class QuestionController {
    constructor (type, roundNumber, data) {
        this.typeOfGame = type;
        this.roundNumber = roundNumber;
        this.dataAll = data;
        this.data = this.dataAll[roundNumber];
        this.answers = [];
        this.questionNumber = 0;
        this.rights = 0;
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

    generateImageQuestion = () => {
        const questionDesc = this.data[this.questionNumber].imageNum;
        const rightAnswer = this.data[this.questionNumber].author;

        const falseAnswers = this.generateAnswers(rightAnswer);
        falseAnswers.push(rightAnswer);

        const questionView = new QuestionImageView();
        questionView.render(questionDesc, shuffleArray(falseAnswers));
        this.answerImageHandler(document.querySelectorAll('.btn-answer'), rightAnswer);
    }

    generatePainterQuestion = () => {
        const questionDesc = this.data[this.questionNumber].author;
        const rightAnswer = this.data[this.questionNumber].imageNum;

        const falseAnswers = this.generateAnswers(rightAnswer);
        falseAnswers.push(rightAnswer);

        const questionView = new QuestionPainterView();
        questionView.render(questionDesc, shuffleArray(falseAnswers));
        this.answerPainterHandler(document.querySelectorAll('.question__answer'), rightAnswer);
    }

    answerImageHandler(nodeL, rightAnswer) {
        nodeL.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.isAnswerRight(el.textContent, rightAnswer);
                if (this.questionNumber < 10) {
                    this.generateImageQuestion();
                } else {
                    console.log(this.rights);
                    this.generateResult();                    
                }
            })
        })
    }

    answerPainterHandler(nodeL, rightAnswer) {
        nodeL.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.isAnswerRight((el.firstChild.src).split('/').pop().split('.')[0], rightAnswer);
                if (this.questionNumber < 10) {
                    this.generatePainterQuestion();
                } else {
                    console.log(this.rights);
                    this.generateResult();                    
                }
            })
        })
    }

    isAnswerRight(answer, rightAnswer) {
        this.questionNumber++;
        if (answer == rightAnswer) {
            this.rights++;
            return true;
        } else {
            console.log('Error!!!!!!!!!!')
            return false;
        }
    }

    generateResult = () => {
        const modalV = new ModalView();
        if (this.rights == 10) {
            modalV.renderWin();
        } else if (this.rights >= 8) {
            modalV.renderResult(this.rights);
        } else {
            modalV.renderGameOver();
        }

        //ToDo добавить запись данных в локалсторадж
        console.log(this.roundNumber + 'right' + this.rights);
        this.roundNumber++;
        this.questionNumber = 0;
        this.rights = 0;
        if (this.typeOfGame == 'painter') {
            this.generatePainterQuestion();
        } else if (this.typeOfGame == 'image') {
            this.generateImageQuestion();
        }
    }

}

export default QuestionController;
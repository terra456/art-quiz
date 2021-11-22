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
        this.isSound = this.lsModel.getLSsettings('isSound', localStorage.currentUser);
        this.volume = this.lsModel.getLSsettings('volume', localStorage.currentUser) / 100;
        this.isTimer = this.lsModel.getLSsettings('isTimer', localStorage.currentUser);
        this.timeSettings = this.lsModel.getLSsettings('time', localStorage.currentUser);
        this.time = this.timeSettings;
        this.timerId;
        this.correctMp3 = new Audio('./assets/audio/correct.mp3');
        this.errorMp3 = new Audio('./assets/audio/error.mp3');
        this.failureMp3 = new Audio('./assets/audio/failure.mp3');
        this.successMp3 = new Audio('./assets/audio/success.mp3');
        this.correctMp3.volume = this.volume;
        this.errorMp3.volume = this.volume;
        this.failureMp3.volume = this.volume;
        this.successMp3.volume = this.volume;
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
        if (this.isTimer) {
            questionView.renderTimerLine();
            this.startTimer();
            document.querySelector('.question__pause').onclick = this.pauseTimer;
        }
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
        if (this.isTimer) {
            questionView.renderTimerLine();
            this.startTimer();
            document.querySelector('.question__pause').onclick = this.pauseTimer;
        }
        document.querySelector('.question__close').onclick = this.questionCloseHandler;
    }

    answerImageHandler = (nodeL, rightAnswer) => {
        nodeL.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                const res = this.isAnswerRight(el.textContent, rightAnswer);
                //set LS -1, because it change in isAnswerRight
                this.lsModel.setLSpicture(this.data[this.questionNumber - 1].imageNum, res, localStorage.currentUser);

            })
        })
    }

    answerPainterHandler = (nodeL, rightAnswer) => {
        nodeL.forEach((el) => {
            el.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.isAnswerRight((el.firstChild.src).split('/').pop().split('.')[0], rightAnswer);
                
            })
        })
    }

    isAnswerRight = (answer, rightAnswer) => {
        if (this.isTimer) {
            clearTimeout(this.timerId);
        }
        this.time = this.timeSettings;
        this.modal.renderResult(`/full/${this.data[this.questionNumber].imageNum}full.jpg`,
                                this.data[this.questionNumber].author, this.data[this.questionNumber].name, true);

        const img = document.querySelector('.modal__img-wrapper');
        document.querySelector('.btn-text--next').onclick = this.questionModalHandler;
        document.querySelector('.modal__close').onclick = this.questionModalHandler;
        document.querySelector('.modal__overlay').onclick = this.questionModalHandler;

        this.questionNumber++;
        if (answer == rightAnswer) {
            this.rights++;            
            img.classList.add('right-answer');
            if (this.isSound) {
                this.correctMp3.play();
            }
            return true;
        } else {
            img.classList.add('wrong-answer');
            console.log('Error!!!!!!!!!!');
            if (this.isSound) {
                this.errorMp3.play();
            }
            return false;
        }
    }

    generateResult = () => {

        setTimeout(() => {
            if (this.rights == 10) {
                if (this.isSound) {
                    this.successMp3.play();
                }
                this.modal.renderResult('vector/group-stars.svg', 'Велликоллепно!', 'Наши поздравления!', true);
            } else if (this.rights >= 8) {
                if (this.isSound) {
                    this.successMp3.play();
                }
                this.modal.renderResult('vector/cup.svg', this.rights + ' / 10', 'Поздравляем!', false);
            } else {
                if (this.isSound) {
                    this.failureMp3.play();
                }
                this.modal.renderResult('vector/cup-broke.svg', this.rights + ' / 10', 'Cыграть снова?', false);
            }
            
            this.rights = 0;
        }, 500);

        //запись данных в локалсторадж
        
        this.lsModel.setLScategorie(this.typeOfGame, this.roundNumber, this.rights, localStorage.currentUser);

        console.log(this.roundNumber + 'right' + this.rights);
        
        
        document.querySelector('.btn-text--next').onclick = this.resultNextHandler;
        document.querySelector('.btn-text--repeat').onclick = this.resultRepeatHandler;
        document.querySelector('.modal__close').onclick = this.resultCloseHandler;
        document.querySelector('.modal__overlay').onclick = this.resultCloseHandler;
        
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

    resultCloseHandler = () => {
        const catCont = new CategoryController(this.typeOfGame);
        catCont.getCategoryList();
        this.modal.close();
    }

    questionModalHandler = () => {
        this.modal.close();
        if (this.questionNumber < 10) {
            this.generateQuestion();
        } else if (this.questionNumber === 10) {
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
            document.querySelector('.question__overlay').classList.add('display-none');
        }, 500);
    }

    startTimer = () => {
        const currentTimeDiv = document.querySelector('.question__current-time');
        const currentTimeSpan = document.querySelector('.question__time');
        this.time = this.time - 1;
        currentTimeSpan.textContent = `00:${this.time < 10 ? '0' + this.time : this.time}`;
        currentTimeDiv.style = `width: ${this.time / this.timeSettings * 100}%`;
        
        if (this.time == 0) {
            this.isAnswerRight(null, 'undefined');
            console.log('Время вышло (((');
        } else {
            this.timerId = setTimeout(this.startTimer, 1000);
        }
    }

    pauseTimer = () => {
        clearTimeout(this.timerId);
        document.querySelector('.question__pause').classList.toggle('play');
        document.querySelector('.question__pause').onclick = this.playTimer;
        document.querySelector('.question__overlay').classList.toggle('display-none');
    }

    playTimer = () => {
        this.startTimer();
        document.querySelector('.question__pause').classList.toggle('play');
        document.querySelector('.question__pause').onclick = this.pauseTimer;
        document.querySelector('.question__overlay').classList.toggle('display-none');
    }

}

export default QuestionController;
import shuffleArray from '../data/shuffle-array';
import QuestionImageView from '../views/question-image-view';
import QuestionPainterView from '../views/question-painter-view';

class QuestionController {
    constructor (type, roundNumber, data, answers) {
        this.typeOfGame = type;
        this.roundNumber = roundNumber;
        this.data = data;
        this.answers = answers;
        this.questionNumber = 0;
        this.rights = 0;
    }

    generateAnswers = (rightAnswer) => {
        const arr = shuffleArray(this.answers).slice(0, 3);
        if (arr.every((el) => el !== rightAnswer)) {
            return arr;
        } else {
            console.log('В ответах есть 2 правильных');
            this.generateAnswers(rightAnswer);
        }
        console.log(arr);
    }

    generateImageQuestion = () => {
        const questionDesc = this.data[this.questionNumber].imageNum;
        const rightAnswer = this.data[this.questionNumber].author;

        const falseAnswers = this.generateAnswers(rightAnswer);
        falseAnswers.push(rightAnswer);

        const questionView = new QuestionImageView();
        questionView.render(questionDesc, falseAnswers);
        this.answerImageHandler(document.querySelectorAll('.btn-answer'), rightAnswer);
    }

    generatePainterQuestion = () => {
        const questionDesc = this.data[this.questionNumber].author;
        const rightAnswer = this.data[this.questionNumber].imageNum;

        const falseAnswers = this.generateAnswers(rightAnswer);
        falseAnswers.push(rightAnswer);

        const questionView = new QuestionPainterView();
        questionView.render(questionDesc, falseAnswers);
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
                    // generateResult();
                }
            })
        })
    }

    isAnswerRight(answer, rightAnswer) {
        this.questionNumber++;
        if (answer == rightAnswer) {
            //ToDo добавить запись данных в локалсторадж
            console.log('right', answer);
            this.rights++;
            return true;
        } else {
            console.log('Error!!!!!!!!!!')
            return false;
        }
    }

}

export default QuestionController;
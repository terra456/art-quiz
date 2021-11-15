class QuestionPainterView {
    render (question, answers, qN, rN) {
        const content = this.container = document.querySelector('.content');
        content.innerHTML = `
            <div class="question question--pictures">
                <div class="question__timer">
                    <button class="btn btn-img btn-close"></button>
                    <input class="question__range" type="range">
                    <span class="question__time">00:25</span>
                </div>
                <h2 class="question__head">Раунд ${rN + 1}</h2>
                <p class="question__desc">${qN + 1} Найдите картину ${question}</p>
                <div class="question__answers">
                    
                </div>
            </div>
        `;
        const answersConteiner = content.querySelector('.question__answers');

        answers.forEach(el => {
            const div = document.createElement('div');
            div.classList.add('question__answer');
            div.innerHTML = `<img class="question__img" src="./assets/images/mini/${el}.jpg">`;
            answersConteiner.appendChild(div);
        });
        console.log(answers);
    }
}

export default QuestionPainterView;
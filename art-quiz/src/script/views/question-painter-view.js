class QuestionPainterView {
    render (question, answers, qN, rN) {
        const content = document.querySelector('.content');
        content.innerHTML = `
            <div class="question question--pictures">
                <div class="question__timer">
                    <span class="question__time"></span>
                    <button class="btn question__close btn-img btn-close"></button>
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
    }

    renderTimerLine = () => {
        document.querySelector('.question__timer').innerHTML = 
            `<button class="btn question__pause btn-img btn-pause"></button>
            <div class="question__range">
                <div class="question__time-line">
                    <div class="question__current-time"></div>
                </div>
            </div>
            <span class="question__time">00:05</span>
            <button class="btn question__close btn-img btn-close"></button>`;
    }
}

export default QuestionPainterView;
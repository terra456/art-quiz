class QuestionImageView {
    render (question, answers, qN, rN) {
        const content =  document.querySelector('.content');
        content.innerHTML = `
            <div class="question question--painter">
                <div class="question__timer">
                    <button class="btn question__pause btn-img btn-pause"></button>
                    <div class="question__range">
                        <div class="question__time-line">
                            <div class="question__current-time"></div>
                        </div>
                    </div>
                    <span class="question__time">00:05</span>
                    <button class="btn question__close btn-img btn-close"></button>
                </div>
                <h2 class="question__head">Раунд ${rN + 1}</h2>
                <p class="question__desc">${qN + 1} Кто автор этой картины?</p>
                <div class="question__big-img">
                    <img src="./assets/images/full/${question}full.jpg">
                </div>
                <div class="question__answers--btn">
                    
                </div>
            </div>
        `;
        const btnConteiner = content.querySelector('.question__answers--btn');

        answers.forEach(el => {
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-text', 'btn-answer');
            btn.textContent = el;
            btnConteiner.appendChild(btn);
        });
        console.log(answers);
    }
}

export default QuestionImageView;
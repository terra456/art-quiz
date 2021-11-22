import images from '../data/images';

class CategoryView {
    constructor (name) {
        this.name = name;
    }

    render = (arrRounds, results) => {
        console.log(results);
        const conteiner = document.querySelector('.content');
        conteiner.innerHTML = `
            <h2 class="content__head">Категория ${this.name}</h2>
            <div class="content__cards"><div>
            `;

        const cardsDiv = conteiner.querySelector('.content__cards');

        for (let round of arrRounds) {
            const card = document.createElement('div');
            card.id = round;
            card.classList.add('card');
            card.innerHTML = `
            <div class="card__rait"></div>
            <img class="card__img" src="./assets/images/mini/${this.name === 'painter' ? images[round * 10].imageNum : images[(round * 10) + 2].imageNum}.jpg">
            `;
            
            if (results && results[round]) {
                card.firstElementChild.innerHTML = `<span>Раунд ${round + 1}</span><span>${results[round]} / 10</span>`;
                card.classList.add('card--play');
            } else {
                card.firstElementChild.innerHTML = `<span>Раунд ${round + 1}</span>`;
            }
            
            cardsDiv.appendChild(card);
        }
    }
}

export default CategoryView;
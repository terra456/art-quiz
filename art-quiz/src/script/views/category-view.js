import images from '../data/images';

class CategoryView {
    constructor (name) {
        this.name = name;
    }

    render = (arrRounds) => {
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
                            <div class="card__rait">8/10</div>
                            <img class="card__img" src="./assets/images/mini/${images[round * 10].imageNum}.jpg">
                        `;
            cardsDiv.prepend(card);
        }

    } 
}

export default CategoryView;
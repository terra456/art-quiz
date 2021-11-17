import images from '../data/images';

class StatPictureView {
    constructor() {

    }

    render = (results) => {
        const conteiner = document.querySelector('.content');
        conteiner.innerHTML = `
                <h2 class="content__head">Статистика</h2>
                <nav class="navigation">
                    <ul class="navigation__list">
                        <li class="navigation__item navigation__item--pictures">
                            <a class="navigation__link" href="#">Картины</a>
                        </li>
                        <li class="navigation__item navigation__item--res">
                            <a class="navigation__link" href="#">Результаты</a>
                        </li>
                        <li class="navigation__item navigation__item--rate">
                            <a class="navigation__link" href="#">Рейтинг</a>
                        </li>
                    </ul>
                </nav>
                <div class="content__cards"><div>
                `;
        this.renderPictures(results);
    }

    renderPictures = (results) => {
        const content = document.querySelector('.content__cards');
        content.innerHTML = '';

        for (let picture of images) {
            const card = document.createElement('div');
            card.id = picture.imageNum;
            card.classList.add('card');
            card.innerHTML = `
                            <div class="card__info">
                                <p class="card__author">${picture.author}</p>
                                <p class="card__name">${picture.name}</p>
                                <p class="card__year">${picture.year}</p>
                            </div>
                            <img class="card__img" src="./assets/images/mini/${picture.imageNum}.jpg">
            `;
            if (results && results[picture.imageNum]) {
                card.classList.add('card--play');
            }
            content.appendChild(card);
        }
    }

    renderResult = (pic, art) => {
        console.log(pic, art);
        const content = document.querySelector('.content__cards');
        content.innerHTML = `<p class="content__desk"><p>
                            <table class="content__table">
                                <thead>
                                    <th>Номер раунда</th>
                                    <th>Картины</th>
                                    <th>Художники</th>
                                    <th>Итог</th>
                                </thead>
                                <tbody></tbody>
                                <tfoot>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tfoot>
                            </table>`;

        const table = document.querySelector('tbody');
        for (let i = 0; i <= 120; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<th>Раунд № ${ i + 1 }</th>
                            <th>${pic[i]}</th>
                            <th>${art[i]}</th>
                            <th><img src="./assets/images/vector/${(pic[i] >= 1 && art[i] >= 1) ? 'check-true' : 'check-false'}.svg"></th>
                            `;
            table.appendChild(tr);
        }

    }

    renderRate = (userList, currentRes) => {

    }
}

export default StatPictureView;
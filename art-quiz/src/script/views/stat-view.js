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
            // card.classList.add('card--statistic');
            card.innerHTML = `
                            
                            <img class="card__img" src="./assets/images/mini/${picture.imageNum}.jpg">
            `;
            if (results && results[picture.imageNum] === true) {
                console.log(results[picture.imageNum], picture.imageNum);
                card.classList.add('card--good');
            } else if (results && results[picture.imageNum] === false) {
                console.log(results[picture.imageNum], picture.imageNum);
                card.classList.add('card--bad');
            }
            content.appendChild(card);
        }
    }

    renderResult = (pic, art, p, a) => {
        const content = document.querySelector('.content__cards');
        
        content.innerHTML = `
                            <table class="content__table">
                                <thead>
                                    <th>Номер раунда</th>
                                    <th>Картины</th>
                                    <th>Художники</th>
                                    <th>Итог</th>
                                </thead>
                                <tbody></tbody>
                                <tfoot>
                                    <th>Среднее значение</th>
                                    <th>${p}</th>
                                    <th>${a}</th>
                                    <th></th>
                                </tfoot>
                            </table>`;

        const table = document.querySelector('tbody');
        for (let i = 0; i < 24; i++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>Раунд № ${ i + 1 }</td>
                            <td>${pic[i] ? pic[i] : '&ndash;'}</td>
                            <td>${art[i] ? art[i] : '&ndash;'}</td>
                            <td><img src="./assets/images/vector/${(pic[i] >= 1 && art[i] >= 1) ? 'check-true' : 'check-false'}.svg"></td>
                            `;
            table.appendChild(tr);
        }

    }

    renderRate = (userList, currentUser) => {
        const content = document.querySelector('.content__cards');
        const bestResult = userList[0].result;
        content.innerHTML = `<table class="content__table content__table--stat">
                                <thead>
                                    <th>Позиция</th>
                                    <th>Имя пользователя</th>
                                    <thclass="content__table--result"></th>
                                    <th>Результат</th>
                                </thead>
                                <tbody></tbody></table>`;
        const table = document.querySelector('tbody');
        for (let i = 0; i < userList.length; i++) {
            let user = userList[i];
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${ i + 1 }</td>
                            <td>${ user.userName }</td>
                            <td class="content__table--result"><div style="width: ${ user.result / bestResult * 100 }%; height: 10px; background-color: ${ user.userName == currentUser ? 'red' : 'white'}"><div></td>
                            <td>${ user.result }</td>
                            `;
            
            table.appendChild(tr);
        }
    }
}

export default StatPictureView;
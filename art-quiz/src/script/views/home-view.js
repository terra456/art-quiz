class HomeView {
    constructor () {
        this.a = 0;
    }

    render = (parent) => {
        console.log('Home');
        parent.innerHTML = 
                        `<div class="content__home">
                            <button id="painter" class="btn btn-text btn-game">
                                угадать картину по имени её автора                            
                            </button>
                            <button id="image" class="btn btn-text btn-game">
                                угадать художника по картине
                            </button>
                        </div>`;
    } 
}

export default HomeView;
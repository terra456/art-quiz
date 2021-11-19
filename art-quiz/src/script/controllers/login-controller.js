import LocalStorageModel from '../models/local-storage-model';

class LoginController {
    constructor() {
        this.lSmodel = new LocalStorageModel();
    }

    login = (name, password) => {
        this.lSmodel.setLSparam('currentUser', name);
        // todo проверка пользователя и пароля

        document.querySelector('.login').classList.add('display-none');
        document.querySelector('.header__my-name').textContent = name;
        document.querySelector('.login__message').textContent = 'Добро пожаловать, ' + name;
        document.querySelector('.login__inputs').classList.add('display-none');
        document.querySelector('.btn-text-logout').classList.remove('display-none');
        document.querySelector('.btn-text-login').classList.add('display-none');
        document.querySelector('.btn-text-register').classList.add('display-none');

    }

    logout = () => {
        this.lSmodel.setLSparam('currentUser', 'user');

        document.querySelector('.login').classList.add('display-none');
        document.querySelector('.header__my-name').textContent = '';
        document.querySelector('.login__inputs').classList.remove('display-none')
        document.querySelector('.login__message').textContent = '';
        document.querySelector('.btn-text-logout').classList.add('display-none');
        document.querySelector('.btn-text-login').classList.remove('display-none');
        document.querySelector('.btn-text-register').classList.remove('display-none');
    }

    closeLoginForm = () => {
        document.querySelector('.login').classList.add('display-none');
    }

    createUser = (name, password) => {
        this.lSmodel.setLSsettings('name', name, name);
        this.lSmodel.setLSsettings('password', password, name);
        this.login(name, password);
    }

    start = () => {
        const loginForm = document.querySelector('.login__form');
        console.log(loginForm.querySelector('#userName').value);
        loginForm.querySelector('.btn-text-login').addEventListener('click', (evt) => {
            evt.preventDefault();
            this.login(loginForm.querySelector('#userName').value, loginForm.querySelector('#userPass').value);
        })
        loginForm.querySelector('.btn-text-register').addEventListener('click', (evt) => {
            evt.preventDefault();
            this.createUser(loginForm.querySelector('#userName').value, loginForm.querySelector('#userPass').value);
        })
        loginForm.querySelector('.btn-text-logout').addEventListener('click', (evt) => {
            evt.preventDefault();
            this.logout();
        })
        document.querySelector('.login__close').addEventListener('click', (evt) => {
            evt.preventDefault();
            this.closeLoginForm();
        })
    }
    
}

export default LoginController;
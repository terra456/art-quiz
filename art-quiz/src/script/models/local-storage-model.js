class LocalStorageModel {
    getLScategories = (key) => {
        if (localStorage.getItem(key)) {
            console.log(key);
            const lsData = JSON.parse(localStorage.getItem(key));
            return lsData;       
        } else {
            return;
        }
    }

    getLSsettings = (field) => {
        if (localStorage.user) {
            return localStorage.user[field];
        } else {
            return false;
        }
    }

    setLSparam = (key, value) => {
        localStorage[key] = value;
    }

    setLSsettings = (field, value) => {
        if (!localStorage.user) {
            let res = {};
            res[field] = value;
            localStorage.setItem('user', JSON.stringify(res));
        } else {
            let res = this.getLScategories('user');
            console.log(res);
            if (res) {
                res[field] = value;
            } else {
                res = {};
                res[field] = value;
            }
            let jsData = JSON.stringify(res);
            localStorage.user = jsData;
        }
    }

    setLScategorie = (key, roundN, right) => {
        let res = this.getLScategories(key);
        console.log(res);

        if (res) {
            if (!res[roundN] || res[roundN] < right) {
                res[roundN] = right;
            };
        } else {
            res = {};
            res[roundN] = right;
        }
        let jsData = JSON.stringify(res);
        console.log(jsData);
        localStorage[key] = jsData;
    }

    setLSpicture = (N, answer) => {
        let res = this.getLScategories('pictures');
        console.log(res);

        if (res) {
            res[N] = answer;
        } else {
            res = {};
            res[N] = answer;
        }

        let jsData = JSON.stringify(res);
        console.log(jsData);
        localStorage['pictures'] = jsData;
    }

}

export default LocalStorageModel;
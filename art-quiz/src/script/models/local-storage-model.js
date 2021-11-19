class LocalStorageModel {

    getLScategories = (key) => {
        let str = localStorage.getItem(key);
        if (str.startsWith('{')) {
            console.log(str, str.startsWith('{'));
            const lsData = JSON.parse(str);
            if (lsData) {
                return lsData;   
            } else {
                return;
            }
        } else {
            return;
        }
    }

    getLSsettings = (field, userName = 'user') => {
        if (localStorage[userName]) {
            const res = this.getLScategories(userName);
            if (res) {
                console.log(res);
                return res[field] ? res[field] : null;
            } else {
                return;
            }
        } else {
            return false;
        }
    }

    getLSparam = (key) => {
        return localStorage[key];
    }

    setLSparam = (key, value) => {
        localStorage[key] = value;
    }

    setLSsettings = (field, value, userName = 'user') => {
        if (!localStorage[userName]) {
            let res = {};
            res[field] = value;
            localStorage.setItem(userName, JSON.stringify(res));
        } else {
            let res = this.getLScategories(userName);
            console.log(res);
            if (res) {
                res[field] = value;
            } else {
                res = {};
                res[field] = value;
            }
            let jsData = JSON.stringify(res);
            localStorage[userName] = jsData;
        }
    }

    setLScategorie = (key, roundN, right, userName = 'user') => {
        let res = this.getLScategories(userName + '.' + key);
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
        localStorage[userName + '.' + key] = jsData;
    }

    setLSpicture = (N, answer, userName = 'user') => {
        let res = this.getLScategories(userName + '.' + 'pictures');
        console.log(res);

        if (res) {
            res[N] = answer;
        } else {
            res = {};
            res[N] = answer;
        }

        let jsData = JSON.stringify(res);
        console.log(jsData);
        localStorage[userName + '.' + 'pictures'] = jsData;
    }

}

export default LocalStorageModel;
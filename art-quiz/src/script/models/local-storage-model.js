class LocalStorageModel {
    getLScategories = (key) => {
        const lsData = JSON.parse(localStorage.getItem(key))
        // const lsData = localStorage.getItem(key);
        return lsData;
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
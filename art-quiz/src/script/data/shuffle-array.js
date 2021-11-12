const shuffleArray = (arr) => {
    console.log(arr);
    return arr.sort(() => {
        return Math.random() - 0.5;
    });
}

export default shuffleArray;
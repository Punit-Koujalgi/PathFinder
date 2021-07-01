const prepareData = (state) => {
    let data = {};
    for (let i = 0; i < state.animate.rows; i++) {
        for (let j = 0; j < state.animate.cols; j++) {
            let id = ["d", i, j].join("_");
            data[id] = state.board[id];
        }
    }
    return data;
};

const RandomMaze = (state) => {
    let data = prepareData(state);

    let nodesToWalls = [];
    Object.keys(data).forEach((node) => {
        let randomOne = Math.random();
        let randomTwo = 0.25;
        let discardClasses = ["start", "target", "wall"];
        if (randomOne < randomTwo && !discardClasses.includes(data[node])) {
            nodesToWalls.push(node);
        }
    });
    return nodesToWalls;
};

export default RandomMaze;

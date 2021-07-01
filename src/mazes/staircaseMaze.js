const prepareData = (state) => {
    let data = { rows: state.animate.rows, cols: state.animate.cols };

    for (let i = 0; i < data.rows; i++) {
        for (let j = 0; j < data.cols; j++) {
            let id = ["d", i, j].join("_");
            if (state.board[id] === "start") data["start"] = id;
            else if (state.board[id] === "target") data["target"] = id;
            else data[id] = state.board[id];
        }
    }
    return data;
};

const staircaseMaze = (state) => {
    let data = prepareData(state);
    let nodesToWalls = [];
    let currentX = math.floor(Math.random() * data.rows);
    let currentY = 0;
    let directions = ["up", "down"];
    let direction = directions[Math.floor(Math.random() * 2)];
    while (currentY < data.cols) {
        if (direction === "up") {
            while (currentX >= 1 && currentY < data.cols) {
                let id = `d_${currentX}_${currentY}`;
                nodesToWalls.push(id);
                currentX--;
                currentY++;
            }
            direction = "down";
        } else {
            while (currentX <= data.rows - 2 && currentY < data.cols) {
                let id = `d_${currentX}_${currentY}`;
                nodesToWalls.push(id);
                currentX++;
                currentY++;
            }
            direction = "up";
        }
    }
    return nodesToWalls;
};

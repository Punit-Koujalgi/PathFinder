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

export const prepareData = prepareData;

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

const generateMaze = (
    data,
    nodesToWalls,
    rowStart,
    rowEnd,
    colStart,
    colEnd,
    orientation,
    surroundingWalls
) => {
    if (rowEnd < rowStart || colEnd < colStart) return;

    if (!surroundingWalls) {
        Object.keys(data).forEach((node) => {
            if (data[node] !== "start" || data[node] !== "target") {
                let r = parseInt(node.split("_")[1]);
                let c = parseInt(node.split("_")[2]);
                if (
                    r === 0 ||
                    c === 0 ||
                    r === data.rows - 1 ||
                    c === data.cols - 1
                ) {
                    nodesToWalls.push(node);
                }
            }
        });
        surroundingWalls = true;
    }
    if (orientation === "horizontal") {
        let possibleRows = [];
        for (let i = rowStart; i <= rowEnd; i += 2) possibleRows.push(i);
        let possibleCols = [];
        for (let i = colStart - 1; i <= colEnd + 1; i += 2)
            possibleCols.push(i);
        let randomRow = Math.floor(Math.random() * (possibleRows.length + 1));
        let randomCol = Math.floor(Math.random() * (possibleCols.length + 1));
        let currentRow = possibleRows[randomRow];
        let colRandom = possibleCols[randomCol];
        Object.keys(data).forEach((node) => {
            let r = parseInt(node.split("_")[1]);
            let c = parseInt(node.split("_")[2]);
            if (
                r === currentRow &&
                c !== colRandom &&
                c >= colStart - 1 &&
                c <= colEnd + 1
            ) {
                nodesToWalls.push(node);
            }
        });
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            generateMaze(
                data,
                nodesToWalls,
                rowStart,
                currentRow - 2,
                colStart,
                colEnd,
                orientation,
                surroundingWalls
            );
        } else {
            generateMaze(
                data,
                nodesToWalls,
                rowStart,
                currentRow - 2,
                colStart,
                colEnd,
                "vertical",
                surroundingWalls
            );
        }

        if (rowEnd - (currentRow + 2) > colStart - colEnd) {
            generateMaze(
                data,
                nodesToWalls,
                currentRow + 2,
                rowEnd,
                colStart,
                colEnd,
                orientation,
                surroundingWalls
            );
        } else {
            generateMaze(
                data,
                nodesToWalls,
                currentRow + 2,
                rowEnd,
                colStart,
                colEnd,
                "vertical",
                surroundingWalls
            );
        }
    } else {
        let possibleCols = [];
        for (let i = colStart; i <= colEnd; i += 2) {
            possibleCols.push(i);
        }
        let possibleRows = [];
        for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) {
            possibleRows.push(i);
        }
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        Object.keys(data).forEach((node) => {
            let r = parseInt(node.split("_")[1]);
            let c = parseInt(node.split("_")[2]);
            if (
                c === currentCol &&
                r !== rowRandom &&
                r >= rowStart - 1 &&
                r <= rowEnd + 1
            ) {
                nodesToWalls.push(node);
            }
        });
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            generateMaze(
                data,
                nodesToWalls,
                rowStart,
                rowEnd,
                colStart,
                currentCol - 2,
                "horizontal",
                surroundingWalls
            );
        } else {
            generateMaze(
                data,
                nodesToWalls,
                rowStart,
                rowEnd,
                colStart,
                currentCol - 2,
                orientation,
                surroundingWalls
            );
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            generateMaze(
                data,
                nodesToWalls,
                rowStart,
                rowEnd,
                currentCol + 2,
                colEnd,
                "horizontal",
                surroundingWalls
            );
        } else {
            generateMaze(
                data,
                nodesToWalls,
                rowStart,
                rowEnd,
                currentCol + 2,
                colEnd,
                orientation,
                surroundingWalls
            );
        }
    }
};

const recursiveDivisionMaze = (state) => {
    let data = prepareData(state);
    let nodesToWalls = [];
    generateMaze(
        data,
        nodesToWalls,
        2,
        data.rows - 3,
        2,
        data.cols - 3,
        "horizontal",
        false
    );
    return nodesToWalls;
};

export default recursiveDivisionMaze;

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

let nodesVisited = [];
let shortestPath = [];
let prevNodes = {};
let queue = [];
let reachedEnd = false;
const dr = [-1, +1, 0, 0];
const dc = [0, 0, +1, -1];
const getNeighbours = (s, data) => {
    const [d, row, col] = s.split("_");
    for (let i = 0; i < 4; i++) {
        const rr = +row + dr[i];
        const cc = +col + dc[i];

        if (rr < 0 || cc < 0) continue;
        if (rr >= data.rows || cc >= data.cols) continue;

        const node = ["d", rr, cc].join("_");
        if (nodesVisited.includes(node)) {
            continue;
        }
        if (data[node] === "wall") continue;

        nodesVisited.push(node);
        prevNodes[node] = s;
        queue.push(node);
    }
};

const getShortestPath = (target, prevNodes) => {
    if (!reachedEnd) {
        shortestPath = [];
        return;
    }

    let node = target;
    while (node !== null) {
        shortestPath.push(node);
        node = prevNodes[node];
    }
    shortestPath.reverse();
};

const bfs = (state) => {
    let data = prepareData(state);
    let s = data.start;
    queue.push(s);
    nodesVisited.push(s);
    prevNodes[s] = null;
    while (queue.length !== 0) {
        s = queue.shift();
        if (s === data.target) {
            nodesVisited.push(s);
            reachedEnd = true;
            break;
        }
        getNeighbours(s, data);
    }
    getShortestPath(data.target, prevNodes);

    return [reachedEnd, nodesVisited, shortestPath];
};

export default bfs;

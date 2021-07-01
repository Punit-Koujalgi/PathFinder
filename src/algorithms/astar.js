const getManhattanDist = (s, t) => {
    const [, x1, y1] = s.split("_");
    const [, x2, y2] = t.split("_");
    return Math.abs(+x1 - +x2) + Math.abs(+y1 - +y2);
};

const preProcessData = (state) => {
    let data = { rows: state.animate.rows, cols: state.animate.cols };
    let gScore = {};
    let fScore = {};
    let heuristic = {};
    let visited = {};
    //let visited = {};
    for (let i = 0; i < data.rows; i++) {
        for (let j = 0; j < data.cols; j++) {
            let id = ["d", i, j].join("_");
            if (state.board[id] === "target") {
                data["target"] = id;
            }
        }
    }
    for (let i = 0; i < data.rows; i++) {
        for (let j = 0; j < data.cols; j++) {
            let id = ["d", i, j].join("_");
            if (state.board[id] === "start") {
                data["start"] = id;
                gScore[id] = 0;
                heuristic[id] = getManhattanDist(id, data.target);
                fScore[id] = heuristic[id];
            } else if (state.board[id] === "target") {
                gScore[id] = null;
                data["target"] = id;
                heuristic[id] = 0;
                fScore[id] = null;
            } else {
                gScore[id] = null;
                data[id] = state.board[id];
                heuristic[id] = getManhattanDist(id, data.target);
                fScore[id] = null;
            }
            visited[id] = false;
        }
    }
    return [data, gScore, heuristic, fScore, visited];
};

const getNeighbours = (s, data) => {
    let neighs = [];
    const dr = [-1, +1, 0, 0];
    const dc = [0, 0, +1, -1];
    const [d, row, col] = s.split("_");
    for (let i = 0; i < 4; i++) {
        const rr = +row + dr[i];
        const cc = +col + dc[i];

        if (rr < 0 || cc < 0) continue;
        if (rr >= data.rows || cc >= data.cols) continue;

        const node = ["d", rr, cc].join("_");
        if (data[node] === "wall") continue;
        neighs.push(node);
    }

    return neighs;
};

const getShortestPath = (target, prevNodes, reachedEnd) => {
    if (!reachedEnd) return [];
    let shortestPath = [];
    let node = target;
    while (node !== null) {
        shortestPath.push(node);
        node = prevNodes[node];
    }
    return shortestPath.reverse();
};

const getMinimum = (pq) => {
    let keys = Object.keys(pq);
    let minKey = keys[0];
    for (let key of keys) {
        if (pq[key] < pq[minKey]) minKey = key;
    }
    delete pq[minKey];
    console.log("minkey", minKey);
    return minKey;
};

const astar = (state) => {
    const [data, gScore, heuristic, fScore, visited] = preProcessData(state);
    for (let [key, value] of Object.entries(heuristic)) {
        console.log(key, value);
    }
    let prevNodes = {};
    let pq = {};
    let reachedEnd = false;
    pq[data.start] = fScore[data.start];
    prevNodes[data.start] = null;
    let nodesVisited = [];
    while (Object.keys(pq).length !== 0) {
        let m = getMinimum(pq);
        visited[m] = true;
        nodesVisited.push(m);
        let neighs = getNeighbours(m, data);
        //console.log(neighs);
        for (let neigh of neighs) {
            if (visited[neigh]) continue;
            let g_temp = gScore[m] + 1;
            if (gScore[neigh] === null || g_temp < gScore[neigh]) {
                prevNodes[neigh] = m;
                gScore[neigh] = g_temp;
                fScore[neigh] = gScore[neigh] + heuristic[neigh];
                //console.log(Object.keys(pq));
                if (Object.keys(pq).includes(neigh) === false) {
                    pq[neigh] = fScore[neigh];
                }
            }
        }
        if (m === data.target) {
            reachedEnd = true;
            break;
        }
    }
    let shortestPath = getShortestPath(data.target, prevNodes, reachedEnd);
    return [reachedEnd, nodesVisited, shortestPath];
};
export default astar;

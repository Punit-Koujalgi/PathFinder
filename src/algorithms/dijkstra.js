const prepareData = (state) => {
    let data = { rows: state.animate.rows, cols: state.animate.cols };
    let dist = {};
    let visited = {};
    for (let i = 0; i < data.rows; i++) {
        for (let j = 0; j < data.cols; j++) {
            let id = ["d", i, j].join("_");
            if (state.board[id] === "start") {
                data["start"] = id;
                dist[id] = 0;
            } else if (state.board[id] === "target") {
                dist[id] = null;
                data["target"] = id;
            } else {
                dist[id] = null;
                data[id] = state.board[id];
            }
            visited[id] = false;
        }
    }
    return [data, dist, visited];
};

const getMinimum = (pq) => {
    let keys = Object.keys(pq);
    let minKey = keys[0];
    for (let key of keys) {
        if (pq[key] < pq[minKey]) minKey = key;
    }
    delete pq[minKey];
    return minKey;
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

const dijkstra = (state) => {
    let [data, dist, visited] = prepareData(state);
    let nodesVisited = [];
    let prevNodes = {};
    let reachedEnd = false;
    let pq = {};
    pq[data.start] = 0;
    prevNodes[data.start] = null;
    while (Object.keys(pq).length !== 0) {
        let m = getMinimum(pq);
        visited[m] = true;
        nodesVisited.push(m);
        let neighs = getNeighbours(m, data);
        for (let neigh of neighs) {
            if (visited[neigh]) continue;
            let newDist = dist[m] + 1;
            if (dist[neigh] === null || newDist < dist[neigh]) {
                prevNodes[neigh] = m;
                dist[neigh] = newDist;
                pq[neigh] = newDist;
            }
        }
        if (m == data.target) {
            reachedEnd = true;
            break;
        }
    }
    let shortestPath = getShortestPath(data.target, prevNodes, reachedEnd);
    return [reachedEnd, nodesVisited, shortestPath];
};

export default dijkstra;

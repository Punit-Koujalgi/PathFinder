import { Navbar } from "react-bootstrap";
import "./visualize.css";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import dijkstra from "../algorithms/dijkstra";
import astar from "../algorithms/astar";
import bestFirstSearch from "../algorithms/bestFirstSearch";
import recursiveDivisionMaze from "../mazes/recursiveDivisionMaze";
import staircaseMaze from "../mazes/staircaseMaze";
import RandomMaze from "../mazes/randomMaze";
import { animationActions, boardActions } from "../store/board";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const animateShortestPathNodes = (shortestPath, dispatch) => {
    for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
            document.getElementById("clearPath").className = document
                .getElementById("clearPath")
                .className.replace("disabled", "");
            document.getElementById("clearBoard").className = document
                .getElementById("clearBoard")
                .className.replace("disabled", "");

            const node = shortestPath[i];
            if (
                document.getElementById(node).className === "start visitedNode"
            ) {
                document.getElementById(node).className = "start shortestPath";
            } else if (
                document.getElementById(node).className === "target visitedNode"
            ) {
                document.getElementById(node).className = "target shortestPath";
            } else if (
                document.getElementById(node).className === "visitedNode"
            ) {
                document.getElementById(node).className = "shortestPath";
            }
        }, 50 * i);
    }
};

function animateWallsMaze(index, nodesToWalls, dispatch) {
    setTimeout(() => {
        if (index === nodesToWalls.length) {
            return;
        }
        dispatch(
            boardActions.setClass({
                id: nodesToWalls[index],
                class: "wall",
            })
        );
        animateWallsMaze(index + 1, nodesToWalls, dispatch);
    }, 5);
}

let reachedEnd, nodesVisited, shortestPath;
const Visualize = () => {
    const state = useSelector((state) => state);
    //console.log(state);
    const dispatch = useDispatch();

    const onClickHandler = (event) => {
        let algoSelected = event.target.innerText.split(" ")[1];
        if (algoSelected === "BFS") {
            [reachedEnd, nodesVisited, shortestPath] = bfs(state);
            console.log(nodesVisited, shortestPath);
        } else if (algoSelected === "Dijkstra") {
            [reachedEnd, nodesVisited, shortestPath] = dijkstra(state);
            console.log(nodesVisited, shortestPath);
        } else if (algoSelected === "A*") {
            [reachedEnd, nodesVisited, shortestPath] = astar(state);
            console.log(nodesVisited, shortestPath);
        } else if (algoSelected === "DFS") {
            [reachedEnd, nodesVisited, shortestPath] = dfs(state);
            console.log(nodesVisited, shortestPath);
        } else if (algoSelected === "BestFS") {
            [reachedEnd, nodesVisited, shortestPath] = bestFirstSearch(state);
            console.log(nodesVisited, shortestPath);
        } else {
            document.getElementById("visualize").innerText =
                "Pick an Algorithm!";
            return;
        }
        document.getElementById("clearBoard").className += " disabled";
        document.getElementById("algo").className += " disabled";
        document.getElementById("visualize").className += " disabled";
        document.getElementById("maze").className += " disabled";
        document.getElementById("clearPath").className += " disabled";
        dispatch(animationActions.setVisualize(true));
        for (let i = 0; i <= nodesVisited.length; i++) {
            if (i === nodesVisited.length) {
                setTimeout(() => {
                    if (reachedEnd)
                        animateShortestPathNodes(shortestPath, dispatch);
                }, 20 * i);
                return;
            }
            setTimeout(() => {
                const node = nodesVisited[i];
                if (state.board[node] === "start") {
                    document.getElementById(node).className =
                        "start visitedNode";
                } else if (state.board[node] === "target") {
                    document.getElementById(node).className =
                        "target visitedNode";
                } else {
                    document.getElementById(node).className = "visitedNode";
                }
            }, 20 * i);
        }
    };

    const onClearPath = () => {
        for (let key of nodesVisited) {
            if (
                document.getElementById(key).className === "start shortestPath"
            ) {
                document.getElementById(key).className = "start";
            } else if (
                document.getElementById(key).className === "target shortestPath"
            ) {
                document.getElementById(key).className = "target";
            } else if (
                document.getElementById(key).className === "shortestPath" ||
                document.getElementById(key).className === "visitedNode"
            ) {
                document.getElementById(key).className = "unvisited";
            }
        }
        document.getElementById("algo").className =
            "btn btn-primary dropdown-toggle shadow-none navButton";
        document.getElementById("visualize").className = document
            .getElementById("visualize")
            .className.replace("disabled", "");
        document.getElementById("maze").className =
            "btn btn-primary dropdown-toggle shadow-none navButton";

        dispatch(animationActions.setVisualize(false));
    };

    const onClearBoard = (event) => {
        let wallNodes = [];
        for (let [key, value] of Object.entries(state.board)) {
            if (value === "wall") wallNodes.push(key);
            else if (value === "start" && document.getElementById(key))
                document.getElementById(key).className = "start";
            else if (value === "target" && document.getElementById(key))
                document.getElementById(key).className = "target";
            else if (document.getElementById(key))
                document.getElementById(key).className = "unvisited";
        }
        for (let key of wallNodes) {
            dispatch(boardActions.setClass({ id: key, class: "unvisited" }));
        }

        document.getElementById("algo").className =
            "btn btn-primary dropdown-toggle shadow-none navButton";
        document.getElementById("visualize").className = document
            .getElementById("visualize")
            .className.replace("disabled", "");
        document.getElementById("maze").className =
            "btn btn-primary dropdown-toggle shadow-none navButton";

        dispatch(animationActions.setVisualize(false));
    };

    const onBFS = (event) => {
        document.getElementById("visualize").innerHTML = "Visualize BFS";
    };

    const ondijkstra = (event) => {
        document.getElementById("visualize").innerHTML = "Visualize Dijkstra";
    };

    const onAstar = (event) => {
        document.getElementById("visualize").innerHTML = "Visualize A*";
    };

    const onGreedy = () => {
        document.getElementById("visualize").innerHTML = "Visualize BestFS";
    };
    const onDFS = () => {
        document.getElementById("visualize").innerHTML = "Visualize DFS";
    };

    const onRecursiveDivision = () => {
        const nodesToWalls = recursiveDivisionMaze(state);
        console.log(nodesToWalls);
        animateWallsMaze(0, nodesToWalls, dispatch);
    };

    const onStaircase = () => {
        const nodesToWalls = staircaseMaze(state);
        animateWallsMaze(0, nodesToWalls, dispatch);
    };

    const onRandomMaze = () => {
        const nodesToWalls = RandomMaze(state);
        console.log(nodesToWalls);
        animateWallsMaze(0, nodesToWalls, dispatch);
    };

    return (
        <Navbar style={{ backgroundColor: "#34495e" }} expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <div className="container-fluid d-flex justify-content-center">
                    <div className="col-md d-flex justify-content-center">
                        <button
                            id="clearBoard"
                            className="btn shadow-none navButton navs"
                            onClick={onClearBoard}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Tooltip on top">
                            Clear Board
                        </button>
                    </div>
                    <div className="col-md d-flex justify-content-center">
                        <div className="dropdown">
                            <button
                                id="algo"
                                type="button"
                                className="btn btn-primary dropdown-toggle shadow-none navButton"
                                data-toggle="dropdown">
                                Algorithms
                            </button>
                            <ul className="dropdown-menu">
                                <li className="dropdown-item" onClick={onBFS}>
                                    Breadth First Search
                                </li>
                                <div className="dropdown-divider"></div>
                                <li className="dropdown-item" onClick={onAstar}>
                                    A* Algorithm
                                </li>
                                <div className="dropdown-divider"></div>
                                <li
                                    className="dropdown-item"
                                    onClick={onGreedy}>
                                    Best first Search{" "}
                                </li>
                                <div className="dropdown-divider"></div>
                                <li
                                    className="dropdown-item"
                                    onClick={ondijkstra}>
                                    Dijkstra's Algorithm
                                </li>
                                <div className="dropdown-divider"></div>
                                <li className="dropdown-item" onClick={onDFS}>
                                    Depth First Search
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md my-sm-2 d-flex justify-content-center">
                        <button
                            id="visualize"
                            className="btn visualize shadow-none"
                            onClick={onClickHandler}>
                            Visualize!
                        </button>
                    </div>
                    <div className="container col-md d-flex justify-content-center">
                        <div className="dropdown">
                            <button
                                id="maze"
                                type="button"
                                className="btn btn-primary dropdown-toggle shadow-none navButton"
                                data-toggle="dropdown">
                                Generate maze
                            </button>
                            <ul className="dropdown-menu">
                                <li
                                    className="dropdown-item"
                                    onClick={onRecursiveDivision}>
                                    Recursive Division
                                </li>
                                <div className="dropdown-divider"></div>
                                <li
                                    className="dropdown-item"
                                    onClick={onStaircase}>
                                    Stair-case Maze
                                </li>
                                <div className="dropdown-divider"></div>
                                <li
                                    className="dropdown-item"
                                    onClick={onRandomMaze}>
                                    Random Maze
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md d-flex justify-content-center">
                        <button
                            id="clearPath"
                            className="btn shadow-none navButton navs"
                            onClick={onClearPath}>
                            Clear Path
                        </button>
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Visualize;

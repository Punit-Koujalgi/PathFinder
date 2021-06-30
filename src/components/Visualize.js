import { Navbar, Dropdown } from "react-bootstrap";
import bfs from "../algorithms/bfs";
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
            //console.log(node, "=>", document.getElementById(node).className);
            if (
                document.getElementById(node).className === "start visitedNode"
            ) {
                // dispatch(
                //     boardActions.setClass({
                //         id: node,
                //         class: "start shortestPath",
                //     })
                // );
                document.getElementById(node).className = "start shortestPath";
            } else if (
                document.getElementById(node).className === "target visitedNode"
            ) {
                // dispatch(
                //     boardActions.setClass({
                //         id: node,
                //         class: "target shortestPath",
                //     })
                //);
                document.getElementById(node).className = "target shortestPath";
            } else if (
                document.getElementById(node).className === "visitedNode"
            ) {
                //console.log("here");
                // dispatch(
                //     boardActions.setClass({ id: node, class: "shortestPath" })
                // );
                document.getElementById(node).className = "shortestPath";
            }
        }, 50 * i);
    }
};
let reachedEnd, nodesVisited, shortestPath;
const Visualize = () => {
    const state = useSelector((state) => state);
    console.log(state);
    const dispatch = useDispatch();

    const onClickHandler = (event) => {
        [reachedEnd, nodesVisited, shortestPath] = bfs(state);
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
                    // dispatch(
                    //     boardActions.setClass({
                    //         id: node,
                    //         class: "visitedNode",
                    //     })
                    // );
                    document.getElementById(node).className = "visitedNode";
                }
            }, 20 * i);
        }
    };

    const onClearPath = () => {
        //console.log(nodesVisited);
        // let nodes = [...Object.entries(state.board)];
        // for (let [key, value] of nodes) {
        //     //console.log(key);
        //     // if (document.getElementById(key).className === "visitedNode")
        //     if (value === "start shortestPath") {
        //         dispatch(
        //             boardActions.setClass({
        //                 id: key,
        //                 class: "start",
        //             })
        //         );
        //     } else if (value === "target shortestPath") {
        //         dispatch(
        //             boardActions.setClass({
        //                 id: key,
        //                 class: "target",
        //             })
        //         );
        //     } else
        //         dispatch(
        //             boardActions.setClass({
        //                 id: key,
        //                 class: "unvisited",
        //             })
        //         );
        // }
        for (let key of nodesVisited) {
            //console.log(key);
            // if (document.getElementById(key).className === "visitedNode")
            if (
                document.getElementById(key).className === "start shortestPath"
            ) {
                document.getElementById(key).className = "start";
                // dispatch(
                //     boardActions.setClass({
                //         id: key,
                //         class: "start",
                //     })
                // );
            } else if (
                document.getElementById(key).className === "target shortestPath"
            ) {
                console.log("here1111", key);
                document.getElementById(key).className = "target";
                // dispatch(
                //     boardActions.setClass({
                //         id: key,
                //         class: "target",
                //     })
                // );
            } else if (
                document.getElementById(key).className === "shortestPath" ||
                document.getElementById(key).className === "visitedNode"
            ) {
                console.log("here11", key);
                document.getElementById(key).className = "unvisited";
                // dispatch(
                //     boardActions.setClass({
                //         id: key,
                //         class: "unvisited",
                //     })
                // );
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

    const onClearBoard = () => {
        let wallNodes = [];
        for (let [key, value] of Object.entries(state.board)) {
            console.log(key);
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

    return (
        <Navbar style={{ backgroundColor: "#34495e" }} expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <div className="container-fluid d-flex justify-content-center">
                    <div className="col-md d-flex justify-content-center">
                        <button
                            id="clearBoard"
                            className="btn shadow-none navButton navs"
                            onClick={onClearBoard}>
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
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/">
                                    Link 1
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">
                                    Link 2
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">
                                    Link 3
                                </a>
                            </div>
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
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/">
                                    Link 1
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">
                                    Link 2
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">
                                    Link 3
                                </a>
                            </div>
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

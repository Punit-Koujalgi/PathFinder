import { Navbar, Dropdown } from "react-bootstrap";
import bfs from "../algorithms/bfs";
import { animationActions, boardActions } from "../store/board";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const animateVisitedNodes = (nodesVisited, shortestPath, dispatch, board) => {
    //animateShortestPathNodes(shortestPath, dispatch, board);
};
const animateShortestPathNodes = (shortestPath, dispatch) => {
    for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
            const node = shortestPath[i];
            console.log(node, "=>", document.getElementById(node).className);
            if (
                document.getElementById(node).className === "start visitedNode"
            ) {
                dispatch(
                    boardActions.setClass({
                        id: node,
                        class: "start shortestPath",
                    })
                );
            } else if (
                document.getElementById(node).className === "target visitedNode"
            ) {
                dispatch(
                    boardActions.setClass({
                        id: node,
                        class: "target shortestPath",
                    })
                );
            } else if (
                document.getElementById(node).className === "visitedNode"
            ) {
                console.log("here");
                dispatch(
                    boardActions.setClass({ id: node, class: "shortestPath" })
                );
            }
        }, 25 * i);
    }
};
const Visualize = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const onClickHandler = (event) => {
        const [reachedEnd, nodesVisited, shortestPath] = bfs(state);
        //console.log(shortestPath);
        //animateVisitedNodes(nodesVisited, shortestPath, dispatch, state.board);
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
                    // dispatch(
                    //     boardActions.setClass({
                    //         id: node,
                    //         class: "start visitedNode",
                    //     })
                    // );
                    document.getElementById(node).className =
                        "start visitedNode";
                } else if (state.board[node] === "target") {
                    // dispatch(
                    //     boardActions.setClass({
                    //         id: node,
                    //         class: "target visitedNode",
                    //     })
                    // );
                    document.getElementById(node).className =
                        "target visitedNode";
                } else document.getElementById(node).className = "visitedNode";
                // dispatch(
                //     boardActions.setClass({
                //         id: node,
                //         class: "visitedNode",
                //     })
                // );
            }, 20 * i);
        }
    };

    return (
        <Navbar style={{ backgroundColor: "#34495e" }} expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <div className="container-fluid d-flex justify-content-center">
                    <div className="col-md d-flex justify-content-center">
                        <button
                            id="clearBoard "
                            className="btn shadow-none navButton navs">
                            Clear Board
                        </button>
                    </div>
                    <div className="col-md d-flex justify-content-center">
                        <Dropdown className="ml-3">
                            <Dropdown.Toggle
                                className="shadow-none navs"
                                variant="disabled"
                                id="dropdown-basic"
                                style={{ color: "white", fontWeight: "bold" }}>
                                Algorithms
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                    Action
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">
                                    Another action
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">
                                    Something else
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-md my-sm-2 d-flex justify-content-center">
                        <button
                            className="btn visualize shadow-none"
                            onClick={onClickHandler}>
                            Visualize!
                        </button>
                    </div>
                    <div className="col-md d-flex justify-content-center">
                        <Dropdown className="ml-3">
                            <Dropdown.Toggle
                                className="shadow-none navs"
                                variant="disabled"
                                id="dropdown-basic"
                                style={{ color: "white", fontWeight: "bold" }}>
                                Generate Maze
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                    Action
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-2">
                                    Another action
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-3">
                                    Something else
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-md d-flex justify-content-center">
                        <button
                            id="clearBoard"
                            className="btn shadow-none navButton navs">
                            Clear Path
                        </button>
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Visualize;

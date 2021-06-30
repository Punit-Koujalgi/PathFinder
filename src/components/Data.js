import "./Data.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/board";

const Data = (props) => {
    const id = `d_${props.row}_${props.col}`;

    const status = useSelector((state) => state.board[id]);
    //console.log(status);
    const dispatch = useDispatch();

    const startClass = `${status === "start" ? "start" : ""}`;
    const targetClass = `${status === "target" ? "target" : ""}`;
    const unvisitedClass = `${status === "unvisited" ? "unvisited" : ""}`;
    const wallClass = `${status === "wall" ? "wall" : ""}`;
    const startBeingMoved = `${
        status === "startBeingMoved" ? "startBeingMoved" : ""
    }`;
    const targetBeingMoved = `${
        status === "targetBeingMoved" ? "targetBeingMoved" : ""
    }`;
    const visitedNodeClass = `${status === "visitedNode" ? "visitedNode" : ""}`;
    const startVisitedNodeClass = `${
        status === "start visitedNode" ? "start visitedNode" : ""
    }`;
    const targetVisitedNodeClass = `${
        status === "target visitedNode" ? "target visitedNode" : ""
    }`;
    const shortestPathClass = `${
        status === "shortestPath" ? "shortestPath" : ""
    }`;
    const startShortestPathClass = `${
        status === "start shortestPath" ? "start shortestPath" : ""
    }`;
    const targetShortestpathClass = `${
        status === "target shortestPath" ? "target shortestPath" : ""
    }`;
    const classes =
        startClass +
        targetClass +
        unvisitedClass +
        wallClass +
        startBeingMoved +
        targetBeingMoved +
        visitedNodeClass +
        startVisitedNodeClass +
        targetVisitedNodeClass +
        startShortestPathClass +
        targetShortestpathClass +
        shortestPathClass;
    //console.log(classes);

    const onClickHandler = (event) => {
        console.log("click");
        if (status === "start") {
            sessionStorage.setItem("placeStart", "true");
            sessionStorage.setItem("startPrevious", id);
            dispatch(
                boardActions.setClass({ id: id, class: "startBeingMoved" })
            );
        } else if (
            status === "unvisited" &&
            sessionStorage.getItem("placeStart") === "true"
        ) {
            sessionStorage.setItem("placeStart", "false");
            dispatch(boardActions.setClass({ id: id, class: "start" }));
            dispatch(
                boardActions.setClass({
                    id: sessionStorage.getItem("startPrevious"),
                    class: "unvisited",
                })
            );
        } else if (status === "target") {
            console.log("here");
            sessionStorage.setItem("placeTarget", "true");
            sessionStorage.setItem("targetPrevious", id);
            dispatch(
                boardActions.setClass({ id: id, class: "targetBeingMoved" })
            );
        } else if (
            status === "unvisited" &&
            sessionStorage.getItem("placeTarget") === "true"
        ) {
            console.log("here1");
            sessionStorage.setItem("placeTarget", "false");
            dispatch(boardActions.setClass({ id: id, class: "target" }));
            dispatch(
                boardActions.setClass({
                    id: sessionStorage.getItem("targetPrevious"),
                    class: "unvisited",
                })
            );
        } else if (status === "wall") {
            dispatch(boardActions.setClass({ id: id, class: "unvisited" }));
        }
    };

    const onMouseDown = (event) => {
        console.log("down");
        event.preventDefault();
        if (
            status === "unvisited" &&
            sessionStorage.getItem("placeStart") !== "true" &&
            sessionStorage.getItem("placeTarget") !== "true"
        ) {
            dispatch(boardActions.setClass({ id: id, class: "wall" }));
        }
    };
    const onMouseEnter = (event) => {
        if (event.buttons === 1 && status === "unvisited") {
            dispatch(boardActions.setClass({ id: id, class: "wall" }));
        }
    };

    return (
        <td
            id={id}
            className={classes}
            onClick={onClickHandler}
            onMouseEnter={onMouseEnter}
            onMouseDown={onMouseDown}></td>
    );
};

export default Data;

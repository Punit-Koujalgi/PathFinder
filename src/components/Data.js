import "./Data.css";
import { useState, useRef, useEffect } from "react";

const Data = (props) => {
    const id = `d-${props.row}-${props.col}`;

    const tdRef = useRef();
    //const [isWall, setisWall] = useState(false);
    const [status, setStatus] = useState(props.initialState);
    useEffect(() => {
        setStatus(props.initialState);
    }, [props.initialState]);

    const onClickHandler = (event) => {
        //setisWall(true);
        console.log("click", event.target);
        if (tdRef.current.className.includes("wall")) {
            console.log("here");
            tdRef.current.className = tdRef.current.className.replace(
                "wall",
                ""
            );
        } else if (status === "unvisited") tdRef.current.className += " wall";
        //console.log(tdRef);
    };

    const onMouseEnterHandler = (event) => {
        // event.preventDefaultBehaviour
        console.log("enter", event.buttons);
        if (
            event.buttons === 1 &&
            sessionStorage.getItem("startedDraggingstart") === "true"
        ) {
            tdRef.current.className = "imageStart startBeingDragged";
        } else if (
            event.buttons === 1 &&
            sessionStorage.getItem("startedDraggingend") === "true"
        ) {
            tdRef.current.className = "imageTarget startBeingDragged";
        } else if (
            event.buttons === 1 &&
            !tdRef.current.className.includes("wall") &&
            status === "unvisited"
        ) {
            tdRef.current.className += " wall";
        }
    };

    const onMouseLeaveHandler = (event) => {
        console.log("leave", event.buttons);
        if (
            event.buttons === 1 &&
            sessionStorage.getItem("startedDraggingstart") === "true"
        ) {
            if (tdRef.current.className.includes("startBeingDragged")) {
                tdRef.current.className = tdRef.current.className.replace(
                    "imageStart startBeingDragged",
                    "unvisited"
                );
            }
        }
        if (
            event.buttons === 1 &&
            sessionStorage.getItem("startedDraggingend") === "true"
        ) {
            if (tdRef.current.className.includes("startBeingDragged")) {
                tdRef.current.className = tdRef.current.className.replace(
                    "imageTarget startBeingDragged",
                    "unvisited"
                );
            }
        }
    };
    const onMouseDownHandler = (event) => {
        event.preventDefault();
        console.log("down", event.target);
        if (
            !tdRef.current.className.includes("wall") &&
            status === "unvisited"
        ) {
            tdRef.current.className += " wall";
        }
        if (status === "start") {
            tdRef.current.className = "unvisited";
            sessionStorage.setItem("startedDraggingstart", "true");
        }
        if (status === "target") {
            tdRef.current.className = "unvisited";
            sessionStorage.setItem("startedDraggingend", "true");
        }
    };

    const onMouseUpHandler = (event) => {
        console.log("up", event.target);
        if (sessionStorage.getItem("startedDraggingstart") === "true") {
            sessionStorage.setItem("startedDraggingstart", "false");
            tdRef.current.className = tdRef.current.className.replace(
                "startBeingDragged",
                ""
            );
            setStatus("start");
        }
        if (sessionStorage.getItem("startedDraggingend") === "true") {
            sessionStorage.setItem("startedDraggingend", "false");
            tdRef.current.className = tdRef.current.className.replace(
                "startBeingDragged",
                ""
            );
            setStatus("target");
        }
    };

    const startClass = `${props.initialState === "start" ? "imageStart" : ""}`;
    const targetClass = `${
        props.initialState === "target" ? "imageTarget" : ""
    }`;
    const unvisitedClass = `${
        props.initialState === "unvisited" ? "unvisited" : ""
    }`;
    const classes = startClass + targetClass + unvisitedClass;

    return (
        <td
            id={id}
            className={classes}
            onMouseEnter={onMouseEnterHandler}
            onClick={onClickHandler}
            onMouseDown={onMouseDownHandler}
            onMouseLeave={onMouseLeaveHandler}
            onMouseUp={onMouseUpHandler}
            ref={tdRef}></td>
    );
};

export default Data;

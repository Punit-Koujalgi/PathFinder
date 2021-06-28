import "./Data.css";
import { useState, useRef } from "react";

const Data = (props) => {
    const id = `d-${props.row}-${props.col}`;

    const tdRef = useRef();
    //const [isWall, setisWall] = useState(false);
    const [status, setStatus] = useState(props.initialState);

    const onClickHandler = () => {
        //setisWall(true);
        if (tdRef.current.className.includes("wall")) {
            console.log("here");
            tdRef.current.className = tdRef.current.className.replace(
                "wall",
                ""
            );
        } else tdRef.current.className += " wall";
        //console.log(tdRef);
    };

    const onMouseEnterHandler = (event) => {
        console.log(event);
    };

    const startClass = `${status === "start" ? "imageStart" : ""}`;
    const targetClass = `${status === "target" ? "imageTarget" : ""}`;
    const unvisitedClass = `${status === "unvisited" ? "unvisited" : ""}`;
    const classes = startClass + targetClass + unvisitedClass;

    return (
        <td
            id={id}
            className={classes}
            onMouseOver={onMouseEnterHandler}
            ref={tdRef}></td>
    );
};

export default Data;

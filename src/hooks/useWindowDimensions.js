import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { boardActions } from "../store/board";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

export default function useWindowDimensions() {
    //const dispatch = useDispatch();
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    // useEffect(() => {
    //     function handleResize() {
    //         for (let i = 0; i < 30; i++) {
    //             for (let j = 0; j < 70; j++) {
    //                 dispatch(
    //                     boardActions.setClass({
    //                         id: `d_${i}_${j}`,
    //                         class: "unvisited",
    //                     })
    //                 );
    //             }
    //         }
    //         setWindowDimensions(getWindowDimensions());
    //     }
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, [dispatch]);

    return windowDimensions;
}

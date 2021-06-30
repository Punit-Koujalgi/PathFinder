import TableRow from "./components/TableRow";
import useWindowDimensions from "./hooks/useWindowDimensions";
import Visualize from "./components/Visualize";
import { animationActions } from "./store/board";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { boardActions } from "./store/board";
import "./App.css";

function App() {
    const { height, width } = useWindowDimensions();

    const dispatch = useDispatch();

    let numCols = Math.floor(width / 25) + 1;
    let numRows = Math.floor(height / 25) - 4;
    useEffect(() => {
        dispatch(animationActions.setRows(numRows));
        dispatch(animationActions.setCols(numCols));
    }, []);
    //console.log(numRows, numCols);
    return (
        <>
            <div
                className="container-fluid pt-2"
                style={{
                    backgroundColor: "#34495e",
                    color: "white",
                    fontSize: "x-large",
                    fontWeight: "bolder",
                    textAlign: "center",
                }}>
                Pathfinding Visualizer
            </div>
            <Visualize></Visualize>
            <table>
                <tbody>
                    {Array.from({ length: numRows }).map((value, idx) => {
                        return (
                            <TableRow
                                key={idx}
                                cols={numCols}
                                row={idx}
                                rowStart={idx === 10 ? true : null}
                            />
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default App;

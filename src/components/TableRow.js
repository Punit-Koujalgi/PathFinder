import Data from "./Data";

const TableRow = (props) => {
    let tds = Array.from({ length: +props.cols }).map((value, idx) => {
        let startCol = Math.floor(+props.cols / 2) - 4;
        let targetCol = Math.floor(+props.cols / 2) + 4;
        console.log(startCol, targetCol);
        let initialState = "unvisited";
        if (props.rowStart && idx === startCol) initialState = "start";
        else if (props.rowStart && idx === targetCol) initialState = "target";

        return (
            <Data
                key={idx}
                row={props.row}
                col={idx}
                initialState={initialState}
            />
        );
    });
    return <tr id={props.row}>{tds}</tr>;
};

export default TableRow;

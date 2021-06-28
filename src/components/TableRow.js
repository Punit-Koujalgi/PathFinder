import Data from "./Data";

const TableRow = (props) => {
    let tds = Array.from({ length: +props.cols }).map((value, idx) => {
        let initialState = "unvisited";
        if (props.rowStart && idx === 10) initialState = "start";
        else if (props.rowStart && idx === 35) initialState = "target";

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

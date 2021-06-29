import Data from "./Data";
import { useDispatch } from "react-redux";
import { boardActions } from "../store/board";

const TableRow = (props) => {
    const dispatch = useDispatch();

    let tds = Array.from({ length: +props.cols }).map((value, idx) => {
        //console.log(startCol, targetCol);
        let startCol = Math.floor(+props.cols / 2) - 4;
        let targetCol = Math.floor(+props.cols / 2) + 4;
        if (props.rowStart && idx === startCol) {
            dispatch(
                boardActions.setClass({
                    id: `d_${props.row}_${idx}`,
                    class: "start",
                })
            );
        } else if (props.rowStart && idx === targetCol) {
            dispatch(
                boardActions.setClass({
                    id: `d_${props.row}_${idx}`,
                    class: "target",
                })
            );
        }

        return <Data key={idx} row={props.row} col={idx} />;
    });
    return <tr id={props.row}>{tds}</tr>;
};

export default TableRow;

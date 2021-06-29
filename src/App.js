import { Navbar, Dropdown } from "react-bootstrap";
import TableRow from "./components/TableRow";
import useWindowDimensions from "./hooks/useWindowDimensions";
// import { useDispatch } from "react-redux";
// import { boardActions } from "./store/board";
import "./App.css";

function App() {
    const { height, width } = useWindowDimensions();

    let numCols = Math.floor(width / 23) + 1;
    let numRows = Math.floor(height / 23) - 4;
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
                                    style={{ color: "white" }}>
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
                        <div className="col-md my-sm-2 d-flex justify-content-center">
                            <button className="btn visualize shadow-none">
                                Visualize!
                            </button>
                        </div>
                        <div className="col-md d-flex justify-content-center">
                            <Dropdown className="ml-3">
                                <Dropdown.Toggle
                                    className="shadow-none navs"
                                    variant="disabled"
                                    id="dropdown-basic"
                                    style={{ color: "white" }}>
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

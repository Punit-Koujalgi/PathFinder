import { Navbar, Button, Dropdown, Table } from "react-bootstrap";
import TableRow from "./components/TableRow";
import useWindowDimensions from "./hooks/useWindowDimensions";
import "./App.css";

function App() {
    const { height, width } = useWindowDimensions();
    console.log(height, width);

    const onMouseEnterHandler = (event) => {
        console.log(event);
    };

    return (
        <>
            <div
                className="container-fluid pt-2"
                style={{
                    backgroundColor: "#34495e",
                    color: "white",
                    fontSize: "x-large",
                    fontWeight: "bolder",
                }}>
                Pathfinding Visualizer
            </div>
            <Navbar style={{ backgroundColor: "#34495e" }} expand="sm">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="container-fluid d-flex justify-content-center">
                        <Button id="clearBoard" className="navButton">
                            Clear Board
                        </Button>
                        <Dropdown className="mr-3">
                            <Dropdown.Toggle
                                variant="disabled"
                                id="dropdown-basic"
                                style={{ color: "white" }}>
                                Dropdown1
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
                        <Button
                            className="visualize"
                            onMouseOver={onMouseEnterHandler}>
                            Visualize!
                        </Button>

                        <Dropdown className="ml-3">
                            <Dropdown.Toggle
                                variant="disabled"
                                id="dropdown-basic"
                                style={{ color: "white" }}>
                                Dropdown2
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
                        <Button id="clearPath" className="navButton">
                            Clear Path
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            <div className="container-fluid d-flex justify-content-center">
                <Table bordered variant="transparent">
                    <thead></thead>
                    <tbody>
                        {Array.from({ length: 23 }).map((value, idx) => {
                            return (
                                <TableRow
                                    key={idx}
                                    cols="50"
                                    row={idx}
                                    rowStart={idx === 10 ? true : null}
                                />
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default App;

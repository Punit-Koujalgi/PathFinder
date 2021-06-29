import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {};
for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 70; j++) {
        initialState[`d_${i}_${j}`] = "unvisited";
    }
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setClass(state, action) {
            if (action.payload.class === "targetBeingMoved")
                console.log("okay");
            state[action.payload.id] = action.payload.class;
            if (action.payload.class === "targetBeingMoved")
                console.log(state[action.payload.id]);
        },
    },
});

const store = configureStore({
    reducer: { board: boardSlice.reducer },
});

export const boardActions = boardSlice.actions;
export default store;

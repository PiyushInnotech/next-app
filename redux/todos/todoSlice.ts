import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type todoState = {
    list: {
        id: number,
        title: string,
        desc: string,
    }[];
};

const initialState = {
    list: [{
        id: 1,
        title: 'todo 1',
        desc: 'complete todo1',
    }, {
        id: 2,
        title: 'todo 2',
        desc: 'complete todo 2',
    }],
} as todoState;

export const todo = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodoAction: (state, action: PayloadAction<{ id: number, title: string, desc: string }>) => {
            const newTodo = action.payload
            state.list = [...state.list, newTodo];
        },
        deleteTodoAction: (state, action: PayloadAction<number>) => {
            let updatedList = state.list.filter((item) => {
                return item.id !== action.payload;
            })
            state.list = updatedList
        }
    },
});

export const {
    addTodoAction,
    deleteTodoAction
} = todo.actions;

export default todo.reducer;
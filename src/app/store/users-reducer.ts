import {createSlice} from "@reduxjs/toolkit";


const slice = createSlice({
        name: "users",
        initialState: [] as string[],
        reducers: {
            fetchUsers(state, action) {
                console.log("users: ", action.payload.data)
                const arr = [] as string[]
                action.payload.data.map((u: { name: string }) => arr.push(u.name))
                return arr
            },
        },
    }
)

export const usersReducer = slice.reducer;
export const {fetchUsers} = slice.actions;


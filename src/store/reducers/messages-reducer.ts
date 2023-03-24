import {createSlice} from "@reduxjs/toolkit";
import {MessageType} from "../../common/types/MessageType";


const slice = createSlice({
        name: "messages",
        initialState: [] as MessageType[],
        reducers: {
            fetchMessages(state, action) {
                return action.payload.data.reverse()
            },
            newMessage(state, action) {
                return [action.payload.data, ...state]
            },
            clearMessages() {
                return []
            },
        },
    }
)

export const messagesReducer = slice.reducer;
export const {fetchMessages, clearMessages, newMessage} = slice.actions;


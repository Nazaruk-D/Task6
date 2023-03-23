import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../../api/authAPI";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {messageAPI, MessageType, SendMessageType} from "../../api/messageAPI";


export const fetchMessagesTC = createAsyncThunk(('messages/fetch'), async (param: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await messageAPI.fetchMessages(param)
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return res.data
    } catch (err: any) {
        dispatch(setAppStatusAC({status: 'failed'}))
        const error: AxiosError = err
        // console.log(error)
        // return rejectWithValue({})
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: 'idle'}))
    }
})


export const sendMessageTC = createAsyncThunk(('messages/send'), async (param: SendMessageType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await messageAPI.sendMessages(param)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return res.data
    } catch (err: any) {
        const error: AxiosError = err.response.data
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldErrors: undefined})
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'idle'}))
    }
})

const slice = createSlice({
        name: "messages",
        initialState: [] as MessageType[],
        reducers: {
            changeMessagesStatusAC(state, action: PayloadAction<{ id: number, status: boolean }>) {
                // const index = state.findIndex(u => u.id === action.payload.id)
                // state[index].isSelected = action.payload.status
            },
            changeAllMessagesStatusAC(state, action) {
                return state.map(u => ({...u, isSelected: action.payload}))
            },
        },
        extraReducers: builder => {
            builder.addCase(fetchMessagesTC.fulfilled, (state, action) => {
                return action.payload
                // return action.payload.map( m => m)
                // console.log(action.payload)
                // return action.payload.users.map(u => ({...u, isSelected: false}))
            })
            // builder.addCase(changeStatusUsersTC.fulfilled, (state, action: PayloadAction<{ value: { ids: number[], status: any } }>) => {
            //     const {ids, status} = action.payload.value;
            //     return state.map(u => ids.includes(u.id) ? {...u, status} : u);
            // })
            // builder.addCase(deleteUsersTC.fulfilled, (state, action) => {
            //     return state.filter(u => !action.payload.includes(u.id));
            // })
        },

    }
)

export const messagesReducer = slice.reducer;
export const {changeMessagesStatusAC, changeAllMessagesStatusAC} = slice.actions;


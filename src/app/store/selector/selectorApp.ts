import {AppRootStateType} from "../store";

export const selectorStatusApp = (state: AppRootStateType) => state.app.status;
export const selectorNameUser = (state: AppRootStateType)=> state.app.userName;
export const selectorFetchUsersName = (state: AppRootStateType)=> state.users;
export const selectorFetchNewMessage = (state: AppRootStateType)=> state.messages[0];


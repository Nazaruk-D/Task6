import {AppRootStateType} from "../store";

export const selectorIsInitialized = (state: AppRootStateType) => state.app.initialized;
export const selectorError = (state: AppRootStateType) => state.app.error;
export const selectorStatusApp = (state: AppRootStateType) => state.app.status;
export const selectorNameUser = (state: AppRootStateType)=> state.app.userName;

export const selectorIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;

export const selectorFetchUsersName = (state: AppRootStateType)=> state.users;

export const selectorFetchNewMessage = (state: AppRootStateType)=> state.messages[0];
export const selectorMessages = (state: AppRootStateType)=> state.messages;


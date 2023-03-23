import {AppRootStateType} from "../store";

export const selectorStatusApp = (state: AppRootStateType) => state.app.status;
export const selectorNameUser = (state: AppRootStateType)=> state.app.userName;


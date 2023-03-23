import {instance} from "./instance";


export const authAPI = {
    me() {
        return instance.get<ResponseType<MeType>>(`auth/me`)
    },
    registration(data: RegistrationDataType) {
        return instance.post<ResponseType<UserType>>(`auth/register`, data).then((response) => response.data)
    },
    login(data: LoginDataType) {
        return instance.post<ResponseType<UserType>>('auth/login', data).then((response) => response.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/logout`).then((response) => response.data)
    },
}


export type ResponseType<D = {}> = {
    statusCode: number
    message: Array<string>
    data: D
}

export type RegistrationDataType = {
    name: string
}

export type LoginDataType = {
    name: string
}

export type UserType = {
    name: string
    messages: []
}

export type MeType = {
    name: string
}

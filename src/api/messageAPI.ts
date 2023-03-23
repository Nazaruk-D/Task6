import {instance} from "./instance";
import {ResponseType, UserType} from "./authAPI";


export const messageAPI = {
    fetchMessages() {
        return instance.get<ResponseType<MessageType[]>>(`messages/fetch`).then((response) => response.data)
    },
    sendMessages(payload: MessageType) {
        return instance.post<ResponseType<MessageType>>(`messages/send`, payload).then((response) => response.data)
    },
}

export type MessageType = {
    senderName: string
    recipientName: string
    subject: string
    message: string
    created_at?: string
}

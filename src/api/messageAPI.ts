import {instance} from "./instance";
import {ResponseType, UserType} from "./authAPI";


export const messageAPI = {
    fetchMessages(name: string) {
        return instance.get<ResponseType<MessageType[]>>(`messages/fetch/${name}`).then((response) => response.data)
    },
    sendMessages(payload: SendMessageType) {
        return instance.post<ResponseType<MessageType>>(`messages/send`, payload).then((response) => response.data)
    },
}

export type MessageType = {
    id: string
    sender_name: string
    recipient_name: string
    subject: string
    message: string
    created_at: string
}

export type SendMessageType = {
    senderName: string
    recipientName: string
    subject: string
    message: string
}

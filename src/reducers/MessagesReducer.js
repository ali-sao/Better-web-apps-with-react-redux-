import { SEND_MESSAGE, MESSAGES_LOADED, MESSAGE_RECEIVED } from '../actions'

let emptyState = {
    data: [],
    loading: true,
    chats: []
}

const messagesReducer = (state = emptyState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            var chats = state.chats.concat({
                text: action.text,
                rule: "sender",
                key: Date.now()
            });
            return {
                ...state,
                chats
            }
        case MESSAGE_RECEIVED:
            var chats = state.chats.concat({
                text: action.text.replace("<h1>", "").replace("</h1>"),
                rule: "reciever",
                key: Date.now()
            });
            return {
                ...state,
                chats
            }
        case MESSAGES_LOADED:
            return {
                ...state,
                loading: false,
                data: action.messages
            }
        default:
            return state
    }
}

export default messagesReducer
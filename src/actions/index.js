export let SEND_MESSAGE = 'SEND_MESSAGE'
export let MESSAGES_LOADED = 'MESSAGES_LOADED'
export let MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'

export const sendMessage = text => {
    return {
        type: SEND_MESSAGE,
        text
    }
}

export const messageReceived = text => {
    return {
        type: MESSAGE_RECEIVED,
        text
    }
}

export const messagesLoaded = messages => {
    return {
        type: MESSAGES_LOADED,
        messages
    }
}
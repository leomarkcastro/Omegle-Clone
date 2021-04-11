import { createStore } from 'redux'

let initialState = {
    messageList : [],
    topics: [],
    chatEnded : false,
    chatID: null,
}

const reducer = (state=initialState, action) => {

    switch(action.type){
        case 'chatID':
            return {
                ...state,
                chatID: action.content
            }
        case 'topics':
            return {
                ...state,
                topics: action.content
            }
        case 'add':
            return {
                ...state,
                messageList: [
                    ...state.messageList,
                    action.content
                ]
            }
        case 'clear':
            return {
                ...state,
                messageList: [],
                chatEnded: false
            }
        case 'endChat':
            return {
                ...state,
                chatEnded: true
            }
        default:
            return state
    }


}   

const store = createStore(reducer)

export default store
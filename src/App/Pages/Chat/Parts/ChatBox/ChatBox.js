import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'

import Style from "./ChatBox.module.css"

import MessageBox from "../../Components/MessageBox/MessageBox"
import EndCard from "../EndCard/EndCard"

class ChatBox extends Component{    

    render(){
        return (
            <Fragment>
                <div className={Style.ChatBox}>
                    {
                        this.props.messageList.map((message, index) => {
                            return <MessageBox key={`chat_${index}`} sender={message[0]} message={message[1]}/>
                        })
                    }
                    {
                        this.props.chatEnded ? <EndCard /> : null
                    }
                </div>
            </Fragment>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        messageList : state.messageList,
        chatEnded : state.chatEnded
    }
}

export default connect(mapStateToProps)(ChatBox)
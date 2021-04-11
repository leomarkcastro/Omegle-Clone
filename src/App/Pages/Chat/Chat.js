import React, { Component } from 'react'

import { connect } from 'react-redux'

import Style from "./Chat.module.css"
import Style_fromHome from "../Home/Home.module.css"

import ChatBox from "./Parts/ChatBox/ChatBox"

import Omegle from "../../Utils/Omegle/Omegle"

class Chat extends Component{

    // this bad boi will have topics passed onto itself

    static_data = {
        id : null
    }

    updating = true

    async getUpdate(){
        
        let response = await Omegle.getUpdate(this.static_data.id)

        console.log(response)

        switch(response.type){
            
            case 'connected':
                this.props.addMessage(['System', `Great! You're Connected. Common interests are ${response.content}`])
                break;
            case 'typing':
                this.props.addMessage(['System', `Stranger is Typing`])
                break;
            case 'gotMessage':
                this.props.addMessage(['Stranger', response.content])
                break;
            case 'strangerDisconnected':
                this.props.chatEnded()
                this.updating = false
                break;
            case 'nullResponse':
                this.props.addMessage(['System', `Null Response Received`])
                this.updating = false
                break;
            default:
                break

        }


        this.updating && this.getUpdate()

    }

    async componentDidMount(){
        
        let response = null

        // we call the server to add this bad boy into the mix
        response = await Omegle.connect(this.props.topics)

        console.log(response)

        this.props.addMessage(['System', 'Connecting you to server'])
        this.props.addMessage(['System', `Your ID is ${response.data.clientID}`])

        this.static_data.id = response.data.clientID

        console.log(this.static_data.id)

        this.getUpdate()

    }

    onEnter(e){
        if (e.keyCode === 13){
            Omegle.sendMessage(e.target.value)
            this.props.addMessage(["You", e.target.value])
            e.target.value = ""
        }
    }

    render(){
        return (
            <div className={Style.Main}>

                <ChatBox />
                
                <button className={Style.Disconnect}>Disconnect</button>
                <input 
                    className={Style_fromHome.Topics} 
                    placeholder="Send A Message"
                    onKeyUp={this.onEnter.bind(this)}
                />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        topics : state.topics
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMessage : c => dispatch({type: "add", content:c}),
        chatEnded : c => dispatch({type: "endChat"}),
        setID : c => dispatch({type: "chatID", content:c})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
import React, { Component } from 'react'

import Style from "./MessageBox.module.css"

class MessageBox extends Component{

    render(){

        return (
            this.props.sender !== 'System' ?
                <div className={Style.Container}>

                    <p className={Style[this.props.sender]}>{this.props.sender}:&nbsp;</p>
                    <p>{this.props.message}</p>

                </div>
                :
                <div className={Style.Container}>

                    <p>{this.props.message}</p>

                </div>
        )
    }
}

export default MessageBox
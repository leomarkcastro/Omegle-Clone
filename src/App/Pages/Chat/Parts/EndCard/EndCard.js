import React, { Component } from 'react'

class EndCard extends Component {

    render(){
        return (
            <div className="">
                <hr/>
                <p>Stranger Disconnected</p>
                <button>Retry Again</button>
                <input placeholder="Insert here what you want to talk about"/>
            </div>
        )
    }

}

export default EndCard
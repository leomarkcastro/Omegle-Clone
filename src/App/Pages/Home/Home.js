import React , { Component } from 'react'

import Style from "./Home.module.css"

import Omegle from '../../Utils/Omegle/Omegle'

class Home extends Component{

    state ={
        currentOnline : 0
    }

    async componentDidMount(){
        //Here we load some data from omegle, not really useful except for the current Online, maybe this data is useful if you do video call.
        // which of itself is another topic. Search about WebRTC

        let data = await Omegle.get_initial()
        //let data = {
        //    data: {
        //        count: 123456
        //    }
        //}

        // men, you gonna ask me, why is commatize inside the Omegle boilerplate code, well uhm, i dont know where should i put this handy function that is mainly used only by omegle codes, so i just attached it there
        this.setState({ currentOnline: Omegle.commatize(data.data.count) })

    }

    onEnter(e){
        if (e.keyCode === 13){
            this.props.onEnter(e.target.value)
        }
    }

    render(){
        return (
            <div className={Style.Main}>
                <h1 className={Style.Title}>Chatterbox</h1>
                <p>Chat with anyone at any place... from omegle</p>
                
                <input 
                    className={Style.Topics} 
                    placeholder="Place the topics you want to talk about. Then press enter to start"
                    onKeyUp={this.onEnter.bind(this)}
                />

                <p>Currently Online: {this.state.currentOnline}</p>
            </div>
        )
    }
}

export default Home
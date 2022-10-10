import React, { Component, useEffect, useState } from 'react';


const socket = new WebSocket('wss://ws.socket.wingipay.com');

const reqPayload = {
    "sender":"aff7eb97-9d89-4916-bd67-2234187c566f",
    "receiver":"d7c62d26-057e-46d3-bda3-5098edfc2565",
    "sender_type": "RECEIVER",
    "chat_source": "MOBILE"
}

class ChatBot extends Component{
    state = {
        test: true,
        chatData: {}
    }
    componentDidMount(){
        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify(reqPayload));      
            // console.log('Message from server ', event );
            // console.log('Message from server 1', (event.data));
        });
        let _that = this;
        // Listen for messages 
        socket.addEventListener('message', function (event) {
            let chatData = JSON.parse(event.data);
            // console.log('Message from server ', (chatData.users) );
            if(_that.state?.chatData?.message_set?.length === chatData?.message_set?.length){
                //
                _that.setState({chatData: chatData?.conversation});
                console.log('Message from server ', (chatData) );
            }
            else{
                _that.setState({chatData: chatData?.conversation || 0 });
                console.log('Message from server data unchanged', _that.state?.chatData?.message_set?.length);
            }
            socket.send(JSON.stringify(reqPayload));
        });
    }
    render(){
        const {test} = this.state;
        return (
            <div>
                test
                
            </div>
        );
    }
}


export default ChatBot;

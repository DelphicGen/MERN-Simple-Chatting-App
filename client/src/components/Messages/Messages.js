import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'

const Messages = ({messages, username}) => {
    return(
        <ScrollToBottom className="py-5 overflow-auto flex-auto">
        {
            messages.map(( message, index ) => {
                return(
                    <div key={index}><Message data={message} username={username} /></div>
                )
            })
        }
        </ScrollToBottom>
    )
}

export default Messages


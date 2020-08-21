import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'

const Messages = ({messages, name}) => {
    return(
        <ScrollToBottom className="py-5 overflow-auto flex-auto">
        {
            messages.map(( message, index ) => {
                return(
                    <div key={index}><Message message={message} name={name} /></div>
                )
            })
        }
        </ScrollToBottom>
    )
}

export default Messages


import React from 'react';

const Message = ({data, username}) => {
    let isSentByCurrentUser = false;
    let message = data.message
    let sender = data.username
    const trimmedName = sender.trim();

    if(username === trimmedName){
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser 
            ? (
                <div className="flex justify-end px-3 sm:px-5 mt-2">
                    <div style={{maxWidth: '80%'}} className="rounded-md px-3 sm:px-5 py-1 text-white inline-block bg-blue-600">
                        <p className="w-full float-left text-white break-words">{message}</p>
                    </div>
                    <p className="flex items-center text-white tracking-wide pl-1 sm:pl-3">{trimmedName}</p>
                </div>
            ) 
            : (
                <div className="flex justify-start px-3 sm:px-5 mt-2">
                    <p className="flex items-center text-white tracking-wide pr-1 sm:pr-3">{trimmedName}</p>
                    <div style={{maxWidth: '80%'}} className="rounded-md px-3 sm:px-5 py-1 text-white inline-block bg-gray-200">
                        <p className="w-full float-left text-black break-words">{message}</p>
                    </div>
                </div>
            )
    )
}

export default Message


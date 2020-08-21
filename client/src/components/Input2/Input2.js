import React from 'react';

const Input2 = ({ message, setMessage, sendMessage }) => {
    return (
        <form className="flex flex-initial border-gray-600">
            <input className="border-none px-1 w-9/12 sm:w-5/6 focus:outline-none" type="text" placeholder="Type a message" value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} />
            <button className="text-white no-underline bg-blue-600 p-3 inline-block w-3/12 sm:w-1/6 border-none " onClick={e => sendMessage(e)}>Send</button>
        </form>
    )
}

export default Input2


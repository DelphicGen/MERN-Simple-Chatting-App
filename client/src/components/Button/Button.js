import React from 'react'

const Button = ({text, onClick}) => {
    return (
        <button className="mt-12 w-full text-center border-2 p-1" onClick={onClick}>{text}</button>
    )
}

export default Button

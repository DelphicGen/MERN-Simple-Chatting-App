import React from 'react'

const Button = ({text, onClick, secondary}) => {
    return (
        <button className={`${secondary ? 'bg-transparent text-white border-2' :  'bg-white text-gray-700 border-0'} mt-12 w-full text-center p-1`} onClick={onClick}>{text}</button>
    )
}

export default Button

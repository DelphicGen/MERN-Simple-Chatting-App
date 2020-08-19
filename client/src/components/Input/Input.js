import React from 'react'

const Input = ({placeholder, type, value, name, onChange, required}) => {
    return (
        <React.Fragment>
            <input placeholder={placeholder} type={type} value={value} name={name} className="block w-full border-b-2 mt-12 bg-transparent focus:outline-none" onChange={onChange} required={required && required} />
        </React.Fragment>
    )
}

export default Input

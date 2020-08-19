import React from 'react'

const Input = ({placeholder, type, value, name, onChange}) => {
    return (
        <React.Fragment>
            <input placeholder={placeholder} type={type} value={value} name={name} className="block border-b-2 mt-12 bg-transparent focus:outline-none" onChange={onChange} />
        </React.Fragment>
    )
}

export default Input

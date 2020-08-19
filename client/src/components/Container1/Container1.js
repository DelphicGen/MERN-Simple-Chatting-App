import React from 'react'

const Container1 = (props) => {
    return (
        <div className="h-screen flex items-center justify-center text-white">
            {props.children}
        </div>
    )
}

export default Container1

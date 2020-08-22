import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../Input/Input';
import Button from '../Button/Button';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const backdrop = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
    }
}

const modal = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            delay: 0.2
        }
    }
}

const Modal = ({showModal, setShowModal, setResponse}) => {

    const history = useHistory();
    const [channel, setChannel] = useState({
        name: '',
        icon: ''
    })

    const handleFormChange = (e) => {
        let {name, value} = e.target
        setChannel((prevChannel) => ({
            ...prevChannel,
            [name]: value
        }))
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    const handleConfirm = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3050/api/channel/add',
            data: channel,
            withCredentials: true,
            headers: {'Content-Type': 'application/json' }
            })
            .then(async (response) => {
                if(response.data === 'Ok') {
                    setChannel(prevChannel => ({
                        ...prevChannel,
                        name: '',
                        icon: ''
                    }))
                    setShowModal(false)
                } else if (response.data === "Not authenticated") {
                    setShowModal(false)
                    history.push('/')
                } else {
                    setResponse(prevResponse => ({
                        ...prevResponse,
                        message: response.data.message,
                        type: 'Error'
                    }))
                }
            })
    }

    return (
        <AnimatePresence exitBeforeEnter>
            {
                showModal && (
                    <motion.div className="fixed z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 z-10 flex items-center"
                        variants={ backdrop }
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div className="w-10/12 sm:w-1/2 md:w-5/12 lg:w-1/3 mx-auto px-5 py-10 bg-blue-700 text-white rounded-md text-center"
                            variants={ modal }
                        >
                            <h1 className="mx-auto relative font-bold text-2xl sm:text-3xl md:text-4xl">New Channel</h1>
                            <Input placeholder="Channel's Name" type="text" value={channel.name} name="name" onChange={handleFormChange} />
                            <Input placeholder="Channel's Icon" type="text" value={channel.icon} name="icon" onChange={handleFormChange} />

                            <div className="flex">
                                {/* <Button onClick={() => setIsClicked(true)} text="Confirm" /> */}
                                <Button onClick={handleConfirm} text="Confirm" />
                                <Button onClick={handleCancel} text="Cancel" secondary={true} />
                            </div>

                        </motion.div>

                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Modal

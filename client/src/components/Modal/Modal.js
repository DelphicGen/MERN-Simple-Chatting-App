import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const Modal = ({showModal}) => {
    return (
        <AnimatePresence exitBeforeEnter>
            {
                showModal && (

                )
            }
        </AnimatePresence>
    )
}

export default Modal

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const flash = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}

const Flash = ({message, type}) => {

    return (
        <AnimatePresence exitBeforeEnter>
            {
                message && (
                    <motion.div className={`fixed top-0 right-0 text-white shadow-md py-2 px-4 mt-2 mr-2 text-lg font-bold ${type === 'Success' ? 'bg-green-600' : 'bg-red-600'}`}
                        variants={ flash }
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {message}
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Flash

import React from 'react';
import styles from './Channel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

const Channel = React.forwardRef(({icon, name, index, top, to}, ref) => {

    return (
        <div ref={el => ref[index] = el} className="my-5">
            {
                to ? (
                    <Link className={`block p-3 text-center text-white bg-gray-600 ${styles.link}`} to={to}>
                        <FontAwesomeIcon icon={['fas', icon]} size="lg" />
                    </Link>
                ) : (
                    <div className={`block p-3 text-center text-white bg-gray-600 ${styles.link}`} to={to}>
                        <FontAwesomeIcon icon={['fas', icon]} size="lg" />
                    </div>
                )
            }
            <p style={{top: top}} className={`absolute  bg-gray-900 rounded-md text-white text-center mt-2 px-1 py-2 block ${styles.channel_modal}`}>
                {name}
            </p>
        </div>
    )
})

export default Channel

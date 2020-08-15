import React from 'react';
import styles from './Channel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

const Channel = React.forwardRef(({icon, name, index, top}, ref) => {

    return (
        <div ref={el => ref[index] = el} className="my-5">
            <Link className={`block p-3 text-center text-white bg-gray-600 ${styles.link}`}>
                <FontAwesomeIcon icon={['fas', icon]} size="lg" />
            </Link>
            <p style={{top: top}} className={`absolute top-0 bg-gray-900 text-white text-center mt-2 px-1 py-2 block invisible ${styles.channel_modal}`}>
                {name}
            </p>
        </div>
    )
})

export default Channel

import React from 'react';
import styles from './Channel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

const Channel = React.forwardRef(({icon, name, index, top}, ref) => {

    return (
        <div ref={el => ref[index] = el} className={`${styles.channel}`}>
            <Link className={styles.link}>
                <FontAwesomeIcon icon={['fas', icon]} size="lg" color="white" />
            </Link>
            <p style={{top: top}} className={`absolute ${styles.channel_modal}`}>
                {name}
            </p>
        </div>
    )
})

export default Channel

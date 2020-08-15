import React from 'react';
import styles from './Channel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

const Channel = React.forwardRef(({icon, name, index}, ref) => {
    const selectedIcon = require(`@fortawesome/free-solid-svg-icons/${icon}`).definition

    return (
        <div ref={el => ref[index] = el} className={`${styles.channel}`}>
            <Link className={styles.link}>
                <FontAwesomeIcon icon={selectedIcon} size="lg" color="white" />
            </Link>
            <p className={`absolute ${styles.channel_modal}`}>
                {name}
            </p>
        </div>
    )
})

export default Channel

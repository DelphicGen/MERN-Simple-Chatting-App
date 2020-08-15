import React, { useEffect, useRef } from 'react';
import styles from './Channels.module.css';

import Create from '../Create';
import Channel from '../../components/Channel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

const Channels = () => {

    const channelRef = useRef([]);

    useEffect(() => {
    
        console.log(channelRef.current)

    }, [])

    return (
        <div className={`h-screen ${styles.channels}`}>
            <div className={`h-full ${styles.channels_container}`}>
                <Channel icon="faCoffee" name="Coffee" index={0} ref={channelRef.current} />
                <Channel icon="faCogs" name="Coffee" index={1} ref={channelRef.current} />
                {/* <div ref={el => channelRef.current[0] = el} className={`${styles.channel}`}>
                    <Link className={styles.link}>
                        <FontAwesomeIcon icon={faCoffee} size="lg" color="white" />
                    </Link>
                    <p className={`absolute ${styles.channel_modal}`}>
                        Coffee
                    </p>
                </div> */}

                {/* <div ref={el => channelRef.current[1] = el} className={`${styles.channel}`}>
                    <Link className={styles.link}>
                        <FontAwesomeIcon icon={faCogs} size="lg" color="white" />
                    </Link>
                    <div className={`${styles.channel_modal}`}>
                        Cogs
                    </div>
                </div>

                <div ref={el => channelRef.current[2] = el} className={`${styles.channel}`}>
                    <Link className={styles.link} to={Create}>
                        <FontAwesomeIcon icon={faPlus} size="lg" color="white" />
                    </Link>
                    <div className={`${styles.channel_modal}`}>
                        Create
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default Channels
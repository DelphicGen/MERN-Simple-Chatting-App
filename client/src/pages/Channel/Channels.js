import React, { useState, useEffect, useRef } from 'react';
import styles from './Channels.module.css';

import Create from '../Create';
import Channel from '../../components/Channel';

const Channels = () => {

    const [channelOffset, setChannelOffset] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const channelRef = useRef([]);
    const channelsContainerRef = useRef(null);
    
    const onScroll = (e) => {
        setScrollTop(e.target.scrollTop);
    }

    useEffect(() => {

        channelsContainerRef.current.addEventListener('scroll', onScroll);

        return () => channelsContainerRef.current.removeEventListener('scroll', onScroll);

    }, [])

    useEffect(() => {
        let tempOffset = []
        channelRef.current.forEach(ref=> {
            tempOffset.push(ref.getBoundingClientRect().top)
        })

        setChannelOffset(tempOffset);

    }, [scrollTop])

    return (
        <div className="h-screen fixed top-0 left-0 overflow-visible bg-gray-800">
            <div ref={channelsContainerRef} className={`px-3 h-full overflow-y-auto ${styles.channels_container}`}>

                <Channel icon="coffee" name="Coffee" index={0} ref={channelRef.current} top={channelOffset[0]} />
                <Channel icon="cogs" name="Cogs" index={1} ref={channelRef.current} top={channelOffset[1]} />
                <Channel icon="plus" name="New Channel" index={2} ref={channelRef.current} top={channelOffset[2]} />

            </div>
        </div>
    )
}

export default Channels
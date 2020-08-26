import React, { useState, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import styles from './Channels.module.css';
import Channel from '../../components/Channel/Channel';
import {modalContext} from '../../App';


const Channels = ({username, disconnect}) => {

    const history = useHistory();
    const ModalContext = useContext(modalContext)
    const [channels, setChannels] = useState([]);
    const [index, setIndex] = useState(0);
    const [channelOffset, setChannelOffset] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const channelRef = useRef([]);
    const channelsContainerRef = useRef(null);
    
    const onScroll = (e) => {
        setScrollTop(e.target.scrollTop);
    }

    const addChannel = () => {
        ModalContext.setShowModal(true)
    }

    const logout = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:3050/api/auth/logout',
            withCredentials: true,
            headers: {'Content-Type': 'application/json' }
        })
            .then(response => {
                if(response.data === 'Ok') {
                    disconnect()
                    history.push('/')
                }
            })
    }

    useEffect(() => {
        let tempRef = channelsContainerRef.current
        tempRef.addEventListener('scroll', onScroll);

        return () => tempRef.removeEventListener('scroll', onScroll);

    }, [])

    useEffect(() => {
        let didCancel = false;
        if(!ModalContext.showModal) {
            axios({
                method: 'get',
                url: 'http://localhost:3050/api/channel/list',
                withCredentials: true,
                headers: {'Content-Type': 'application/json' }
            })
                .then(response => {
                    if(response.data === "Not authenticated" && !didCancel) {
                        history.push('/')
                    }

                    if(!didCancel) {
                        let tempChannels = [...channels]
                        tempChannels = response.data    
                        setIndex(response.data.length)
                        setChannels(tempChannels)
                    }
                })
        }
        return () => { didCancel = true }
    }, [ModalContext.showModal, history])

    useEffect(() => {
        let didCancel = false;
        let tempOffset = [];
        channelRef.current.forEach(ref=> {
            tempOffset.push(ref.getBoundingClientRect().top)
        })

        if(!didCancel) setChannelOffset(tempOffset);
        return () => {didCancel = true}
    }, [scrollTop, channels])

    return (
        <div className="h-screen fixed top-0 z-10 left-0 overflow-visible bg-gray-800">
            <div ref={channelsContainerRef} style={{height: 'calc(100vh - 48px)'}} className={`px-3 overflow-y-auto ${styles.channels_container}`}>

                {
                    channels.map((channel, index) => {
                        return <Channel key={channel._id} icon={channel.icon} name={channel.name} index={index} ref={channelRef.current} top={channelOffset[index]} to={`/channel?channel=${channel._id}&username=${username}`} />
                    })
                }

                <Channel icon="plus" name="New Channel" index={index} ref={channelRef.current} top={channelOffset[index]} onClick={addChannel} />

            </div>

            <div className="cursor-pointer absolute z-10 bottom-0 w-full" onClick={logout}>
                <div className={`block p-3 text-center text-white bg-gray-600 ${styles.link}`}>
                    <FontAwesomeIcon icon={['fas', "sign-out-alt"]} size="lg" />
                </div>
                <p style={{top: 0}} className={`absolute bg-gray-900 rounded-md text-white text-center mt-2 px-1 py-2 block ${styles.channel_modal}`}>
                    Logout
                </p>
            </div>
        </div>
    )
}

export default Channels
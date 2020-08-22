import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Channels from '../Channels/Channels';
import io from 'socket.io-client';
import Messages from '../../components/Messages/Messages';
import Input2 from '../../components/Input2/Input2';
import './Room.module.css';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
let socket;

function Room({checkAuthenticated}) {

    const history = useHistory();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [channel, setChannel] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:3050'

    useEffect(() => {
        const {channel, username} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setUsername(username);
        setChannel(channel);

        socket.emit('join', {username, channel}, (error) => {
            if(error) console.log(error)
        });

        axios({
            method: 'get',
            url: `http://localhost:3050/api/channel/message?channel=${channel}`,
            withCredentials: true,
            headers: {'Content-Type': 'application/json' }
        })
            .then(response => {
                setMessages([...response.data])
            })

        return (
            () => {
                socket.emit('disconnect');
                socket.off();
            }
        )
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault();
        
        if(message){
            axios({
                method: 'post',
                url: `http://localhost:3050/api/channel/message?channel=${channel}`,
                data: {message: message, username: username},
                withCredentials: true,
                headers: {'Content-Type': 'application/json' }
            })
                .then(response => {
                    if(response.data === 'Ok') {     
                        socket.emit('sendMessage', message, () => {
                            setMessage('');
                        })
                    }
                })
        }
    }

    const disconnect = () => {
        socket.close()
    }

    useEffect(() => {
        let didCancel = false;
        const fetchCheckAuthenticatedAPI = async () => {
            const response = await checkAuthenticated();
            if(!didCancel) {
                if(response.data !== 'Ok') history.push('/');
            }
        }

        fetchCheckAuthenticatedAPI();
        return () => { didCancel = true }
    }, [])

    return (
        <div className="flex">
            <Channels username={username} disconnect={disconnect} />
            <div style={{marginLeft: '74.641px'}} className="flex flex-col w-full h-screen overflow-auto">
                <Messages messages={messages} username={username} />

                <Input2 message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Room

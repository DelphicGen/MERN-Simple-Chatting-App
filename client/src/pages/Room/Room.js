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
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:3050'

    useEffect(() => {
        const {room, name} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (error) => {
            if(error) console.log(error)
        });
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        axios({
            method: 'get',
            url: `http://localhost:3050/api/channel/message?room=${room}`,
            withCredentials: true,
            headers: {'Content-Type': 'application/json' }
        })
            .then(response => {
                setMessages([...messages, ...response.data])
            })

        return (
            () => {
                socket.emit('disconnect');
                socket.off();
            }
        )
    }, [ENDPOINT, location.search]);

    const sendMessage = (e) => {
        e.preventDefault();
        
        if(message){
            axios({
                method: 'post',
                url: `http://localhost:3050/api/channel/message?room=${room}`,
                data: {message: message, username: name},
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
            <Channels name={name} disconnect={disconnect} />
            <div style={{marginLeft: '74.641px'}} className="flex flex-col w-full h-screen overflow-auto">
                <Messages messages={messages} name={name} />

                <Input2 message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Room

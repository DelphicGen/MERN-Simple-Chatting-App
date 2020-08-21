import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Channels from '../Channels/Channels';
import io from 'socket.io-client';
import Messages from '../../components/Messages/Messages';
import Input2 from '../../components/Input2/Input2';
import './Room.module.css'
import queryString from 'query-string';
let socket;

function Room({checkAuthenticated, location}, props) {

    const history = useHistory();
    // Use to store the value of name and room inputed by user
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:3050'

    useEffect(() => {
        // const {channel, username} = queryString.parse(location.search);
        console.log(props)
        let room = localStorage.getItem('channel_id');
        let name = localStorage.getItem('username');

        socket = io(ENDPOINT);

        console.log(name)

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {
            
        });

        return (
            () => {
                socket.emit('disconnect');
                socket.off();
            }
        )
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    // function for sending messages
    const sendMessage = (e) => {
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => {
                setMessage('');
            })
        }
    }

    useEffect(() => {
        let didCancel = false;
        const fetchCheckAuthenticatedAPI = async () => {
            const response = await checkAuthenticated();
            if(!didCancel) {
                if(response.data !== 'Ok') history.push('/');
                else {

                }
            }
        }

        fetchCheckAuthenticatedAPI();
        return () => { didCancel = true }
    }, [])

    return (
        <div className="flex">
            <Channels />
            <div style={{marginLeft: '74.641px'}} className="flex flex-col w-full h-screen overflow-auto">
                <Messages messages={messages} name={name} />

                <Input2 message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Room

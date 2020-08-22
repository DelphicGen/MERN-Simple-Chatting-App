import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import Container1 from '../../components/Container1/Container1'

const Login = ({setResponse, checkNotAuthenticated}) => {
    const history = useHistory()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const handleFormChange = (e) => {
        let {name, value} = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const login = () => {
        setResponse('')
        axios({
            method: 'post',
            url: 'http://localhost:3050/api/auth/login',
            data: form,
            withCredentials: true,
            headers: {'Content-Type': 'application/json' }
        })
            .then(response => {
                if(response.data.message === 'Ok') {
                    localStorage.setItem('channel_id', response.data.user.channel_id[0]);
                    localStorage.setItem('username', response.data.user.username);
                    history.push({
                        pathname: '/room',
                        search: `?room=${response.data.user.channel_id[0]}&name=${response.data.user.username}`
                    })
                    // history.push('/room')
                } else {
                    setResponse(prevResponse => ({
                        ...prevResponse,
                        message: response.data.message,
                        type: 'Error'
                    }))
                }
            })
    }

    useEffect(() => {
        let didCancel = false;
        const fetchCheckNotAuthenticatedAPI = async () => {
            const response = await checkNotAuthenticated();
            if(!didCancel) {
                if(response.data !== 'Ok') history.push('/room')
            }
        }

        fetchCheckNotAuthenticatedAPI()
        return () => { didCancel = true }
    }, [])

    return (
        <Container1>
            <div>
                <Header text="Login" />
                <div>
                    <Input placeholder="Username" type="text" value={form.username} name="username" onChange={handleFormChange} />
                    <Input placeholder="Password" type="password" value={form.password} name="password" onChange={handleFormChange} />
                    <Button onClick={login} text="Login" />
                </div>
                <br />
                <a href="/register">Do not have an account ? Register</a>
            </div>
        </Container1>
    )
}

export default Login

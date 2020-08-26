import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Container1 from '../../components/Container1/Container1';
import { useDispatch } from 'react-redux';
import { error } from '../../actions/action';

const Login = ({checkNotAuthenticated}) => {
    const history = useHistory();
    const dispatch = useCallback(useDispatch(), []);
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
        dispatch({type: '', message: ''});
        axios({
            method: 'post',
            url: 'http://localhost:3050/api/auth/login',
            data: form,
            withCredentials: true,
            headers: {'Content-Type': 'application/json' }
        })
            .then(response => {
                if(response.data.message === 'Ok') {
                    history.push({
                        pathname: '/channel',
                        search: `?channel=${response.data.user.channel_id[0]}&username=${response.data.user.username}`
                    })
                } else {
                    dispatch(error(response.data.message))
                }
            })
    }

    useEffect(() => {
        let didCancel = false;
        const fetchCheckNotAuthenticatedAPI = async () => {
            const response = await checkNotAuthenticated();
            if(!didCancel) {
                if(response.data !== 'Ok') history.push('/channel')
            }
        }

        fetchCheckNotAuthenticatedAPI()
        return () => { didCancel = true }
    }, [checkNotAuthenticated, history])

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

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import Container1 from '../../components/Container1/Container1'

const Register = ({setResponse, checkNotAuthenticated}) => {
    
    const history = useHistory();
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleFormChange = (e) => {
        const {name, value} = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    const register = () => {
        setResponse('')
        axios({
            method: 'post',
            url: 'http://localhost:3050/api/auth/register',
            data: form,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                if(response.data === "Username is taken" || response.data === "Password field is required") {
                    setResponse(prevResponse => ({
                        ...prevResponse,
                        message: response.data,
                        type: 'Error'
                    }))
                } else if(response.data === "Ok") {
                    setResponse(prevResponse => ({
                        ...prevResponse,
                        message: "User successfully registered",
                        type: 'Success'
                    }))
                    history.push('/')
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
                if(response.data !== 'Ok') history.push('/channel')
            }
        }

        fetchCheckNotAuthenticatedAPI()
        return () => { didCancel = true }
    }, [])

    // useEffect(() => {
    //     let timer
    //     if(response) {
    //         timer = setTimeout(function() {
    //             setResponse('')
    //         }, 6000)
    //     }
    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [response])

    return (
        <Container1>
            <div className="text-white">
                <Header text="Register" />
                <div>
                    <Input placeholder="Username" type="text" value={form.username} name="username" onChange={handleFormChange} required={true} />
                    <Input placeholder="Password" type="password" value={form.password} name="password" onChange={handleFormChange} required={true} />
                    <Button onClick={register} text="Register" />
                </div>
                <br />
                <a href="/">Already have an account ? Login</a>
            </div>
        </Container1>
    )
}

export default Register

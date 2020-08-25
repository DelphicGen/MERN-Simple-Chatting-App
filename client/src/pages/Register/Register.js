import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import Container1 from '../../components/Container1/Container1'
import { useSelector, useDispatch } from 'react-redux'
import { success, error } from '../../actions/action'

const Register = ({setResponse, checkNotAuthenticated}, props) => {
    
    const history = useHistory();
    // const alert = useSelector(state => state);
    const dispatch = useDispatch();
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
        dispatch({type: '', message: ''});
        axios({
            method: 'post',
            url: 'http://localhost:3050/api/auth/register',
            data: form,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                if(response.data === "Username is taken" || response.data === "Password field is required") {
                    dispatch(error(response.data))
                } else if(response.data === "Ok") {
                    dispatch(success("User successfully registered"))
                    history.push('/')
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
    }, [])

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

import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';


import Room from './pages/Room/Room';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Flash from './components/Flash/Flash';
import Modal from './components/Modal/Modal';
import store from './store';

library.add(fas)
export const modalContext = React.createContext()

function App() {

  const {alert: {message, type}} = useSelector(state => state);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
      let timer
      if(message) {
          timer = setTimeout(function() {
              dispatch({type: '', message: ''});
          }, 3000)
      }
      return () => {
          clearTimeout(timer)
      }
  }, [message])

  const checkNotAuthenticated = () => {
    return axios(
      {
        method: 'GET',
        url: 'http://localhost:3050/api/auth/checknotauthenticated',
        withCredentials: true,
        headers: {'Content-Type': 'application/json' }
      })
  }

  const checkAuthenticated = () => {
    return axios(
      {
        method: 'GET',
        url: 'http://localhost:3050/api/auth/checkauthenticated',
        withCredentials: true,
        headers: {'Content-Type': 'application/json' }
      })
  }


  return (
      <modalContext.Provider value={
        {
          showModal,
          setShowModal
        }
      }>
        <Router>
          <div className="app-container">
            <div className="bg-gray-700 w-full min-h-screen overflow-hidden">
                <Modal showModal={showModal} setShowModal={setShowModal} />
                <Flash message={message} type={type} />
                <Switch>

                  <Route path="/" exact>
                    <Login checkNotAuthenticated={checkNotAuthenticated} />
                  </Route>
                  <Route path="/register">
                    <Register checkNotAuthenticated={checkNotAuthenticated} />
                  </Route>
                  <Route path="/channel">
                    <Room checkAuthenticated={checkAuthenticated} />
                  </Route>
                  <Route path="*" component={NotFoundPage} />

                </Switch>
            </div>

          </div>
        </Router>
      </modalContext.Provider>
  );
}

export default App;

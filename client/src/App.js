import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Room from './pages/Room/Room';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Flash from './components/Flash/Flash';
import Modal from './components/Modal/Modal';

library.add(fas)
export const modalContext = React.createContext()

function App() {
  
  const [response, setResponse] = useState({
    message: '',
    type: ''
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
      let timer
      if(response) {
          timer = setTimeout(function() {
              setResponse('')
          }, 3000)
      }
      return () => {
          clearTimeout(timer)
      }
  }, [response])

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
              <Flash message={response.message} type={response.type} />
              <Modal setResponse={setResponse} showModal={showModal} setShowModal={setShowModal} />
              <Switch>

                <Route path="/" exact>
                  <Login setResponse={setResponse} checkNotAuthenticated={checkNotAuthenticated} />
                </Route>
                <Route path="/register">
                  <Register setResponse={setResponse} checkNotAuthenticated={checkNotAuthenticated} />
                </Route>
                <Route path="/room">
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

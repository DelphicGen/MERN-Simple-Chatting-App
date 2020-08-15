import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Create from './pages/Create';
import Room from './pages/Room';
import Channels from './pages/Channel/Channels';

function App() {
  return (
    <Router>
        <div className="flex app-container">
          <Channels />

          <Switch>

            {/* <Route path="/" exact component={Create}></Route> */}
            <Route path="/room" component={Room}></Route>

          </Switch>
        </div>
      </Router>
  );
}

export default App;

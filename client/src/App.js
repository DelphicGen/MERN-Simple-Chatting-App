import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Create from './pages/Create';
import Room from './pages/Room';
import Channels from './pages/Channel/Channels';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
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

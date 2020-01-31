import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute';
import Jokes from './components/Jokes';
import Register from './components/Register';



function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <PrivateRoute path="/Jokes" component={Jokes} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route component={Jokes} />
        </Switch>
      </Container>
    </Router>    
  )
}

export default App;

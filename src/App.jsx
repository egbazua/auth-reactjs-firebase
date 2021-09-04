import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Admin from './components/Admin';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import Reset from './components/Reset';

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if(user){
        setFirebaseUser(user);
      }else{
        setFirebaseUser(null);
      }
    })
    
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}/>
        <Switch>
        <Route exact path="/">
            Home...
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Loading...</p>
  )
}

export default App;

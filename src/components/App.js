import { lazy, Suspense, useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../data/context';
import { HashRouter, Switch, Route } from 'react-router-dom';

const Main = lazy(() => import('./Main').then(module => ({default:module.Main})));
const SignIn = lazy(() => import('./SignIn').then(module => ({default:module.SignIn})));
const AddNote = lazy(() => import('./AddNote').then(module => ({default:module.AddNote})));

function App() {

  const [user] = useAuthState(auth);

  const [userData, setUserData] = useState({});

  return (
    <HashRouter>
      <div className="App">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Context.Provider value={{
            userData, setUserData, user
          }}>
            <Switch>

              <Route exact path="/">
                {user ? <Main/> : <SignIn/>}
              </Route>

              <Route exact path="/create" component={AddNote}/>

            </Switch>
          </Context.Provider>
        </Suspense>
      </div>
    </HashRouter>
  );
}

export default App;

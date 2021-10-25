import { lazy, Suspense, useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../data/context';

const Main = lazy(() => import('./Main').then(module => ({default:module.Main})));
const SignIn = lazy(() => import('./SignIn').then(module => ({default:module.SignIn})));

function App() {

  const [user] = useAuthState(auth);

  const [userData, setUserData] = useState({});

  return (
    <div className="App">
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Context.Provider value={{
          userData, setUserData
        }}>

          {user ? <Main/> : <SignIn/>}

        </Context.Provider>
      </Suspense>
    </div>
  );
}

export default App;

import { auth, provider } from '../firebase';
import { signInWithPopup } from '@firebase/auth';

export function SignIn(){

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
    }

    return (<div id="SignIn">
        <h1>SignIn</h1>
        <button onClick={() => signInWithGoogle()}>Sign In With Google</button>
    </div>)
}
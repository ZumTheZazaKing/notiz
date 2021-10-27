import { auth, provider } from "../firebase";
import { useContext } from "react";
import { Context } from "../data/context";
import { signInWithPopup } from '@firebase/auth';
import { SignOut } from "./SignOut";

export function Topbar(){

    let { user } = useContext(Context);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
    }

    return (<div className="topBar">
        <h1>Notiz</h1>
        <div className="profileInfo">
            {user ? <SignOut/> : <button onClick={() => signInWithGoogle()}>Sign In</button>}
            <img src={user ? auth.currentUser.photoURL : "https://via.placeholder.com/500x500.jpg?text=G"} alt="pp"/>
        </div>
    </div>)
}
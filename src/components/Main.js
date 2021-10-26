import { useEffect, useContext, lazy, Suspense } from 'react';
import { doc, onSnapshot, setDoc, collection } from 'firebase/firestore';

import { SignOut } from './SignOut';
import { db, auth } from '../firebase';
import { Context } from '../data/context';

const NoteThumb = lazy(() => import('./NoteThumb').then(module => ({default:module.NoteThumb})));

export function Main(){

    let { userData, setUserData } = useContext(Context);

    useEffect(
        () => {
            onSnapshot(doc(db,"users",auth.currentUser.uid), snapshot => {
                if(!snapshot.exists()){
                    handleNewUser();
                    setUserData({...snapshot.data(), id:snapshot.id, notes:[]})
                    return;
                }
                onSnapshot(collection(db,"notes"), collectionSnapshot => {
                    setUserData({...snapshot.data(), id:snapshot.id, 
                        notes:[...collectionSnapshot.docs.filter(d => d.data().author === snapshot.id)]
                    });
                })
                
            })
        },[]
    )

    const handleNewUser = async () => {
        const userDocRef = doc(db,"users",auth.currentUser.uid);
        const userPayload = {
            name:auth.currentUser.displayName,
            avatar:auth.currentUser.photoURL
        }
        await setDoc(userDocRef, userPayload);
    }

    return (userData ? <div id="Main">
        <div className="topBar">
            <SignOut/>
            <img src={`${userData.avatar}`} alt=""/>
        </div>
        <br/>
        <input type="text"/>
        <button onClick={() => console.log(userData.notes[1].data())}>Log results</button>
        <div id="notes">
            <Suspense fallback={<h1>Loading...</h1>}>
                {userData.notes && userData.notes.map((note,i) => <NoteThumb key={i} info={note}/>)}
            </Suspense>
        </div>
        
    </div> : <h1>Loading...</h1>)
}
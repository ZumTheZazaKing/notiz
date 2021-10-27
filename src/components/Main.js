import { useEffect, useContext, lazy, Suspense } from 'react';
import { doc, onSnapshot, setDoc, collection, query, orderBy } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

import { db, auth } from '../firebase';
import { Context } from '../data/context';

const NoteThumb = lazy(() => import('./NoteThumb').then(module => ({default:module.NoteThumb})));

export function Main(){

    const history = useHistory();
    let { userData, setUserData } = useContext(Context);

    useEffect(
        () => {
            onSnapshot(doc(db,"users",auth.currentUser.uid), snapshot => {
                if(!snapshot.exists()){
                    handleNewUser();
                    setUserData({...snapshot.data(), id:snapshot.id, notes:[]})
                    return;
                }
                const q = query(collection(db,"notes"), orderBy("createdAt","desc"));
                onSnapshot(q, collectionSnapshot => {
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

    return (userData.avatar ? <div id="Main">
        <br/>
        <button onClick={() => history.push("/create")}>+ New</button>
        <br/><br/>
        <div id="notes">
            <Suspense fallback={<div className="loading"><h1>Loading...</h1></div>}>
                {userData.notes ? userData.notes && userData.notes.map((note,i) => <NoteThumb key={i} info={note}/>) : <h2>Wow. So empty</h2>}
            </Suspense>
        </div>
        
    </div> : <div className="loading"><h1>Loading...</h1></div>)
}
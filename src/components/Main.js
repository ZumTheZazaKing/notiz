import { useEffect, useContext } from 'react';
import { doc, onSnapshot, setDoc, collection } from 'firebase/firestore';

import { SignOut } from './SignOut';
import { db, auth } from '../firebase';
import { Context } from '../data/context';

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
        <div id="notes">

        </div>
        
    </div> : "Loading...")
}
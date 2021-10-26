import { useHistory } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../data/context';
import { onSnapshot, doc } from '@firebase/firestore';
import { db } from '../firebase';

export const ReadNote = ({match}) => {

    const history = useHistory()
    let { user } = useContext(Context);

    const [readData, setReadData] = useState({});

    useEffect(() => {
        if(!user)history.push('/');
    })

    useEffect(() => {
        onSnapshot(doc(db,"notes",match.params.noteId), snapshot => {
            setReadData(snapshot.data())
        })
    },[])

    return (readData ? <div className="readNote">
        <button onClick={() => history.push('/')}>Back</button>
        <h1>{readData.title}</h1>
        <h4>{readData.dateTime}</h4>
        <button onClick={() => history.push(`/delete/${match.params.noteId}`)}>Delete</button>
        <button onClick={() => history.push(`/update/${match.params.noteId}`)}>Update</button>
        <br/><br/>
        <p>{readData.body}</p>
    </div> : <div className="loading"><h1>Loading...</h1></div>)
}
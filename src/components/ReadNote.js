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

    return (readData ? <div id="ReadNote">
        <button onClick={() => history.push('/')}>Back</button>
        <div id="body">
            <header>
                <h1>{readData.title}</h1>
                <h4>{readData.dateTime}</h4>
                <br/>
                <button className="delete" onClick={() => history.push(`/delete/${match.params.noteId}`)}>Delete</button>
                <button className="update" onClick={() => history.push(`/update/${match.params.noteId}`)}>Update</button>
            </header>
            <br/><br/>
            <p>{readData.body}</p>
        </div>
    </div> : <div className="loading"><h1>Loading...</h1></div>)
}
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../data/context';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from '@firebase/firestore';

export const UpdateNote = ({match}) => {

    const history = useHistory();
    let { user } = useContext(Context);

    const [updateData, setUpdateData] = useState({});

    useEffect(() => {
        if(!user)history.push("/");

        onSnapshot(doc(db,"notes",match.params.noteId), snapshot => {
            setUpdateData(snapshot.data())
        })
    },[])

    const updateNote = async e => {
        e.preventDefault();
        await updateDoc(doc(db,"notes",match.params.noteId), {...updateData})
        history.push(`/read/${match.params.noteId}`);
    }

    return (updateData.title ? <div className="updateNote">
        <button onClick={() => history.push(`/read/${match.params.noteId}`)}>Back</button>
        <h1>Update Note</h1>
        <br/>
        <form onSubmit={(e) => updateNote(e)}>
            <label>Title:</label>
            <br/>
            <input type="text" value={updateData.title} onChange={e => setUpdateData({...updateData, title:e.target.value})}/>
            <br/>
            <textarea rows={5} value={updateData.body} onChange={e => setUpdateData({...updateData, body:e.target.value})}></textarea>
            <br/>
            <input type="submit" value="Update"/>
        </form>
    </div> : <h1>Loading...</h1>)
}
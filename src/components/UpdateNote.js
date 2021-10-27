import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../data/context';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { toast } from 'react-toastify';

export const UpdateNote = ({match}) => {

    const history = useHistory();
    let { user } = useContext(Context);

    const [updateData, setUpdateData] = useState({});

    useEffect(() => {
        if(!user)history.push("/");
    })

    useEffect(() => {
        onSnapshot(doc(db,"notes",match.params.noteId), snapshot => {
            setUpdateData(snapshot.data())
        })
    },[])

    const updateNote = async e => {
        e.preventDefault();
        await updateDoc(doc(db,"notes",match.params.noteId), {...updateData})
        .then(() => toast.success("Note updated"))
        .catch(() => toast.error(`Something went wrong`))
        history.push(`/read/${match.params.noteId}`);
    }

    return (updateData.title ? <div id="UpdateNote">
        <button onClick={() => history.push(`/read/${match.params.noteId}`)}>Back</button>
        <form onSubmit={(e) => updateNote(e)}>
            <h1>Update Note</h1>
            <br/>
            <label>Title:</label>
            <br/>
            <input type="text" value={updateData.title} onChange={e => setUpdateData({...updateData, title:e.target.value})}/>
            <br/><br/>
            <textarea rows={20} value={updateData.body} onChange={e => setUpdateData({...updateData, body:e.target.value})}></textarea>
            <br/><br/>
            <input type="submit" value="Update"/>
        </form>
    </div> : <div className="loading"><h1>Loading...</h1></div>)
}
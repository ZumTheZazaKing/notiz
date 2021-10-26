import { useState, useEffect, useContext } from "react";
import { Context } from "../data/context";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";

export function AddNote(){

    const history = useHistory();
    let { user } = useContext(Context);

    useEffect(() => {
        if(!user)history.push("/")
    })

    const [addData, setAddData] = useState({title:"",body:""});

    const createNote = async e => {
        e.preventDefault();
        const currentTime = new Date().toLocaleString()
        await addDoc(collection(db,"notes"),{
            title:addData.title,
            body:addData.body,
            author:auth.currentUser.uid,
            createdAt:serverTimestamp(),
            dateTime:currentTime
        })
        history.push("/")
    }

    return (<div id="AddNote">
        <button onClick={() => history.push("/")}>Back</button>
        <h1>Add Note</h1>
        <br/>
        <form onSubmit={(e) => createNote(e)}>
            <label>Title</label>
            <br/>
            <input type="text" value={addData.title} onChange={e => setAddData({...addData, title:e.target.value})} max={30} required/>
            <br/>
            <textarea rows={5} value={addData.body} onChange={e => setAddData({...addData, body:e.target.value})} required></textarea>
            <br/>
            <input type="submit" value="Create"/>
        </form>
    </div>)
}
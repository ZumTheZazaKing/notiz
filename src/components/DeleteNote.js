import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { deleteDoc, doc } from "@firebase/firestore";
import { useContext, useEffect } from "react";
import { Context } from "../data/context";

export const DeleteNote = ({match}) => {

    const history = useHistory();
    let { user } = useContext(Context)

    useEffect(() => {
        if(!user)history.push("/")
    })

    const deleteNote = async () => {
        await deleteDoc(doc(db,"notes",match.params.noteId))
        history.push("/")
    }

    return (<div className="deleteNote">
        <h3>Are you sure you want to delete this note?</h3>
        <button onClick={() => history.push(`/read/${match.params.noteId}`)}>No</button>
        <button onClick={() => deleteNote()}>Yes</button>
    </div>)
}
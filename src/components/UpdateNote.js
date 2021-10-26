import { useHistory } from 'react-router-dom';

export const UpdateNote = ({match}) => {

    const history = useHistory();

    return (<div className="updateNote">
        <button onClick={() => history.push(`/read/${match.params.noteId}`)}>Back</button>
        <h1>{match.params.noteId}</h1>
    </div>)
}
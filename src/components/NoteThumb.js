import { useHistory } from 'react-router-dom';

export function NoteThumb(props){
    
    const history = useHistory()
    let { title, dateTime } = props.info.data()

    return (<div onClick={() => history.push(`/read/${props.info.id}`)} className="noteThumb">
        <h2>{title}</h2>
        <br/>
        <p>{dateTime}</p>
    </div>)
}
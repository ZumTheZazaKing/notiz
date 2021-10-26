export function NoteThumb(props){

    let { title, body } = props.info.data()

    return (<div className="noteThumb">
        <h2>{title}</h2>
        <p>{body}</p>
    </div>)
}
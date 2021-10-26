export function NoteThumb(props){

    let { title } = props.info.data()

    return (<div className="noteThumb">
        <h2>{title}</h2>
    </div>)
}
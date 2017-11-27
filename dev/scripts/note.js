import React from 'react';

// This component lives inside the <SubjectNotes /> component when the user navigates to the contents of a Subject
class Note extends React.Component {

    //Allow the component access to its props
    constructor(props) {
        super(props);
        //Get a custom firebase reference using the classroomID and subjectID props so we can store any new notes in the correct directory
        this.dbNotes = firebase.database().ref(`classrooms/${this.props.classroomID}/subjects/${this.props.subjectID}/notes`)
        this.state = {
            disabled: true,
            edits: this.props.note
        }
        this.deleteNote = this.deleteNote.bind(this)
        this.editNote = this.editNote.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //When the user clicks the X icon, the Firebase data is deleted, and the Note component is also deleted
    deleteNote() {
        this.dbNotes.child(this.props.noteID).remove();
    }

    //When the user clicks the pencil icon, the input is no longer disabled, and the user may make edits to the Note as they wish
    editNote() {
        this.setState({
            disabled: false
        })
    }

    //Updates the input text as the user types into the input
    handleChange(event) {
        this.setState({ edits: event.target.value })
    }

    //When the user is editing a note and submits it by hitting enter, update the Firebase data and disable the input again
    handleSubmit(event) {
        event.preventDefault()
        this.dbNotes.child(this.props.noteID).set(this.state.edits);
        this.setState({
            disabled: true
        })
    }

    render() {
        return (
            <li className="note">

                {/* Button to be clicked when the user wishes to delete the note */}
                <i className="fa fa-times-circle" aria-hidden="true" onClick={this.deleteNote}></i>

                {/* The input field which contains the note */}
                <form onSubmit={this.handleSubmit}>
                    <input
                        className={this.state.disabled ? "" : "note-being-edited"}
                        maxLength="75"
                        disabled={this.state.disabled}
                        value={this.state.edits}
                        onChange={this.handleChange}
                    />
                </form>

                {/* Button to be clicked when the user wishes to edit the note */}
                <i className="fa fa-pencil" aria-hidden="true" onClick={this.editNote}></i>
            </li>
        );
    }
}

export default Note;
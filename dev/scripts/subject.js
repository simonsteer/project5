import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// This component lives inside the <ClassroomSubjects /> component when the user navigates to the contents of a Classroom
class Subject extends React.Component {

        //Allow the component access to its props
        constructor(props) {
        super(props);
        //Get a custom firebase reference using the classroomID and subjectID props so we can store any new subjects in the correct directory
        this.dbSubjects = firebase.database().ref(`classrooms/${this.props.classroomID}/subjects/${this.props.subjectID}`)
        this.state = {
            disabled: true,
            edits: this.props.subjectTitle
        }
        this.deleteSubject = this.deleteSubject.bind(this)
        this.editSubject = this.editSubject.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //When the user clicks the X icon, the Firebase data is deleted, and the Subject component is also deleted
    deleteSubject() {
        this.dbSubjects.remove()
    }

    //When the user clicks the pencil icon, the input is no longer disabled, and the user may make edits to the Subject as they wish
    editSubject() {
        this.setState({
            disabled: false
        })
    }

    //Updates the input text as the user types into the input
    handleChange(event) {
        this.setState({ edits: event.target.value })
    }

    //When the user is editing a subject and submits it by hitting enter, update the Firebase data and disable the input again
    handleSubmit(event) {
        event.preventDefault()
        this.dbSubjects.child('title').set(this.state.edits);
        this.setState({
            disabled: true
        })
    }

    render() {
        return (
            <li className={this.state.disabled ? "subject" : "subject being-edited"}>

                {/* Button to be clicked when the user wishes to delete the subject */}
                <i className="fa fa-times-circle" aria-hidden="true" onClick={() => this.deleteSubject()}></i>

                {/* The input field which contains the subject */}
                <Link onClick={this.state.disabled ? () => { } : e => e.preventDefault()} to={`/classroom/${this.props.classroomID}/subject/${this.props.subjectID}`}>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            maxLength="30"
                            disabled={this.state.disabled}
                            value={this.state.edits}
                            onChange={this.handleChange}
                        />
                    </form>
                </Link>

                {/* Button to be clicked when the user wishes to edit the subject */}
                <i className="fa fa-pencil" aria-hidden="true" onClick={this.editSubject}></i>
            </li>
        );
    }
}

export default Subject;
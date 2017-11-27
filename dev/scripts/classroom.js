import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// This component lives inside the <Dashboard /> component when the user signs in
class Classroom extends React.Component {

    //Allow the component access to its props
    constructor(props) {
        super(props);
        //Get a custom firebase reference using the classroomID prop so we can store any new classrooms in the correct directory
        this.dbClassroom = firebase.database().ref(`classrooms/${this.props.classroomID}`)
        this.state = {
            disabled: true,
            edits: this.props.classroomTitle
        }
        this.deleteClassroom = this.deleteClassroom.bind(this)
        this.editClassroom = this.editClassroom.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //When the user clicks the X icon, the Firebase data is deleted, and the Classroom component is also deleted
    deleteClassroom() {
        this.dbClassroom.remove();
    }

    //When the user clicks the pencil icon, the input is no longer disabled, and the user may make edits to the Classroom as they wish
    editClassroom() {
        this.setState({
            disabled: false
        })
    }

    //Updates the input text as the user types into the input
    handleChange(event) {
        this.setState({ edits: event.target.value })
    }

    //When the user is editing a classroom and submits it by hitting enter, update the Firebase data and disable the input again
    handleSubmit(event) {
        event.preventDefault()
        this.dbClassroom.child('title').set(this.state.edits);
        this.setState({
            disabled: true
        })
    }

    render() {
        return (
            <li className={this.state.disabled ? "classroom" : "classroom being-edited"}>

                {/* Button to be clicked when the user wishes to delete the classroom */}
                <i className="fa fa-times-circle" aria-hidden="true" onClick={this.deleteClassroom}></i>

                {/* The input field which contains the classroom */}
                <Link onClick={this.state.disabled ? () => { } : e => e.preventDefault()} to={`classroom/${this.props.classroomID}`}>
                    <form onSubmit={this.handleSubmit} onClick={this.handleClick}>
                        <input
                            maxLength="50"
                            disabled={this.state.disabled}
                            value={this.state.edits}
                            onChange={this.handleChange}
                            autoFocus={this.state.disabled ? "" : "autofocus"}
                        />
                    </form>
                </Link>

                {/* Button to be clicked when the user wishes to edit the classroom */}
                <i className="fa fa-pencil" aria-hidden="true" onClick={this.editClassroom}></i>
            </li>
        );
    }
}

export default Classroom;
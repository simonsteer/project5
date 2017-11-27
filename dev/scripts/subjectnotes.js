import React from 'react';

import Note from './note.js';
import AddNote from './addnote.js';

// This component lives inside the <App /> component when the user navigates to the contents of a Subject
class SubjectNotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // An array which will hold the subject notes we will get from Firebase
            notes: [],
            // The title of the Subject the notes are for
            title: ''
        }
        // Variables to represent different Firebase references we will need to access to display the notes in the subject as well as the note itself
        this.dbNotes = firebase.database().ref(`classrooms/${this.props.match.params.classroom}/subjects/${this.props.match.params.subject}/notes`)
        this.title = firebase.database().ref(`classrooms/${this.props.match.params.classroom}/subjects/${this.props.match.params.subject}/title`)
        this.insertNote = this.insertNote.bind(this);
    }

    //Push the note to Firebase. This method is to be passed down as a prop to <AddNote />
    insertNote(note) {
        this.dbNotes.push(note)
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <ul>
                    {/*
                    Map over the notes state, and return a note component per item in the this.state.notes array
                    
                    We are also passing <Note /> some props which will be used to generate paths for Link elements (see Note component)
                    */}
                    {this.state.notes.map((item) => {
                        return <Note key={item["key"]} noteID={item["key"]} subjectID={this.props.match.params.subject} classroomID={this.props.match.params.classroom} note={item["data"]} />
                    })}
                </ul>
                <AddNote handleSubmit={this.insertNote} />
            </div>
        )
    }

    //When the page loads, and when dbNotes gets sent data, map over each item in dbNotes and set this.state.notes to an array of objects with all the notes as well as their corresponding Firebase keys, which will be used to generate custom Router paths.
    componentDidMount() {

        this.dbNotes.on('value', (response) => {
            const newState = [];
            const data = response.val();

            for (let key in data) {
                newState.push({
                    data: data[key],
                    key
                })
            }

            this.setState({
                notes: newState
            })
        })

        this.title.on('value', (response) => {
            const newState = response.val();
            const data = response.val();

            this.setState({
                title: newState
            })

        })

    }

}

export default SubjectNotes;
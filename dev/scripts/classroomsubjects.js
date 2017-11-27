import React from 'react';

import Subject from './subject.js';
import AddSubject from './addsubject.js';

// This component lives inside the <App /> component when the user navigates to the contents of a Classroom
class ClassroomSubjects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // An array which will hold the subject objects we will get from Firebase
            subjects: [],
            // The title of the current Classroom
            title: ''
        }
        // Variables to represent different Firebase references we will need to access to display the subjects in the classroom, as well as the classroom title
        this.dbSubjects = firebase.database().ref(`classrooms/${this.props.match.params.classroom}/subjects`)
        this.title = firebase.database().ref(`classrooms/${this.props.match.params.classroom}/title`)
        this.insertClassroom = this.insertClassroom.bind(this);
    }

    //Push the subject to Firebase. This method is to be passed down as a prop to <AddSubject />
    insertClassroom(subject) {
        this.dbSubjects.push({ title: subject, notes: '' })
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <ul>
                    {/*
                    Map over the subjects state, and return a new subject component per item in the this.state.subjects array
                    
                    We are also passing <Subject /> some props which will be used to generate paths for Link elements (see Subject component)
                    */}
                    {this.state.subjects.map((item) => {
                        return <Subject key={item["key"]} subjectID={item["key"]} classroomID={this.props.match.params.classroom} subjectTitle={item["data"]} />
                    })}
                </ul>
                <AddSubject handleSubmit={this.insertClassroom} />
            </div>
        )
    }

    //When the page loads, and when dbSubjects gets sent data, map over each item in dbSubjects and set this.state.subjects to an array of objects containing information about each subject (specifically the title of the subject and the subject's Firebase key, which will be used to generate custom Router paths)
    componentDidMount() {
        this.dbSubjects.on('value', (response) => {

            const newState = [];
            const data = response.val();

            for (let key in data) {
                newState.push({
                    data: data[key].title,
                    key
                })
            }

            this.setState({
                subjects: newState
            })

        })

        // Update the classroom title when the page loads and as Firebase gets sent new data
        this.title.on('value', (response) => {
            const newState = response.val();
            const data = response.val();

            this.setState({
                title: newState
            })

        })

    }
}

export default ClassroomSubjects;
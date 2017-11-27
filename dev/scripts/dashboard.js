import React from 'react';

import AddClassroom from './addclassroom.js'
import Classroom from './classroom.js'

// This component lives inside the <App /> component when the user signs in
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // An array which will hold the classroom objects we will get from Firebase
            classrooms: [],
        }
        // Variable to represent the Firebase references we will need to access to display the list of classrooms in the dashboard
        this.dbClassrooms = firebase.database().ref(`classrooms`)
        this.insertClassroom = this.insertClassroom.bind(this);
    }

    //Push the classroom to Firebase. This method is to be passed down as a prop to <AddClassroom />
    insertClassroom(classroom) {
        this.dbClassrooms.push({ title: classroom, subjects: '' })
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <ul>
                    {/*
                    Map over the classrooms state, and return a new classroom component per item in the this.state.classrooms array
                    
                    We are also passing <Classroom /> some props which will be used to generate paths for Link elements (see Classroom component)
                    */}
                    {this.state.classrooms.map((item) => {
                        return <Classroom key={item["key"]} classroomID={item["key"]} classroomTitle={item["data"]} />
                    })}
                </ul>
                <AddClassroom handleSubmit={this.insertClassroom} />
            </div>
        )
    }

    //When the page loads, and when dbClassrooms gets sent data, map over each item in dbClassrooms and set this.state.classrooms to an array of objects containing information about each classroom (specifically the classroom's Firebase key, which will be used to generate custom Router paths)
    componentDidMount() {
        this.dbClassrooms.on('value', (response) => {
            const newState = [];
            const data = response.val();

            for (let key in data) {
                newState.push({
                    data: data[key].title,
                    key
                })
            }

            this.setState({
                classrooms: newState
            })

        })
    }

}

export default Dashboard;
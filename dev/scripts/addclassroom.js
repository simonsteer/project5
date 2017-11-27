import React from 'react';

// This component will live at the bottom of the Dashboard component
// AddClassroom is an input form, which, when submitted, will add a new classroom to the user's dashboard
class AddClassroom extends React.Component {

    constructor() {
        super();
        this.state = {
            // This state is used to keep track of what is in the input field
            currentClassroom: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Method to handle user changes made in the input field
    handleChange(event) {
        this.setState({ currentClassroom: event.target.value })
    }

    // Method to handle form submission
    // Uses a method via one of its props when it gets rendered
    // Passing it this.state.currentClassroom will send Firebase the subject title upon form submission
    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.currentClassroom);
        this.setState({
            // Reset the input field
            currentClassroom: ''
        })

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    maxLength="30"
                    className="new-classroom"
                    type="text"
                    placeholder="Type your classroom name here and hit enter!"
                    value={this.state.currentClassroom}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}

export default AddClassroom;
import React from 'react';

// This component will live at the bottom of the ClassroomSubjects component
// AddSubject is an input form, which, when submitted, will add a new subject to the current classroom
class AddSubject extends React.Component {

    constructor() {
        super();
        this.state = {
            // This state is used to keep track of what is in the input field
            currentSubject: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Method to handle user changes made in the input field
    handleChange(event) {
        this.setState({ currentSubject: event.target.value })
    }

    // Method to handle form submission
    // Uses a method via one of its props when it gets rendered
    // Passing it this.state.currentSubject will send Firebase the subject title upon form submission
    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.currentSubject);
        this.setState({
            // Reset the input field
            currentSubject: ''
        })

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    maxLength="25"
                    className="new-subject"
                    type="text"
                    placeholder="Type your subject here and hit enter!"
                    value={this.state.currentSubject}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}

export default AddSubject;
import React from 'react';

// This component will live at the bottom of the SubjectNotes component
// AddNote is an input form, which, when submitted, will add a new subject to the current classroom
class AddNote extends React.Component {

    constructor() {
        super();
        this.state = {
            // This state is used to keep track of what is in the input field
            currentNote: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Method to handle user changes made in the input field
    handleChange(event) {
        this.setState({ currentNote: event.target.value })
    }

    // Method to handle form submission
    // Uses a method via one of its props when it gets rendered
    // Passing it this.state.currentNote will send Firebase the note upon form submission
    handleSubmit(event) {

        event.preventDefault();
        this.props.handleSubmit(this.state.currentNote);
        this.setState({
            // Reset the input field
            currentNote: ''
        })

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    maxLength="50"
                    className="new-note"
                    type="text"
                    placeholder="Type your note here and hit enter!"
                    value={this.state.currentNote}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}

export default AddNote;
import React from 'react';

// A component which uses one of its props as an onClick method to send the user back to the previous section
class BackButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <i className="fa fa-arrow-circle-left" aria-hidden="true" onClick={this.props.goBack}></i>
        )
    }
}

export default BackButton;
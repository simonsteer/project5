import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// Simple component which uses a Link to return the user to the Dashboard
class HomeButton extends React.Component {
    render() {
        return (
            <Link to={'/'}><i className="fa fa-home" aria-hidden="true"></i></Link>
        )
    }
}

export default HomeButton;
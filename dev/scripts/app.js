import React from 'react';
import ReactDOM from 'react-dom';

// Import other components which will be rendered inside <App />
import Dashboard from './dashboard.js'
import ClassroomSubjects from './classroomsubjects.js'
import SubjectNotes from './subjectnotes.js'
import BackButton from './backbutton.js'
import HomeButton from './homebutton.js'

// Import necessary packages to perform routing
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC78OKP9ROAoyXI03I_o_6L_FHAo6aE1IE",
  authDomain: "notes-2f738.firebaseapp.com",
  databaseURL: "https://notes-2f738.firebaseio.com",
  projectId: "notes-2f738",
  storageBucket: "",
  messagingSenderId: "430446322697"
};
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      createEmail: '',
      createPassword: '',
      loginEmail: '',
      loginPassword: '',
      loggedIn: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.createUser = this.createUser.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)

  }

  // A method to handle the changes in the input field when the user is creating a new Classroom
  handleChange(event, field) {
    const newState = Object.assign({}, this.state)
    newState[field] = event.target.value;
    this.setState(newState)
  }

  // A method to handle when the user signs out
  signOut() {
    firebase.auth().signOut().then(function (success) {
    }, function (error) {
      console.log(error)
    });
  }

  // A method to handle account creation
  createUser(event) {
    event.preventDefault();
    const email = this.state.createEmail;
    const password = this.state.createPassword;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error.code, error.message))
  }

  // A method to handle when the user signs in
  signIn(event) {
    event.preventDefault();
    const email = this.state.loginEmail;
    const password = this.state.loginPassword;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
      }), (error) => {
        alert('sign in unsuccessful :(');
      }
  }

  // A method that will be passed down as a prop on <BackButton /> to be used for an onClick event
  goBack() {
    window.history.back();
  }

  render() {
    return (

      <div>
      {/* This ternary is used to conditionally render one of two markups, depending on whether the user is logged in or not. If state.loggedIn evals to true, the user will be able to see their Dashboard and begin navigating the site. If loggedIn evals to false, only the login and sign up screen will be visible to the user. */}
      {this.state.loggedIn
        ?
        // Markup for loggedIn: true
        <div>
          <div className='sign-out'>
            <Link to={'/'}><button onClick={this.signOut}>Sign Out</button></Link>
          </div>
          <Route
            exact path="/"
            component={Dashboard}
          />
          <Route
            exact path={`/classroom/:classroom`}
            component={ClassroomSubjects}
          />
          <Route
            exact path={`/classroom/:classroom/subject/:subject`}
            component={SubjectNotes}
          />
          <Route
            path={`/classroom/`}
            render={props => <div><BackButton {...props} goBack={this.goBack} /><HomeButton /></div>}
          />
        </div>
        :
        // Markup for loggedIn: false
        <div>
          <h1 className="jot">jot</h1>
          <div className="create-user">
            <form onSubmit={(event) => this.createUser(event)}>
              <input type="text" placeholder="Please enter your e-mail address" onChange={(event) =>  this.handleChange(event, "createEmail")} />
              <input type="password" placeholder="Please enter your desired password" onChange={(event) =>  this.handleChange(event, "createPassword")} />
              <button>Create Account</button>
            </form>
          </div>
          <div className="sign-in">
            <form onSubmit={(event) => this.signIn(event)}>
              <input type="text" placeholder="Please enter your e-mail address" onChange={(event) =>  this.handleChange(event, "loginEmail")} />
              <input type="password" placeholder="Please enter your desired password" onChange={(event) =>  this.handleChange(event, "loginPassword")} />
              <button>Sign In</button>
            </form>
          </div>
        </div> 
      }
      </div>
    )
  }

  //When the component mounts, set the state of loggedIn, depending on whether the user is logged in or not.
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
        });
      } else {
        this.setState({
          loggedIn: false,
        });
      }
    })
  }

}

ReactDOM.render(
  <Router>
    <App />
  </Router>
  , document.querySelector('#root'));
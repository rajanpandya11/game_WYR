import React from 'react'
import { connect } from 'react-redux'
// import Login from './Login'
// import Home from './Home'
// import NoPageFound from './NoPageFound'
// import UserCard from './UserCard'
// import NewPoll from './NewPoll'
// import Leaderboard from './Leaderboard'
// import { Route, Switch, Redirect } from 'react-router-dom';
import { handleInitialData } from '../actions/shared'

class App extends React.Component {

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     authenticatedUser: ''
  //   }
  // }

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    return (
        <div>
          stater code
        </div>
    );
  }

}

export default connect()(App)
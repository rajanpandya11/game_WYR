import React, { Fragment } from 'react'
import { connect } from 'react-redux'
// import Login from './Login'
import Home from './Home'
// import NoPageFound from './NoPageFound'
// import UserCard from './UserCard'
// import NewPoll from './NewPoll'
// import Leaderboard from './Leaderboard'
// import { Route, Switch, Redirect } from 'react-router-dom';
import { handleInitialData } from '../actions/shared'
import {Header} from 'semantic-ui-react'

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
    const { authedUser } = this.props;
    return (
        <div>
          { authedUser === null 
          ? (<p> something's wrong here</p>)
          : ( <Fragment> <Header as="h1" size='huge' dividing textAlign="center" > Would you rather</Header> <Home/> </Fragment>)
          }
        </div>
    );
  }

}

function mapStateToProps({ dispatch, authedUser }){
  return { authedUser, dispatch }
}

export default connect(mapStateToProps)(App)
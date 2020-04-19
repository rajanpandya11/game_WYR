import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Home from './Home'
// import NoPageFound from './NoPageFound'
// import UserCard from './UserCard'
import NewPoll from './NewPoll'
// import Leaderboard from './Leaderboard'
import { Route, Switch, Redirect } from 'react-router-dom';
import { handleInitialData } from '../actions/shared'
import {Header} from 'semantic-ui-react'
import Vote from './Vote'
import Polls from './Polls'

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

        <switch>
          <Route exact path='/'>
            <div>
              { authedUser === null 
              ? (<p> something's wrong here</p>)
              : ( <Fragment> <Header as="h1" size='huge' dividing textAlign="center" > Would you rather</Header> <Home/> </Fragment>)
              }
            </div>
          </Route>
          <Route path='/vote/:id' component={Vote}></Route>
          <Route path='/polls/:id' component={Polls}></Route>
          <Route path='/new/'>
            <Fragment> <Header as="h1" size='huge' dividing textAlign="center" > Would you rather</Header> <NewPoll />  </Fragment>           
          </Route>
          <Route path='/login'>
            <Fragment> <Login />  </Fragment>           
          </Route>

        </switch>


    );
  }

}

function mapStateToProps({ dispatch, authedUser }){
  return { authedUser, dispatch }
}

export default connect(mapStateToProps)(App)
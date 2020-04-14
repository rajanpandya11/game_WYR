import React, {Fragment} from 'react'
// import { connect } from 'react-redux'
import Login from './Login'
import Home from './Home'
import NoPageFound from './NoPageFound'
import UserCard from './UserCard'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      authenticatedUser: ''
    }
  }


  render(){
    return (
        <div>
            <Fragment>
              <Switch>
                <Route exact path="/" > <Home /> </Route> 
                <Route path="/login" > <Login /> </Route> 
                <Route path="/polls/bad_id" component={NoPageFound} />
                <Route path="/polls/:question_id" component={UserCard} />
                <Route path="/add" component={NewPoll} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route component={NoPageFound} />
              </Switch>
            </Fragment>
            { this.state.authenticatedUser.length === 0 && ( <Redirect to="/login"> <Login /> </Redirect>) }

        </div>
    );
  }

}

// function mapStateToProps () {
//   return {};
// }

export default App
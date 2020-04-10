import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Login from './login'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      authenticatedUser: ''
    }
  }


  render(){
    return (
      <div className="App">
        <Nav />
        { this.state.authenticatedUser.length === 0 && <Login /> }
      </div>
    );
  }

}

function mapStateToProps () {
  return {};
}

export default connect(mapStateToProps)(App)
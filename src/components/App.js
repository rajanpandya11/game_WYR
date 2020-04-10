import React from 'react';
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
        <header className="App-header">
          This is header
        </header>
        { this.state.authenticatedUser.length === 0 && <Login /> }
      </div>
    );
  }

}

export default App;

import React, { Fragment } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Home from "./Home";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  Link,
  BrowserRouter as Router
} from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { Header } from "semantic-ui-react";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authedUser === null ? (
            <Redirect to="/login" />
          ) : (
            <Fragment>
              <Header as="h1" size="huge" dividing textAlign="center">
                <Link to="/"> Would you rather</Link>
              </Header>
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Home} />
              </Switch>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.authedUser ? (
          <Home />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedRoute() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

function mapStateToProps({ dispatch, authedUser }) {
  return { authedUser, dispatch };
}

export default connect(mapStateToProps)(App);

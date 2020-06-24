import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
// import NoPageFound from './NoPageFound'
// import UserCard from './UserCard'
import NewPoll from "./NewPoll";
// import Leaderboard from './Leaderboard'
import {
  Link,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { Header } from "semantic-ui-react";
import Vote from "./Vote";
import Polls from "./Polls";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/">
              <div>
                {/* {authedUser === null ? (
                  <p> Loading </p>
                ) : ( */}
                {
                  <Fragment>
                    {" "}
                    <Header as="h1" size="huge" dividing textAlign="center">
                      {" "}
                      <Link to="/"> Would you rather</Link>{" "}
                    </Header>{" "}
                    <Home />{" "}
                  </Fragment>
                }
              </div>
            </Route>
            <Route
              exact
              path={["/vote/", "/vote", "/polls/", "/polls"]}
              render={history => <Redirect to="/" />}
            />
            <Route path="/vote/:id" component={Vote} />
            <Route path="/polls/:id" component={Polls} />
            <Route path="/new/">
              <Fragment>
                {" "}
                <Header as="h1" size="huge" dividing textAlign="center">
                  {" "}
                  Would you rather
                </Header>{" "}
                <NewPoll />{" "}
              </Fragment>
            </Route>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/login">
              <LoginPage />
              {/* <Fragment>
                {" "}
                <Login />{" "}
              </Fragment> */}
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
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
        fakeAuth.isAuthenticated ? (
          children
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

function ProtectedPage() {
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

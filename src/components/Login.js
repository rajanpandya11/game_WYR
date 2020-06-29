import React from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import {
  Dropdown,
  Button,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";


class Login extends React.Component {

  state = {
    id:''
  };

  render() {

    let { authedUser, users } = this.state;

    const profileOptions = [
      {
        key: "sarahedo",
        text: "Sarah Edo",
        value: "sarahedo"
      },
      {
        key: "tylermcginnis",
        text: "Tyler McGinnis",
        value: "tylermcginnis"
      },
      {
        key: "johndoe",
        text: "John Doe",
        value: "johndoe"
      }
    ];

    let loginHandle = () => {
      let id = this.state.id;
      if(id !== ''){
        this.props.dispatch(setAuthedUser(id));
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let history = useHistory();
        history.push("/");
      }
    };

    let handleChange = (e, { name, value }) => this.setState({ id: value });

    // if(authedUser !== '' || authedUser !== null || authedUser !== undefined )
    //   {return    <Redirect to="/" />;}

    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="black" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Dropdown
              placeholder="Select Profile"
              fluid
              search
              selection
              options={profileOptions}
              onChange={handleChange}
            />
            <Segment stacked>
              <Button color="black" fluid size="large" onClick={loginHandle}>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }


}


function mapStateToProps({ users, questions, authedUser }) {
  return { users, questions, authedUser };
}

export default connect(mapStateToProps)(Login);


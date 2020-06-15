import React from "react";
import { connect } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";
import { handleSaveQuestion } from "../actions/questions";

class NewPoll extends React.Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    status: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    let author = this.props.authedUser;
    let { optionOneText, optionTwoText } = this.state;

    let theObject = {
      author,
      optionOneText,
      optionTwoText
    };
    this.props.dispatch(handleSaveQuestion(theObject));
    this.setState({ optionOneText: "", optionTwoText: "", status: true });
  };

  render() {
    let { optionOneText, optionTwoText, status } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} success={status}>
        <Form.Group widths={3}>
          <Form.Field>
            <label>would you rather?</label>
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Option one"
              name="optionOneText"
              value={optionOneText}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Option two"
              name="optionTwoText"
              value={optionTwoText}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Message
          success
          header="Saved!"
          content="Good job submitting a question."
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  let theObject = { authedUser, users, questions };
  return theObject;
}

export default connect(mapStateToProps)(NewPoll);

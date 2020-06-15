import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { handleSaveQuestion } from "../actions/questions";

class NewPoll extends React.Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
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
    this.setState({ optionOneText: "", optionTwoText: "" });
  };

  render() {
    let { optionOneText, optionTwoText } = this.state;

    return (
      <Form>
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
        <Button type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  let theObject = { authedUser, users, questions };
  return theObject;
}

export default connect(mapStateToProps)(NewPoll);

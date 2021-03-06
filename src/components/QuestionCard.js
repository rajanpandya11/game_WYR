import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Form, Radio, Label, Button } from "semantic-ui-react";

class QuestionCard extends React.Component {
  state = {
    theCard: "Question",
    theValue: ""
  };

  handleClick = (e, answered) => {
    if (e.target.name === "Polls" || e.target.name === "Vote") {
      this.setState({ theCard: "Question" });
    }
    if (e.target.name === "Question") {
      answered
        ? this.setState({ theCard: "Polls" })
        : this.setState({ theCard: "Vote" });
    }
  };

  handleChange = (e, comp) => {
    console.log("changing the radio state now.");
    this.setState({ theValue: comp.value });
    console.log("done changing the radio state.");
  };

  isMyVote = theValue => {
    let { users, userId, question_id } = this.props;
    if (
      users[userId].answers[question_id] !== undefined &&
      users[userId].answers[question_id] === theValue
    ) {
      return true;
    }

    return false;
  };

  handleVote = (e, comp) => {
    console.group("voting");
    console.log("voting for the question now.");
    let { userId, question_id, theQuestion } = this.props;
    let answerId =
      this.state.theValue === theQuestion.optionOne.text
        ? "optionOne"
        : "optionTwo";
    let theObject = {
      authedUser: userId,
      qid: question_id,
      answer: answerId
    };

    this.props.voteHandle(theObject);
    console.log("done voting for the question.");
    console.groupEnd();
  };

  render() {
    let {
      authedUser,
      theQuestion,
      totalPolls,
      optionOnePoll,
      optionTwoPoll,
      users,
      questions,
      question_id,
      answered,
      userId,
      voteHandle
    } = this.props;

    let theCard = this.state.theCard;

    if (theCard === "Vote") {
      let val1 = theQuestion.optionOne.text;
      let val2 = theQuestion.optionTwo.text;
      return (
        <div>
          <Card style={{ width: "100%" }}>
            <Card.Content>
              <Form>
                <Form.Field>
                  Vote for: <b>{this.state.theValue}</b>
                </Form.Field>
                <Form.Field>
                  <Radio
                    label={val1}
                    name="radioGroup"
                    value={val1}
                    checked={this.state.theValue === val1}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label={val2}
                    name="radioGroup"
                    value={val2}
                    checked={this.state.theValue === val2}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </Card.Content>
            <Card.Content extra>
              <div className="ui single">
                <Button
                  name="Vote"
                  // as="button"
                  className="ui sm button grey"
                  onClick={e => this.handleClick(e, answered)}
                >
                  <i className="left arrow icon" /> Go Back
                </Button>
                {this.state.theValue !== "" && (
                  <Button
                    name="Vote"
                    // as="sm button"
                    className="ui sm button blue"
                    onClick={this.handleVote}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      );
    }
    if (theCard === "Polls") {
      // return authedUser === null || users[authedUser] === undefined ? (
      //   <p> Loading </p>
      // ) :
      return (
        <Card style={{ width: "100%" }}>
          <Card.Content>
            <Card.Header>
              {" "}
              {theQuestion.optionOne.text} OR {theQuestion.optionTwo.text}{" "}
            </Card.Header>
            <Card.Meta> By {theQuestion.author}</Card.Meta>
            <Card.Description>
              {theQuestion.optionOne.text} -{" "}
              {theQuestion.optionOne.votes.length} votes{" "}
              {theQuestion.optionOne.votes.includes(userId) && (
                <Label className="ui teal small tag label">You voted</Label>
              )}
              <br />
              {theQuestion.optionTwo.text} -{" "}
              {theQuestion.optionTwo.votes.length} votes{" "}
              {theQuestion.optionTwo.votes.includes(userId) && (
                <Label className="ui teal small tag label">You voted</Label>
              )}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              // as="button"
              name="Polls"
              className="ui button grey"
              onClick={e => this.handleClick(e, answered)}
            >
              <i className="left arrow icon" /> Go Back
            </Button>
          </Card.Content>
        </Card>
      );
    }
    if (theCard === "Question") {
      return (
        <Card>
          <Card.Content>
            <Card.Header>Would you rather? </Card.Header>
            <Card.Meta> By {theQuestion.author}</Card.Meta>
            <Card.Description>
              {theQuestion.optionOne.text} <br /> or <br />{" "}
              {theQuestion.optionTwo.text}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {answered ? (
              <div className="ui single">
                <Button
                  name="Question"
                  // as="button"
                  className="ui button blue"
                  onClick={e => this.handleClick(e, answered)}
                >
                  {" "}
                  View The Poll
                </Button>
              </div>
            ) : (
              <div className="ui single">
                <Button
                  name="Question"
                  // as="button"
                  className="ui button green"
                  onClick={e => this.handleClick(e, answered)}
                >
                  {" "}
                  Vote
                </Button>
              </div>
            )}
          </Card.Content>
        </Card>
      );
    }
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  let theQuestion = questions[props.question_id];
  let totalPolls =
    theQuestion.optionOne.votes.length + theQuestion.optionTwo.votes.length;
  let optionOnePoll = Math.floor(
    (theQuestion.optionOne.votes.length / totalPolls) * 100
  );
  let optionTwoPoll = Math.floor(
    (theQuestion.optionTwo.votes.length / totalPolls) * 100
  );

  let theObject = {
    authedUser,
    theQuestion,
    totalPolls,
    optionOnePoll,
    optionTwoPoll,
    questions: Object.values(questions),
    users
  };

  return theObject;
}

export default connect(mapStateToProps)(QuestionCard);

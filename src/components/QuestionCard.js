import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Form, Radio } from "semantic-ui-react";

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

  handleVote = (e, comp) => {
    console.group("voting");
    console.log("voting for the question now.");
    let { userId, question_id, theQuestion } = this.props;
    let answerId =
      this.state.theValue === theQuestion.optionOne.text
        ? "optionOne"
        : "optionTwo";
    let theObject = {
      theUser: userId,
      theQuestion: question_id,
      theAnswer: answerId
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
          <Card>
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
                <Link
                  name="Vote"
                  as="sm button"
                  className="ui button grey"
                  onClick={e => this.handleClick(e, answered)}
                >
                  <i className="left arrow icon" /> Go Back
                </Link>
                {this.state.theValue !== "" && (
                  <Link
                    name="Vote"
                    as="sm button"
                    className="ui button blue"
                    onClick={this.handleVote}
                  >
                    Submit
                  </Link>
                )}
              </div>
            </Card.Content>
          </Card>
        </div>
      );
    }
    if (theCard === "Polls") {
      return authedUser === null || users[authedUser] === undefined ? (
        <p> Loading </p>
      ) : (
        <Card>
          <Card.Content>
            <Card.Header>
              {" "}
              {theQuestion.optionOne.text} OR {theQuestion.optionTwo.text}{" "}
            </Card.Header>
            <Card.Meta> By {theQuestion.author}</Card.Meta>
            <Card.Description>
              {theQuestion.optionOne.text} -{" "}
              {theQuestion.optionOne.votes.length} votes
              <br />
              {theQuestion.optionTwo.text} -{" "}
              {theQuestion.optionTwo.votes.length} votes
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link
              as="button"
              name="Polls"
              className="ui button grey"
              onClick={e => this.handleClick(e, answered)}
            >
              <i className="left arrow icon" /> Go Back
            </Link>
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
                <Link
                  name="Question"
                  as="button"
                  className="ui button blue"
                  onClick={e => this.handleClick(e, answered)}
                >
                  {" "}
                  View The Poll
                </Link>
              </div>
            ) : (
              <div className="ui single">
                <Link
                  name="Question"
                  as="button"
                  className="ui button green"
                  onClick={e => this.handleClick(e, answered)}
                >
                  {" "}
                  Vote
                </Link>
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

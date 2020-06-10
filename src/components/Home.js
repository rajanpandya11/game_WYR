import React from "react";
import { connect } from "react-redux";
import { Tab, Container } from "semantic-ui-react";
import QuestionCard from "./QuestionCard";
import { handleAnswersQuestions } from "../actions/questions";
import NewPoll from "./NewPoll";

class Home extends React.Component {
  render() {
    const color = "teal";
    let { questionsForUser, authedUser } = this.props;

    let voteHandle = theObject => {
      this.props.dispatch(handleAnswersQuestions(theObject));
    };

    const panes = props => {
      const { questionsForUser, authedUser } = props;

      return [
        {
          menuItem: "Answered",
          render: () => (
            <Tab.Pane>
              {questionsForUser.answered.map(q => (
                <QuestionCard
                  key={q.id}
                  question_id={q.id}
                  answered={true}
                  userId={authedUser}
                  voteHandle={voteHandle}
                />
              ))}
            </Tab.Pane>
          )
        },
        {
          menuItem: "Submit Vote",
          render: () => (
            <Tab.Pane>
              {questionsForUser.unAnswered.map(q => (
                <QuestionCard
                  key={q.id}
                  question_id={q.id}
                  answered={false}
                  userId={authedUser}
                  voteHandle={voteHandle}
                />
              ))}
            </Tab.Pane>
          )
        },

        {
          menuItem: "Submit Question",
          render: () => <NewPoll />
        },

        {
          menuItem: "Leaderboard",
          render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
        }
      ];
    };

    console.log(this.props);
    return (
      <Container>
        <Tab
          menu={{ color, fluid: true, vertical: true, tabular: true }}
          panes={panes({ questionsForUser, authedUser })}
        />
      </Container>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const answeredIds = Object.keys(users[authedUser].answers);
  const unAnswered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const answered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questionsForUser: {
      answered,
      unAnswered
    },
    authedUser
  };
}

export default connect(mapStateToProps)(Home);

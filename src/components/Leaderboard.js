import React from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

class Leaderboard extends React.Component {
  render() {
    let { leaderboardData } = this.props;
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell># of Questions</Table.HeaderCell>
            <Table.HeaderCell># of Answers</Table.HeaderCell>
            <Table.HeaderCell>Total points</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {leaderboardData.map((data, index) => (
            <Table.Row>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{data.name}</Table.Cell>
              <Table.Cell>{data.questionCount}</Table.Cell>
              <Table.Cell>{data.answerCount}</Table.Cell>
              <Table.Cell>{data.total}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

function mapStateToProps({ users }) {
  let leaderboardData = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse();
  // .slice(0, 3);
  return {
    leaderboardData
  };
}

export default connect(mapStateToProps)(Leaderboard);

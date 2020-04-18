
import React from "react";
import { connect } from 'react-redux'
import Nav from './Nav'
import {Tab, Container} from 'semantic-ui-react'
import QuestionCard from './QuestionCard';

class Home extends React.Component{
    render(){
        const color = 'teal';
        let {questionsForUser, authedUser } = this.props;
        console.log(this.props);
        return  <Container ><Tab menu={{color, fluid: true, vertical: true, tabular: true }} panes={panes({questionsForUser, authedUser})} /></Container>
    }
} 



const panes = props => {
    const {questionsForUser, authedUser} = props;

    return [
        { menuItem: 'Answered', render: () => <Tab.Pane>
            {questionsForUser.answered.map(q => ( 
                <QuestionCard 
                    key={q.id}
                    question_id={q.id}
                    answered={true}    
                    userId={authedUser}
                     /> 
            ))}
            </Tab.Pane> },
        { menuItem: 'New Questions', render: () =>  <Tab.Pane>
           { questionsForUser.unAnswered.map(q => ( 
            <QuestionCard 
                key={q.id}
                question_id={q.id}
                answered={false}    
                userId={authedUser}
                /> 
        )) }
        </Tab.Pane> },
        { menuItem: 'Leaderboard', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]
} 

function mapStateToProps({ users, questions, authedUser }){
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
    }
}

export default connect(mapStateToProps)(Home)
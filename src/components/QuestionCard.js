import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button  } from 'semantic-ui-react'

class QuestionCard extends React.Component{

    state = {
        theCard: 'Question'
    }

    handleClick = (e) =>{
        if(e.target.name === 'Polls')
            this.setState({theCard: 'Question'})
        if(e.target.name === 'Question')
            this.setState({theCard: 'Polls'})
    }

    render(){
        let {authedUser, theQuestion, chosenOptionKey, chosenOptionValue, totalPolls, optionOnePoll, optionTwoPoll, users, questions, question_id, answered , userId} = this.props;

        // let theQuestion = questions.filter(q => q.id === question_id)[0];
        // let theKeys = Object.keys(theQuestion);
        let theCard = this.state.theCard;

        if(theCard === 'Polls'){
            return (
                authedUser === null || users[authedUser] === undefined
                ? (<p> Loading </p>)
                : (
                    <Card>
                        <Card.Content>
                            <Card.Header> {theQuestion.optionOne.text} OR {theQuestion.optionTwo.text} </Card.Header>
                            <Card.Meta> By {theQuestion.author}</Card.Meta>
                            <Card.Description>
                                {theQuestion.optionOne.text} - {theQuestion.optionOne.votes.length} votes 
                                <br />
                                {theQuestion.optionTwo.text} - {theQuestion.optionTwo.votes.length} votes 
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Link as='button' name='Polls' className='ui button grey' onClick={this.handleClick} ><i className="left arrow icon"></i> Go Back</Link>     
                        </Card.Content> 
                    </Card>
                )
            )
        }
        if(theCard === 'Question'){
            return(  
                <Card>
                    <Card.Content>
                        <Card.Header>Would you rather? </Card.Header>
                        <Card.Meta> By {theQuestion.author}</Card.Meta>
                        <Card.Description>
                            {theQuestion.optionOne.text} <br /> or <br /> {theQuestion.optionTwo.text}
                       </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        { answered 
                        ? (<div className='ui single'>
                            <Link name='Question' as="button" className='ui button blue' onClick={this.handleClick}> View The Poll</Link>
                           </div>
                        )
                        : (<div className='ui single'>
                            <Link name='Question' to={'/vote/' + theQuestion.id} as="button" className='ui button green'> Vote</Link>
                            </div>
                        )
                    }
                    </Card.Content>
                </Card>
                )
        }

    }
}

function mapStateToProps({authedUser, users, questions}, props){
    let theQuestion = questions[props.question_id];
    let chosenOptionKey = users[authedUser].answers[theQuestion.id];
    let chosenOptionValue = theQuestion[chosenOptionKey].text;
    let totalPolls = theQuestion.optionOne.votes.length +  theQuestion.optionTwo.votes.length;
    let optionOnePoll =  Math.floor(theQuestion.optionOne.votes.length / totalPolls  * 100);
    let optionTwoPoll =  Math.floor(theQuestion.optionTwo.votes.length / totalPolls  * 100);

    return {
        authedUser,
        theQuestion,
        chosenOptionKey,
        chosenOptionValue,
        totalPolls,
        optionOnePoll,
        optionTwoPoll,
        questions: Object.values(questions),
        users
    }
}

export default connect(mapStateToProps)(QuestionCard)
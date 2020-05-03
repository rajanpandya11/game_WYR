import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button  } from 'semantic-ui-react'

class QuestionCard extends React.Component{

    state = {
        theCard: 'Question'
    }

    handleClick = (e, answered) =>{
        if(e.target.name === 'Polls' || e.target.name === 'Vote'){
            this.setState({theCard: 'Question'}) 
        }
        if(e.target.name === 'Question'){
            answered ? this.setState({theCard: 'Polls'}) : this.setState({theCard: 'Vote'})
        }
    }

    render(){
        let {authedUser, theQuestion,  totalPolls, optionOnePoll, optionTwoPoll, users, questions, question_id, answered , userId} = this.props;

        let theCard = this.state.theCard;

        if(theCard === 'Vote'){
            return(
                <div >This is vote for id: {theQuestion.id}
                    
                    <Link as='button' name='Vote' className='ui button grey'  onClick={(e) => this.handleClick(e, answered)} ><i className="left arrow icon"></i> Go Back</Link>     
                </div>
            )
        }
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
                            <Link as='button' name='Polls' className='ui button grey' onClick={(e) => this.handleClick(e, answered)} ><i className="left arrow icon"></i> Go Back</Link>     
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
                            <Link name='Question' as="button" className='ui button blue' onClick={(e) => this.handleClick(e, answered)}> View The Poll</Link>
                           </div>
                        )
                        : (<div className='ui single'>
                            <Link name='Question' as="button" className='ui button green' onClick={(e) => this.handleClick(e, answered)}> Vote</Link>
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
    
    // console.log('authedUser: ',authedUser, 'users: ', users, 'questions: ', questions) 
    // console.log('props: ', props) 
    let theQuestion = questions[props.question_id];
    let totalPolls = theQuestion.optionOne.votes.length +  theQuestion.optionTwo.votes.length;
    let optionOnePoll =  Math.floor(theQuestion.optionOne.votes.length / totalPolls  * 100);
    let optionTwoPoll =  Math.floor(theQuestion.optionTwo.votes.length / totalPolls  * 100);

    let theObject = {
        authedUser,
        theQuestion,
        totalPolls,
        optionOnePoll,
        optionTwoPoll,
        questions: Object.values(questions),
        users
    }
    console.log('theObject: ', theObject);

    return theObject
}

export default connect(mapStateToProps)(QuestionCard)
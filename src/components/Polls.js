import React,{ Fragment } from "react";
import {Header, Card} from 'semantic-ui-react'
import {connect} from "react-redux";
import { Link } from 'react-router-dom'

class Polls extends React.Component{
    render(){
        let {authedUser, theQuestion, chosenOptionKey, chosenOptionValue, totalPolls, optionOnePoll, optionTwoPoll, users} = this.props;
        console.log(this.props);
        return(
            <div>
            { authedUser === null || users[authedUser] === undefined
            ? (<p> Loading </p>)
            : (

                <Fragment> 
                <Header as="h1" size='huge' dividing textAlign="center" > <Link to="/"> Would you rather</Link> </Header> 
                  <Link to="/"><i className="left arrow icon"></i></Link>     
                <Card>
                    <Card.Content>
                        <Card.Header> {theQuestion.optionOne.text} OR {theQuestion.optionTwo.text} </Card.Header>
                        <Card.Meta> By {theQuestion.author}</Card.Meta>
                        </Card.Content>
                    <Card.Content extra>
                        {theQuestion.optionOne.text} - {theQuestion.optionOne.votes.length} votes 
                        <br />
                        {theQuestion.optionTwo.text} - {theQuestion.optionTwo.votes.length} votes 
                    </Card.Content> 
                </Card>
    
             </Fragment>

            )
            }
          </div>
);
    }
}

function mapStateToProps({authedUser, users, questions}, props){
    let theQuestion = questions[props.match.params.id];
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
        users
    }
}

export default connect(mapStateToProps)(Polls);
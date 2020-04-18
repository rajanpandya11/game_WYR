import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'semantic-ui-react'

class QuestionCard extends React.Component{
    render(){
        let { questions, question_id, answered , userId } = this.props;
        let theQuestion = questions.filter(q => q.id === question_id)[0];
        let theKeys = Object.keys(theQuestion);
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
                        <Button basic color='blue'>View the Poll</Button>
                       </div>
                    )
                    : (<div className='ui single'>
                            <Button basic color='green'>Vote</Button>
                        </div>
                    )
                }
                </Card.Content>
            </Card>
            // <div > {theKeys.filter(k => ['author', 'id'].includes(k)).map(k => <div> <p>{k} : {theQuestion[k]} </p>  </div>)} </div>
            // questions.filter(q=> q.id === question_id).map(q => <div> <p>Question card my props { q.id }  </p> { answered === true ? <p> it is answered </p> : <p> it is not answered </p> } <p>userId : {userId }</p></div> ) 
            )
    }
}

function mapStateToProps({questions}){
    return {
        questions: Object.values(questions)
    }
}

export default connect(mapStateToProps)(QuestionCard)
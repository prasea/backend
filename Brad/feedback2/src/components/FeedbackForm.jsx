import React, {useState} from 'react'
import Card from './shared/Card'
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
function FeedbackForm({feedbackAdd}) {
  const [text, setText] = useState('');  
  const [rating, setRating] = useState(10);  
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [validationMessage, setValidationMessage] = useState('')
const handleTextChange = (e) =>{
  setText(e.target.value)
  if(text === ''){
    setBtnDisabled(true);
    setValidationMessage(null)
  } else if(text !== '' && text.trim().length <=10){
    setBtnDisabled(true);
    setValidationMessage("Review text too short");
  } else {
    setBtnDisabled(false);
    setValidationMessage(null);
  }
} 
const handleSubmit = (e) => {
  if(text.trim().length > 10){
    const newFeedback = {
      text, 
      rating
    }
    feedbackAdd(newFeedback);
  }
  e.preventDefault();
}
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        {/* TODO : Rating select component */}
        <RatingSelect select={rating => setRating(rating)}/>
        <div className="input-group">
          <input onChange={handleTextChange} type="text" placeholder='Write a review'/>
          <Button type="submit" version="primary" isDisabled={btnDisabled}>Send</Button>
        </div>
        {validationMessage && <div className="message">{validationMessage}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
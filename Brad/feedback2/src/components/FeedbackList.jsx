import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext';
import PropTypes from 'prop-types'
import FeedbackItem from './FeedbackItem'
function FeedbackList() {
  const {feedback} = useContext(FeedbackContext);
  if(!feedback || feedback.length === 0)
    return "No Feedback Yet !";
  return feedback.map(item => (
  <FeedbackItem key={item.id} item={item}/>
  ))
}
FeedbackList.propTypes = {
  feedback : PropTypes.arrayOf(
    PropTypes.shape({
      // id : PropTypes.string.isRequired,
      text : PropTypes.string.isRequired, 
      rating : PropTypes.number.isRequired
    })
  )
}
export default FeedbackList
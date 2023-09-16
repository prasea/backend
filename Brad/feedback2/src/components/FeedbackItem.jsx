import React, {useState, useContext} from 'react'
import {FaTimes, FaEdit} from 'react-icons/fa'
import Card from './shared/Card'
import FeedbackContext from '../context/FeedbackContext'
function FeedbackItem({item :{id, rating, text}, handleDelete}) {
  
  const {feedbackDelete, feedbackEdit} = useContext(FeedbackContext);
  return (
    <Card reverse={true}>
      <div className="num-display">{rating}</div>
      <button className="close">
        <FaTimes onClick={() => feedbackDelete(id)} color="purple" />
      </button>
      <button onClick={() => feedbackEdit(id, rating, text)} className='edit'>
		    <FaEdit color='purple' /> 
	    </button>
      <div className="text-display">{text}</div>      
    </Card>
  )
}

export default FeedbackItem
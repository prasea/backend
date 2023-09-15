import React, {useState, useContext} from 'react'
import {FaTimes} from 'react-icons/fa'
import Card from './shared/Card'
import FeedbackContext from '../context/FeedbackContext'
function FeedbackItem({item :{id, rating, text}, handleDelete}) {
  const {feedbackDelete} = useContext(FeedbackContext);
  return (
    <Card reverse={true}>
      <div className="num-display">{rating}</div>
      <button className="close">
        <FaTimes onClick={() => feedbackDelete(id)} color="purple" />
      </button>
      <div className="text-display">{text}</div>      
    </Card>
  )
}

export default FeedbackItem
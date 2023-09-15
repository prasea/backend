import React, {useState} from 'react'
import {FaTimes} from 'react-icons/fa'
import Card from './shared/Card'
function FeedbackItem({item :{id, rating, text}, handleDelete}) {
  return (
    <Card reverse={true}>
      <div className="num-display">{rating}</div>
      <button className="close">
        <FaTimes onClick={() => handleDelete(id)} color="purple" />
      </button>
      <div className="text-display">{text}</div>      
    </Card>
  )
}

export default FeedbackItem
import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
const FeedbackContext = createContext();
export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 9,
      text: "This is context state review",
    }
  ])
  const feedbackDelete = (id) => {
    if (window.confirm('Are you sure?'))
      setFeedback(feedback.filter(item => item.id !== id));
  }
  const feedbackAdd = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  }
  return (
    <FeedbackContext.Provider value={{ feedback, feedbackDelete, feedbackAdd }}>
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext;
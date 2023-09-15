import React, { useState } from 'react'
import Header from './components/Header'
import FeedbackItem from './components/FeedbackItem'
import FeedbackData from './data/FeedbackData'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import { v4 as uuidv4 } from 'uuid'
import AboutPage from '../src/pages/AboutPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AboutIconLink from '../src/components/shared/AboutIconLink'
import { FeedbackProvider } from './context/FeedbackContext'
function App() {
  const [feedback, setFeedback] = useState(FeedbackData);
  const feedbackDelete = (id) => {
    if (window.confirm('Are you sure?'))
      setFeedback(feedback.filter(item => item.id !== id));
  }
  const feedbackAdd = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  }
  return (
    <Router>
      <Header />
      <div className="container">
        <FeedbackProvider>
          <AboutIconLink />
          <Routes>
            <Route path='/about' element={<AboutPage />} />
            <Route path='/' element={
              <>
                <FeedbackForm feedbackAdd={feedbackAdd} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} handleDelete={feedbackDelete} />
              </>
            }>
            </Route>
          </Routes>
        </FeedbackProvider>

      </div>
    </Router>
  )
}

export default App
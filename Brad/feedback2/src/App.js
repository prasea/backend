import React, { useState } from 'react'
import Header from './components/Header'
import FeedbackItem from './components/FeedbackItem'
import FeedbackData from './data/FeedbackData'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from '../src/pages/AboutPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AboutIconLink from '../src/components/shared/AboutIconLink'
import { FeedbackProvider } from './context/FeedbackContext'
function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

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
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
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
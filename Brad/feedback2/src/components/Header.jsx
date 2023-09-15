import React from 'react'
import PropTypes from 'prop-types'
function Header({headerText, headerColor, headerBgColor}) {
  const headerStyles = {
    color : headerColor,
    backgroundColor : headerBgColor
  }
  return (
    <header style={headerStyles}>
      <div className="container">
        <h2>{headerText}</h2>
      </div>
    </header>
  )
}
Header.defaultProps = {
  headerText : "Feedback UI", 
  headerColor : "#ff6a95", 
  headerBgColor : 'rgba(0,0,0,0.4)'
}
Header.propTypes = {
  headerText : PropTypes.string
}
export default Header
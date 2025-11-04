import React from 'react'

const Button = ({title, classes}) => {
  return (
      <button className={`${classes}`}>{ title}</button>
  )
}

export default Button
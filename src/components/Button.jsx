import React from 'react'

const Button = ({color,text,onClick}) => { //destructure
  return (
    <button 
    onClick={onClick}
    style={{backgroundColor: color}}
    className='btn'>
        {text}
    </button>
  )
}

export default Button
import React from 'react'

const EvaluationResult = (props) => {
  return (
    <div className='h-screen w-screen flex justify-center items-start' >
      {props.result}
    </div>
  )
}

export default EvaluationResult

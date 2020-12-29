import React from 'react'
import spinner from './img/spinner3.gif'

const Spinner = () => {
  return (
    <div className='Spinner'>
      <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block'}}
      alt='Loading'
    />
    </div>
  )
}

export default Spinner
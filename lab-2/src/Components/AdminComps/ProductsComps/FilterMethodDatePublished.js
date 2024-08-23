import React from 'react'
import '../../css/Products.css';

function FilterMethodDatePublished() {
  return (
    <div className='fmidMain'>
      <h2>Search date of publish</h2>
      <div className='fmDate'>
        <div className='fmLeft'>
          <p>From</p>
          <input type='date'></input>
        </div>
        <div className='fmRight'>
          <p>To</p>
          <input type='date'></input>
        </div>
      </div>
      <button className='fsButtons'>Search</button>
    </div>
  )
}

export default FilterMethodDatePublished

import React from 'react'
import { Link } from 'react-router-dom';
function menuscreen() {
  return (
    <div className='col-9 col-md-9 col-xs-9 mx-auto mt-3 pt-3'>
      <Link to="/homescreen">
        <button className='btn5 mt-2 p-4'>LISTE INVENTAIRE</button>
      </Link>
      <Link to="/cart">
        <button className='btn5 mt-2 p-4'>CREATION INVENTAIRE</button>
      </Link>
      <Link to="/validinv">
        <button className='btn5 mt-2 p-4'>VALIDATION INVENTAIRE</button>
      </Link>
    </div>
  )
}

export default menuscreen

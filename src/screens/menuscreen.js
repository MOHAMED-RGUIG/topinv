import React from 'react'

function menuscreen() {
  return (
    <div className='col-9 col-md-9 col-xs-9 mx-auto mt-3 pt-3' >  
        <a   href="/homescreen">        <button className='btn5 mt-2 p-4'  >LISTE INVENTAIRE</button>

            </a>   
            <a  href="/cart">    
         <button className='btn5 mt-2 p-4'  href="/cart" >CREATION INVENTAIRE</button>
         </a>
         <a  href="/validinv">    
         <button className='btn5 mt-2 p-4'  href="/cart" >VALIDATION INVENTAIRE</button>
         </a>
         </div>
  )
}

export default menuscreen
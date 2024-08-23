import React from 'react'
import AdminIcons from '../AdminIcons'
import '../../css/Products.css';

function GeneralProductInfo() {
  return (
    <div className='generalInfo'>
      <div className='giHolder'>
        <button className='giRefresh'>
            <p>Refresh Product List</p>
            <AdminIcons.ArrowClockwiseIcon />
        </button>  
        <div className='giTotalProducts'>
            <p>Total Products Listed:</p>
            <div>
              <AdminIcons.ProductIcon />
              <p>20</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralProductInfo

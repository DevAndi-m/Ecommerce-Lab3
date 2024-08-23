import React from 'react'
import PurchasedFilterSection from './PurchasedProductComps/PurchasedFilterSection';
import PurchasedProductPlacement from './PurchasedProductComps/PurchasedProductPlacement';

function PurchasedProductsDashboard() {
  return (
    <div className='pHolder'>
      <div className='header'>
          <div className='title'>
            <h1>Purchased Products Dashboard</h1>
          </div>
      </div>
      <div className='mainProducts'>
        <PurchasedProductPlacement />
        <PurchasedFilterSection />
      </div>
    </div>
  )
}

export default PurchasedProductsDashboard

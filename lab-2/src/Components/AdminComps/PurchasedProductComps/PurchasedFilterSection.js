import React, { useState } from 'react';
import '../../css/Products.css';
import FilterMethodIDPurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodIDPurchased';
import FilterMethodNamePurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodNamePurchased';
import FilterMethodUserPublishedPurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodUserPublishedPurchased';
import FilterMethodBuyerPurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodBuyerPurchased';
import FilterMethodCategoryPurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodCategoryPurchased';
import FilterMethodDatePurchased from '../PurchasedProductComps/PurchasedFilters/FilterMethodDatePurchased';

import GeneralProductInfo from './GeneralProductInfo';

function PurchasedFilterSection() {
  const [selectedFilter, setSelectedFilter] = useState('ID');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const renderFilterMethod = () => {
    switch (selectedFilter) {
      case 'ID':
        return <FilterMethodIDPurchased />;
      case 'Name':
        return <FilterMethodNamePurchased />;
      case 'User Published':
        return <FilterMethodUserPublishedPurchased />;
      case 'Buyer Purchased':
        return <FilterMethodBuyerPurchased />;
      case 'Category':
        return <FilterMethodCategoryPurchased />;
      case 'Date Purchased':
        return <FilterMethodDatePurchased />;
      default:
        return null;
    }
  };

  return (
    <div className='filterSearch'>
      <div className='filterTitle'>
        <h1>Filter Purchased Products</h1>
        <h3 className='flTxt'>Please select a filter method</h3>
      </div>
      <div className='filterButtons'>
        <div className='rowO'>
          <button
            className={`fsButtons ${selectedFilter === 'ID' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('ID')}>
            Product ID
          </button>
          <button
            className={`fsButtons ${selectedFilter === 'Name' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('Name')}>
            Product Name
          </button>
        </div>

        <div className='rowT'>
          <button
            className={`fsButtons ${selectedFilter === 'User Published' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('User Published')}>
            User Published
          </button>
          <button
            className={`fsButtons ${selectedFilter === 'Date Published' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('Buyer Purchased')}>
            Buyer Purchased
          </button>
        </div>

        <div className='rowTh'>
          <button
            className={`fsButtons ${selectedFilter === 'Category' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('Category')}>
            Category
          </button>
          <button
            className={`fsButtons ${selectedFilter === 'Date Purchased' ? 'selected' : ''}`}
            onClick={() => handleFilterClick('Date Purchased')}>
            Date Purchased
          </button>
        </div>
      </div>
      <div className='filterMethod'>
        {renderFilterMethod()}
      </div>

      <GeneralProductInfo />
      
    </div>
  );
}

export default PurchasedFilterSection;

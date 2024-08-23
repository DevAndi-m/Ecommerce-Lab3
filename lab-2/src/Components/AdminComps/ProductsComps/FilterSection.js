import React, { useState } from 'react';
import '../../css/Products.css';
import FilterMethodCategory from './FilterMethodCategory';
import FilterMethodDatePublished from './FilterMethodDatePublished';
import FilterMethodDatePurchased from './FilterMethodDatePurchased';
import FilterMethodID from './FilterMethodID';
import FilterMethodName from './FilterMethodName';
import FilterMethodUserPublished from './FilterMethodUserPublished';
import GeneralProductInfo from './GeneralProductInfo';

function FilterSection() {
  const [selectedFilter, setSelectedFilter] = useState('ID');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  // Function to render the appropriate component based on the selected filter
  const renderFilterMethod = () => {
    switch (selectedFilter) {
      case 'ID':
        return <FilterMethodID />;
      case 'Name':
        return <FilterMethodName />;
      case 'User Published':
        return <FilterMethodUserPublished />;
      case 'Date Published':
        return <FilterMethodDatePublished />;
      case 'Category':
        return <FilterMethodCategory />;
      case 'Date Purchased':
        return <FilterMethodDatePurchased />;
      default:
        return null;
    }
  };

  return (
    <div className='filterSearch'>
      <div className='filterTitle'>
        <h1>Filter Products</h1>
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
            onClick={() => handleFilterClick('Date Published')}>
            Date Published
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
        {/* Render the appropriate filter method component based on the selected filter */}
        {renderFilterMethod()}
      </div>

      <GeneralProductInfo />
      
    </div>
  );
}

export default FilterSection;

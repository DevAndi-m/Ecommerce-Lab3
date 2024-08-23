import React from 'react'
import plc from '../../placeholderImages/profilePLC.jpg';

function ProductCard() {
  return (
    <div className='pCardMain'>
        <div className='rowOne'>
            <div className='rowOneLeft'>
                <div className='pCardTitle'>
                    <h2>Product Title</h2>
                    <p>Date Published: 01/01/0001</p>
                </div>
                <div className='pCardDesc'>
                    <p>Description:</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </div>
            </div>
            <div className='rowOneRight'>
                <img src={plc}></img>
            </div>
        </div>
        <div className='rowTwo'>
            <button className='delProduct'>Delete Product</button>
        </div>
        <p className='pID'>Product Price: $21</p>
        <p className='pID'>Product Category: Toys</p>
        <p className='pID'>Product ID: ID_OF_PRODUCT</p>
        <div className='rowThree'>
            <p>Published by:</p>
            <div className='pCardPublisher'>
                <img src={plc}></img>
                <p>Filhan burri - ID OF USER</p>
            </div>
            
        </div>
    </div>
  )
}

export default ProductCard

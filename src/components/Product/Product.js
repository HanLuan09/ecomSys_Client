import React from 'react';
import { Link } from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import "./Product.scss";

const Product = ({product}) => {

  const imageStyle = {
    backgroundImage: `url(${product?.image})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  };
  const discount = product?.price - product?.price * (product.sale/100)
  let id = ''
  if(product.type == 'book') id = product.book_id
  else if (product.type == 'mobile') id = product.mobile_id
  else if (product.type == 'clothes') id = product.clothes_id
  return (
    <Link to = {`/product/${product.type}/${id}`} key = {id}>
      <div className='product-item bg-white'>
      <div className='category'>{product?.type}</div>
        <div className="home-product-item__img" style={imageStyle}></div>
        <h5 className="home-product-item__name">{product?.name}</h5>
        <div className="home-product-item__price">
          <span className="home-product-item__price-old">{formatPrice(product?.price)}</span>
          <span className="home-product-item__price-curent">{formatPrice(discount)}</span>
        </div>
                                    
        <div className="home-product-item__origin">
          <span className="home-product-item__origin-title">Việt Nam</span>
        </div>
        {
          product?.sale == 0? null: (
            <div className="home-product-item__sale">
              <span className="home-product-item__sale-percent">{product?.sale}%</span>
              <span className="home-product-item__sale-lable">Giảm</span>
            </div>
          )
        }
      
      </div>
    </Link>
  )
}

export default Product
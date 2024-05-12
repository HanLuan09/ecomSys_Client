import React, {useEffect, useState} from 'react';
import "./CategoryProductPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useParams } from 'react-router-dom';
import { getAllProductsByCategory, fetchAsyncProductsOfCategory, getCategoryProductsStatus } from '../../store/categorySlice';
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../utils/status';

const CategoryProductPage = () => {

  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([])
  const [productStatus, setProductStatus] = useState(STATUS.LOADING);

  let url=""
  if(category === "mobile") url ="http://127.0.0.1:4004/api/mobile/all"
  else if (category === "clothes") url ="http://127.0.0.1:4003/api/clothes/all"
  else if (category === "book") url ="http://127.0.0.1:4005/api/book/all"
  
  useEffect(() => {
    
    setProductStatus(STATUS.LOADING); 

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setCategoryProducts(jsonData);
        setProductStatus(STATUS.SUCCEEDED); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setCategoryProducts([])
        setProductStatus(STATUS.FAILED); 
      }
    };

    // Gọi hàm lấy dữ liệu khi component được render
    fetchData();
  }, [category]);

  return (
    <div className='cat-products py-5 bg-whitesmoke'>
      <div className='container'>
        <div className='cat-products-content'>
          <div className='title-md'>
            <h3>See our <span className='text-capitalize'>{category.replace("-", " ")}</span></h3>
          </div>

          {
            productStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {categoryProducts} />
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProductPage
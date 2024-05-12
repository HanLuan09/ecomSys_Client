import React, {useEffect, useState} from 'react';
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';

const HomePage = () => {
  
  const [dataMobile, setDataMobile] = useState([]);
  const [dataBook, setDataBook] = useState([]);
  const [dataClothes, setDataClothes] = useState([]);

  const [productStatus, setProductStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    // Hàm lấy dữ liệu từ API sử dụng fetch
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4004/api/mobile/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setDataMobile(jsonData);
        setProductStatus(STATUS.SUCCEEDED); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setProductStatus(STATUS.FAILED); 
      }
    };

    // Gọi hàm lấy dữ liệu khi component được render
    fetchData();
  }, []);

  useEffect(() => {
    // Hàm lấy dữ liệu từ API sử dụng fetch
    const fetchDataBook = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4005/api/book/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setDataBook(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Gọi hàm lấy dữ liệu khi component được render
    fetchDataBook();
  }, []);

  useEffect(() => {
    // Hàm lấy dữ liệu từ API sử dụng fetch
    const fetchDataClothes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4003/api/clothes/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setDataClothes(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Gọi hàm lấy dữ liệu khi component được render
    fetchDataClothes();
  }, []);


  // if(products.length > 0){
  //   for(let i in products){
  //     let randomIndex = Math.floor(Math.random() * products.length);

  //     while(tempProducts.includes(products[randomIndex])){
  //       randomIndex = Math.floor(Math.random() * products.length);
  //     }
  //     tempProducts[i] = products[randomIndex];
  //   }
  // }

  let catProductsOne = dataMobile
  let catProductsTwo = dataBook
  let catProductsThree = dataClothes


  return (
    <main>
      {/* <div className='slider-wrapper'>
        <HeaderSlider />
      </div> */}
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-4'>

          <div className='categories-item'>
              <div className='title-md'>
                <h3>Clothes</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>Mobiles</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>Books</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage
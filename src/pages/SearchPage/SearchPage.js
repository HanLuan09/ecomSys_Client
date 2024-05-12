import React, {useEffect, useState} from 'react';
import "./SearchPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import { fetchAsyncSearchProduct, getSearchProducts, setSearchTerm, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';

const SearchPage = () => {
  // const dispatch = useDispatch();
  const {searchTerm } = useParams();
  // const searchProducts = useSelector(getSearchProducts);
  // const searchProductsStatus = useSelector(getSearchProductsStatus);

  // useEffect(() => {
  //   dispatch(clearSearch());
  //   dispatch(fetchAsyncSearchProduct(searchTerm));
  // }, [searchTerm]);


  const [searchProductsStatus, setSearchProductsStatus] = useState(STATUS.LOADING);
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    setSearchProductsStatus(STATUS.LOADING); 

    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4010/api/search?key=${searchTerm}`, {
          method: 'POST'
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setSearchProducts(jsonData)
        setSearchProductsStatus(STATUS.SUCCEEDED); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setSearchProductsStatus(STATUS.FAILED); 
      }
    };

    // Gọi hàm lấy dữ liệu khi component được render
    fetchData();
  }, [searchTerm]);

  // if(searchProducts.length === 0){
  //   return (
  //     <div className='container' style = {{
  //       minHeight: "70vh"
  //     }}>
  //       <div className='fw-5 text-danger py-5'>
  //         <h3>No Products found.</h3>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <main>
      <div className='search-content bg-whitesmoke'>
        <div className='container'>
          <div className='py-5'>
            <div className='title-md'>
              <h3>Search results:</h3>
            </div>
            <br />
            {
              searchProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {searchProducts} />
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchPage;
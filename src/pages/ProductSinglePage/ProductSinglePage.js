import React, {useEffect, useState} from 'react';
import "./ProductSinglePage.scss";
import {useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import Loader from "../../components/Loader/Loader";
import {formatPrice} from "../../utils/helpers";
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import CartMessage from "../../components/CartMessage/CartMessage";

const ProductSinglePage = () => {
  const {type, id} = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([])
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);

  const [cartMessageStatus, setCartMessageStatus] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const navigate = useNavigate()

  let url = ""
  if(type =="mobile") url ="http://127.0.0.1:4004/api/mobile/detail/"
  else if (type =="clothes") url ="http://127.0.0.1:4003/api/clothes/detail/"
  else if (type =="book") url ="http://127.0.0.1:4005/api/book/detail/"
  // getting single product
  useEffect(() => {
    if(cartMessageStatus){
      setTimeout(() => {
        setCartMessageStatus(false)
      }, 2000);
    }
  }, [cartMessageStatus]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setProduct(jsonData)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Gọi hàm lấy dữ liệu khi component được render hoặc khi id thay đổi
    fetchData();
  }, [id]);
  const discount = product?.price - product?.price * (product.sale/100)

  if(productSingleStatus === STATUS.LOADING) {
    return <Loader />
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      // if(tempQty > product?.stock) tempQty = product?.stock;
      if(tempQty > product?.quantity) tempQty = product?.quantity;
      return tempQty;
    })
  }

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if(tempQty < 1) tempQty = 1;
      return tempQty;
    })
  }

  const addToCartHandler = async (product) => {
    const userJSON = localStorage.getItem('user');
    if(userJSON == null) navigate("/buyer/login")
    else{
      // let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
      // let totalPrice = quantity * discountedPrice;
      setIsAddingToCart(true);
      const user = JSON.parse(userJSON);
      const token = user.token
      console.log(token)
      let id
      if(product?.type ==="mobile") id = product?.mobile_id
      else if (product?.type =="clothes") id = product?.clothes_id
      else if (product?.type =="book") id = product?.book_id
      const cartItem = {
        'quantity': quantity,
        'type': product?.type, 
        'product_id': id
      }
      try {
            
        const response = await fetch("http://127.0.0.1:4011/api/cart/add/", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(cartItem),
        });
    
        if (!response.ok) {
          setIsAddingToCart(false);
          if(response.status === 401) throw new Error('Unauthorized: Access Denied');
          throw new Error('Network response was not ok');
        }
    
        const jsonData = await response.json();
        setCartMessageStatus(true)
        console.log(jsonData);  
        setIsAddingToCart(false);   
      } catch (error) {
        console.error('Error fetching data:', error); 
        setIsAddingToCart(false); 
      } 
    }
  }


  return (
    <main className='py-5 bg-whitesmoke'>
      <div className='product-single'>
        <div className='container'>
          <div className='product-single-content bg-white grid'>
            <div className='product-single-l'>
              <div className='product-img'>
                <div className='product-img-zoom'>
                  <img src = {product?.image} alt = "" className='img-cover' />
                </div>

                {/* <div className='product-img-thumbs flex align-center my-2'>
                  <div className='thumb-item'>
                    <img src = {
                      product ? (product.images ? product.images[1] : "") : ""
                    } alt = "" className='img-cover' />
                  </div>
                  <div className='thumb-item'>
                    <img src = {
                      product ? (product.images ? product.images[2] : "") : ""
                    } alt = "" className='img-cover' />
                  </div>
                  <div className='thumb-item'>
                    <img src = {
                      product ? (product.images ? product.images[3] : "") : ""
                    } alt = "" className='img-cover' />
                  </div>
                  <div className='thumb-item'>
                    <img src = {
                      product ? (product.images ? product.images[4] : "") : ""
                    } alt = "" className='img-cover' />
                  </div>
                </div> */}
              </div>
            </div>

            <div className='product-single-r'>
              <div className='product-details font-manrope'>
                <div className='title fs-20 fw-5'>{product?.name}</div>
                <div>
                  <p className='para fw-3 fs-15'>{product?.des}</p>
                </div>
                <div className='info flex align-center flex-wrap fs-14'>
                  {/* <div className='rating'>
                    <span className='text-orange fw-5'>Rating:</span>
                    <span className='mx-1'>
                      {product?.rating}
                    </span>
                  </div>
                  <div className='vert-line'></div>
                  <div className='brand'>
                    <span className='text-orange fw-5'>Brand:</span>
                    <span className='mx-1'>{product?.brand}</span>
                  </div>
                  <div className='vert-line'></div> */}
                  <div className='brand'>
                    <span className='text-orange fw-5'>Category:</span>
                    <span className='mx-1 text-capitalize'>
                      {product?.category?.name}
                      
                    </span>
                  </div>
                </div>

                <div className = "price">
                  <div className='flex align-center'>
                    <div className='old-price text-gray'>
                      {formatPrice(product?.price)}
                    </div>         
                  </div>

                  <div className='flex align-center my-1'>
                    <div className='new-price fw-5 font-poppins fs-24 text-orange'>
                      {formatPrice(discount)}
                    </div>
                    <div className='discount bg-orange fs-13 text-white fw-6 font-poppins'>
                      {product?.sale}% Giảm
                    </div>
                  </div>
                </div>

                <div className='qty flex align-center my-4'>
                  <div className='qty-text'>Số lượng:</div>
                  <div className='qty-change flex align-center mx-3'>
                    <button type = "button" className='qty-decrease flex align-center justify-center' onClick={() => decreaseQty()}>
                      <i className='fas fa-minus'></i>
                    </button>
                    <div className = "qty-value flex align-center justify-center">{quantity}</div>
                    <button type = "button" className='qty-increase flex align-center justify-center' onClick={() => increaseQty()}>
                      <i className='fas fa-plus'></i>
                    </button>
                  </div>
                  {
                    (product?.stock === 0) ? <div className ='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>out of stock</div> : ""
                  }
                </div>

                <div className='btns'>
                  <button 
                    type = "button" 
                    className='add-to-cart-btn btn'
                    onClick={() => { addToCartHandler(product)}}
                    disabled={isAddingToCart}
                  >
                    <i className='fas fa-shopping-cart'></i>
                    <span className='btn-text mx-2'>{isAddingToCart ? 'Đang thêm vào giỏ hàng...' : 'Thêm vào giỏ hàng'}</span>
                  </button>
                  <button type = "button" className='buy-now btn mx-3'>
                    <span className='btn-text'>Mua ngay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}
    </main>
  )
}

export default ProductSinglePage
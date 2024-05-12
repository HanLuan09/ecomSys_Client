import React, { useState, useEffect } from 'react';
import "./Header.scss";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const getUserFromLocalStorage = () => {
    try {
      // Lấy chuỗi JSON từ localStorage có key là 'user'
      const userJSON = localStorage.getItem('user');
      return JSON.parse(userJSON);
    } catch (error) {
      console.error('Error retrieving user information from localStorage:', error);
      return null;
    }
  };

  // Sử dụng hàm useEffect để lấy thông tin người dùng từ localStorage khi component được render
  useEffect(() => {
    const user = getUserFromLocalStorage();
    setUser(user);
  }, []); // Pass vào mảng rỗng để chỉ gọi useEffect một lần sau khi component mount

  // Khởi tạo state user và hàm setUser để cập nhật state
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <header className='header text-white'>
      <div className='container'>
        <div className='header-cnt'>
          <div className='header-cnt-top fs-13 py-2 flex align-center justify-between'>
            <div className='header-cnt-top-l'>
              <ul className='flex top-links align-center'>
                <li>
                  <Link to="/seller">Seller Center</Link>
                </li>
                <li className='vert-line'></li>
                <li>
                  <Link to="/download">Download</Link>
                </li>
                <li className='vert-line'></li>
                <li className='flex align-center'>
                  <span className='fs-13'>Follow us on</span>
                  <ul className='social-links flex align-center'>
                    <li className='mx-2'>
                      <a href="www.facebook.com" className='fs-15'>
                        <i className='fab fa-facebook'></i>
                      </a>
                    </li>
                    <li className='mx-2'>
                      <a href="www.instagram.com" className='fs-15'>
                        <i className='fab fa-instagram'></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='header-cnt-top-r'>
              <ul className='top-links flex align-center'>
                <li>
                  <Link to="/" className='top-link-itm'>
                    <span className='top-link-itm-ico mx-2'>
                      <i className='fa-solid fa-circle-question'></i>
                    </span>
                    <span className='top-link-itm-txt'>Support</span>
                  </Link>
                </li>
                {
                  !user ? (
                    <>
                      <li className='vert-line'></li>
                      <li>
                        <Link to="/buyer/register">
                          <span className='top-link-itm-txt'>Đăng ký</span>
                        </Link>
                      </li>
                      <li className='vert-line'></li>
                      <li>
                        <Link to="/buyer/login">
                          <span className='top-link-itm-txt'>Đăng nhập</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className='vert-line'></li>
                      <li>
                        <div style={{ cursor: "pointer" }} onClick={handleLogout}>
                          <span className='top-link-itm-txt'>Đăng xuất</span>
                        </div>
                      </li>
                    </>
                  )
                }
              </ul>
            </div>
          </div>
          <div className='header-cnt-bottom'>
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;

// react router v6
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
// pages
// import {Home, CategoryProduct, ProductSingle, Cart, Search} from "./pages/index";
// components
import store from "./store/store";
import {Provider} from "react-redux";
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { publicRoutes, privateRoutes } from './routes/routes';


function App() {

  const [isAutheniticated, setIsAutheniticated] = useState(false)
  useEffect(() => {
    const userJSON = localStorage.getItem('user');
    // console.log(userJSON)
    setIsAutheniticated(!!userJSON)
  }, [])
  console.log(isAutheniticated)
  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
          <div className="app_main">
            <Routes>
                {publicRoutes.map((route, index)=> {          
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if(route.layout) {
                        Layout = route.layout;
                    }else if(route.layout === null) {
                        Layout = Fragment;
                    }
                    return <Route 
                    key = {index} 
                    path = {route.path} 
                    element = {<Layout><Page/></Layout>}
                    />
                })}

                {privateRoutes.map((route, index)=> {          
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if(route.layout) {
                        Layout = route.layout;
                    }else if(route.layout === null) {
                        Layout = Fragment;
                    }
                    return <Route 
                    key = {index} 
                    path = {route.path} 
                    element = {
                      !isAutheniticated? (
                        <Navigate to="/buyer/login" replace/>
                      ):(
                        <Layout><Page/></Layout>
                      )}
                    />
                })}
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;


// {/* home page route */}
// <Route path = "/" element = {<Home />} />
// {/* single product route */}
// {/* <Route path = "/product/:id" element = {<ProductSingle />} /> */}
// <Route path = "/product/:type/:id" element = {<ProductSingle />} />
// {/* category wise product listing route */}
// <Route path = "/category/:category" element = {<CategoryProduct />} />
// {/* cart */}
// <Route path = "/cart" element = {<Cart />} />
// {/* searched products */}
// <Route path = "/search/:searchTerm" element = {<Search />} />
// <Route path = "/buyer/:buyer" element = {<Buyer />} />

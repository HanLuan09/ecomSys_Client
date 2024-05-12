import {Home, CategoryProduct, ProductSingle, Cart, Search} from "../pages/index";
import config from "../config/index"
import Buyer from "../pages/authentication/Buyer/Buyer";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.category, component: CategoryProduct },
    { path: config.routes.productSingle, component: ProductSingle },
    // { path: config.routes.message, component: Search, layout: HeaderAll},
    { path: config.routes.search, component: Search},
    { path: config.routes.buyer, component: Buyer, layout: null},
];

const privateRoutes = [
    { path: config.routes.cart, component: Cart },

];

export { publicRoutes, privateRoutes };
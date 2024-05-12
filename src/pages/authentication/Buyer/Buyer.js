import classNames from "classnames/bind";
import styles from '../Buyer/Buyer.module.scss';

import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import config from "../../../config";

import {Link, useParams} from "react-router-dom";

const cx = classNames.bind(styles);
function Buyer() {
    const {buyer} = useParams()
    console.log(buyer)
    return ( 
        <div className={cx('wrapper')}>
            <nav className={cx('sgoMs7')}>
                <div className={cx('JjfqZT')}>
                    <Link to = {config.routes.home} className={cx('navbar-brand', 'flex align-center')}>
                        <span className={cx('navbar-brand-text')}>
                            <i className={cx('fa-solid', 'fa-bag-shopping')}></i>
                        </span>
                        <span className={cx('navbar-brand-text', 'navbar-brand-txt mx-2')}>
                            <span className={cx('fw-7')}>Snap</span>Up.
                        </span>
                    </Link>
                </div>
            </nav>

            <div>
                {
                    buyer ==="login"? (<Login/>):(<Signup/>)
                }
            </div>

        </div>
    );
}

export default Buyer;
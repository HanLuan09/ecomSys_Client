import classNames from "classnames/bind";
import styles from '../OtherAccount/OtherAccount.module.scss';
import { GoogleIcon, FacebookIcon } from "../../../components/Icons";


const cx = classNames.bind(styles);

function OtherAccount() {
    return (
        <div className={cx('awPXwj')}>
                                <div className={cx('NleHE1')}>
                                    <div className={cx('rEVZJ2')}></div>
                                    <span className={cx('EMof35')}>hoặc</span>
                                    <div className={cx('rEVZJ2')}></div>
                                </div>
                                <div className={cx('SR5mQ0')}>
                                    <button className={cx('eADVqX', 'b7kM6N', 'KIySnv')}>
                                        <div className={cx('zwXUkg')}>
                                            <FacebookIcon/>
                                        </div>
                                        <div className={cx('btn_icon')}>Facebook</div>
                                    </button>
                                    <button className={cx('eADVqX', 'b7kM6N', 'KIySnv')}>
                                        <div className={cx('zwXUkg')}>
                                            <GoogleIcon/>
                                        </div>
                                        <div className={cx('btn_icon')}>Google</div>
                                    </button>
                                </div>
                            </div>
    );
}

export default OtherAccount;
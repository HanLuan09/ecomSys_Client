import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import styles from '../Login/Login.module.scss';
import Button from "../../../components/Button"
import { ErrorIcon, CloseEyesIcon, OpenEyesIcon } from "../../../components/Icons";
import {Link, useNavigate} from "react-router-dom";
import {Formik} from 'formik';
import * as Yup from 'yup';
import OtherAccount from "../OtherAccount/OtherAccount";


const cx = classNames.bind(styles);

function Login() {

    const navigate = useNavigate();
    const [passwordFocus, setPasswordFocus] = useState(true);
    const [emailFocus, setEmailFocus] = useState(true);
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [interactionOccurred, setInteractionOccurred] = useState(false);

    const handleOnSubmit = async (values, { setSubmitting}) => {
        console.log("Logging in", values);
        try {
            
            const response = await fetch("http://127.0.0.1:4000/api/user/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const jsonData = await response.json();
            console.log(jsonData.access);
            setProfile(jsonData)

             
        } catch (error) {
            console.error('Error fetching data:', error);
             
        } 
        setSubmitting(false);
    };
    
    const setProfile = (response) => {
        const user = { 
            token: response.access,
            refresh: response.refresh
        };
        const userJSON = JSON.stringify(user);
        localStorage.setItem('user', userJSON);
        navigate(-1)
    };

    const handleInteractionOccurred = () => !interactionOccurred && setInteractionOccurred(true)
    return (
        <div className={cx('wrapper')}>
            
            <div className={cx('main')}>
                <div className={cx('Rlj6l5')}>
                    <div className={cx('content')}>
                        <h2 className={cx('header')}> Đăng nhập </h2>
                        <div className={cx('p7oxk2')}>
                            <div className={cx('container')}>  
                                <Formik
                                    initialValues={{ email: "", password: "" }}
                                    onSubmit={handleOnSubmit}
                                    validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email()
                                        .required("Required"),
                                    password: Yup.string()
                                        .required("No password provided.")
                                        .min(8, "Password is too short - should be 8 chars minimum.")
                                        .matches(/(?=.*[0-9])/, "Password must contain a number.")
                                    })}
                                >
                                {props => {
                                    const { isValid, values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div className={cx('container-box')}>
                                                <input className={cx('input-text', { 'input-text-error': errors.email && touched.email && emailFocus })}  
                                                    type="email" placeholder="Email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={e => {
                                                        handleBlur(e);
                                                        !emailFocus && setEmailFocus(true);
                                                    }}
                                                    onFocus={() => emailFocus && setEmailFocus(false)}
                                                    onMouseDown={handleInteractionOccurred}
                                                />
                                                <div className={cx('input-none')}> 
                                                    {errors.email && touched.email && emailFocus && (   
                                                        <ErrorIcon/>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={cx('container-box')}>
                                                <input 
                                                    className={cx('input-text', { 'input-text-error': errors.password && touched.password && passwordFocus })}
                                                    type={passwordVisible ? 'text':'password'} placeholder="Password" autoComplete="new-password" 
                                                    name="password"
                                                    value={values.password}
                                                    onBlur={e => {
                                                        handleBlur(e);
                                                        !passwordFocus && setPasswordFocus(true);
                                                    }}
                                                    onChange={handleChange}
                                                    onFocus={() => passwordFocus && setPasswordFocus(false)}
                                                    onMouseDown={handleInteractionOccurred}
                                                />
                                                <div className={cx('input-none')}> 
                                                    {errors.password && touched.password && passwordFocus && (   
                                                        <ErrorIcon/>
                                                    )}
                                                    <i tabIndex="0" role="button" aria-pressed="false" className={cx('password-icon')} onClick={() => setPasswordVisibility(!passwordVisible)}>
                                                        {passwordVisible ? (<OpenEyesIcon/>):(<CloseEyesIcon/>)}
                                                    </i>
                                                </div>
                                            </div>
                                            <div className={cx('container-forgot')}>Quên mật khẩu?</div>   
                                            <div className={cx('button')}>
                                                <Button primary big type = "submit" disabled={!isValid || !interactionOccurred}>ĐĂNG NHẬP</Button>     
                                                                                                                  
                                            </div>                            
                                        </form>
                                    );
                                }}
                                </Formik>                                             
                            </div>
                            <OtherAccount/>
                        </div>


                        <div className={cx('fEA_sn')}>
                            <div className={cx('hrNwO1', 'PNGrtG')}>Bạn mới biết đến SnapUp? 
                                <Link className={cx('U3bTnx')} to = "/buyer/register">Đăng ký</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
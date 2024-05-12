import PropTypes from 'prop-types';
import styles from '../Button/Button.module.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';
const cx = classNames.bind(styles);
function Button({ to, href, onClick, children, className, 
    leftIcon, rightIcon,
    primary = false,outline= false, outlineApp= false, text = false, rounded = false,
    disabled = false,
    small = false, large = false, big = false,
    ...passProps 
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if(to) {
        props.to = to;
        Comp = Link;
    }else if(href){
        props.href = href;
        Comp = 'a';
    }

    // Remove event listener when btn disabled
    if(disabled) {
        Object.keys(props).forEach(key => {
            if(key.startsWith('on') && typeof props[key] ==='function') {
                delete props[key];
            }
        });
        // delete props.onClick;
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary, 
        outline,
        outlineApp,
        text,
        rounded,
        disabled,
        small,
        large,
        big,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}
Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    outlineApp: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    big: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};
export default Button;
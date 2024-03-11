import classNames from 'classnames';
import style from "./styles.module.scss";

const Button = ({className, onClick, children, variant, ...props}) => {
    const buttonClasses = classNames(style.button, {
        [style.default]: variant === 'default',
        [style.blue]: variant === 'blue',
    }, className);

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;



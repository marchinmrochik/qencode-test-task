import {forwardRef} from 'react';
import classNames from 'classnames';
import style from "./styles.module.scss";

const InputBase = forwardRef((
    {className, ...props}, ref) => {
    const inputClasses = classNames(style.input, className);

    return (
        <input
            ref={ref}
            className={inputClasses}
            {...props}
        />
    );
})

export default InputBase;



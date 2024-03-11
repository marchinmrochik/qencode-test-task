import React from 'react';
import classNames from 'classnames';
import InputBase from '../input';
import {LIMIT_ERROR_LENGTH} from "../../../utils/constants";

import style from "./styles.module.scss";

const Field = ({
                   className,
                   labelClassName,
                   inputClassName,
                   errorClassName,
                   error,
                   iconClassName,
                   icon,
                   handleIcon,
                   altIcon,
                   id,
                   type,
                   name,
                   placeholder,
                   register,
                   labelField,
                   inputProps
               }) => {

    const fieldClasses = classNames(style.container, className);
    const labelClasses = classNames(style.label, labelClassName);
    const errorClasses = classNames(style.error, error?.length > LIMIT_ERROR_LENGTH && style.errorRelative,errorClassName);
    const iconClasses = classNames(style.icon, labelField && style.iconPosition, iconClassName);
    const inputClasses = classNames(inputClassName, error && style.inputError)

    return (
        <label htmlFor={id} className={fieldClasses}>
            {labelField && <p className={labelClasses}>{labelField}</p>}
            <InputBase
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name, inputProps)}
                className={inputClasses}
            />
            {icon && (
                <img
                    className={iconClasses}
                    src={icon}
                    alt={altIcon}
                    onClick={handleIcon}
                />
            )}
            <p className={errorClasses}>
                {error}
            </p>
        </label>
    );
};

export default Field;

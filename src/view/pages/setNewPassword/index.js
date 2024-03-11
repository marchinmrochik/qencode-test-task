import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useSetPasswordMutation} from "../../../store/services/userApi";
import {Button, Field} from "../../components";
import AuthLayout from "../../layouts/auth";
import {transformErrors} from "../../../utils/transformErrors";
import {PASSWORD_PATTERN_VALIDATION} from "../../../utils/constants";

import {icEye, icEyeClose} from '../../../assets/icons'

import style from './styles.module.scss'

const SetNewPassword = () => {
    const navigate = useNavigate();
    const { secret, token } = useParams();
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm();

    const [setPassword, {isLoading, error}] = useSetPasswordMutation();

    const onSubmit = async (data) => {
        try {
            const dataSend = {
                token: token,
                secret: secret,
                password: data.password,
                password_confirm: data.password_confirm,
            }

            if (data.password !== data.password_confirm) {
                setError("password_confirm", {
                    type: "manual",
                    message: "Passwords do not match",
                });
                return;
            }

            const result = await setPassword(dataSend).unwrap();

            // Once the API is ready, you need to uncomment out and synchronize result with the backend
            // navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <AuthLayout title={'Create new Password?'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    labelField={"Password"}
                    id="password"
                    type={showPassword ? "password" : "text"}
                    name="password"
                    placeholder="Password"
                    inputClassName={style.inputPassword}
                    register={register}
                    inputProps={{
                        required: true,
                        pattern: PASSWORD_PATTERN_VALIDATION
                    }}
                    error={
                        errors?.password ?
                            'The password fields should be at least 8 characters long.'
                            : transformErrors(error)?.password
                    }
                    icon={showPassword ? icEye : icEyeClose}
                    handleIcon={() => setShowPassword(!showPassword)}
                    altIcon="icon eye"

                />
                <Field
                    labelField={"Confirm Password"}
                    id="password_confirm"
                    type={showConfirmPassword ? "password" : "text"}
                    name="password_confirm"
                    placeholder="Password"
                    inputClassName={style.inputPassword}
                    register={register}
                    inputProps={{
                        required: true,
                        pattern: PASSWORD_PATTERN_VALIDATION
                    }}
                    error={
                        errors?.password_confirm ?
                            (errors?.password_confirm?.message || 'The password fields should be at least 8 characters long.')
                            : transformErrors(error)?.password_confirm
                    }
                    icon={showConfirmPassword ? icEye : icEyeClose}
                    handleIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                    altIcon="icon eye"
                />
                <Button
                    className={style.buttonSubmit}
                    disabled={isLoading}
                    variant="blue"
                >
                    Reset Password
                </Button>
            </form>
        </AuthLayout>
    );
};

export default SetNewPassword;

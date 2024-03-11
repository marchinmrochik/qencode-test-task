import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {usePasswordResetMutation} from "../../../store/services/userApi";
import AuthLayout from "../../layouts/auth";
import {Button, Field} from "../../components";
import {transformErrors} from "../../../utils/transformErrors";
import {EMAIL_PATTERN_VALIDATION} from "../../../utils/constants";

import style from './styles.module.scss'

const ForgotPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [passwordReset, {isLoading, error}] = usePasswordResetMutation();

    const onSubmit = async (data) => {
        try {
            const dataSend = {
                email: data.email,
                redirect_url: "https://auth-qa.qencode.com/password-set",
            }
            const result = await passwordReset(dataSend).unwrap();

            navigate(`/set-new-password?secret=${result.secret}&token=${result.token}`);
        } catch (e) {
            console.error(e)
        } finally {
            navigate(`/set-new-password?secret=secret&token=token`);
        }
    }

    return (
        <AuthLayout title={'Forgot Password?'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    register={register}
                    inputProps={{
                        required: true,
                        pattern: EMAIL_PATTERN_VALIDATION
                    }}
                    error={errors?.email ? 'Email wrong' : transformErrors(error)?.email}
                />
                <Button
                    className={style.buttonSubmit}
                    disabled={isLoading}
                    variant="blue"
                >
                    Send
                </Button>
                <Button
                    className={style.buttonSubmit}
                    disabled={isLoading}
                    variant="default"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;

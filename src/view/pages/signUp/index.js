import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch} from 'react-redux';
import {useSignUpMutation} from "../../../store/services/userApi";
import {useGetAccessTokenMutation, useGetUserProfileQuery} from "../../../store/services/githubApi";
import {useGoogleLogin} from "@react-oauth/google";
import {setTokens, setUser} from "../../../store/features/user/userSlice";
import {Button, Field} from "../../components";
import AuthLayout from "../../layouts/auth";
import {transformErrors} from "../../../utils/transformErrors";
import {EMAIL_PATTERN_VALIDATION, GITHUB_OAUTH_URL, PASSWORD_PATTERN_VALIDATION} from "../../../utils/constants";

import {icEye, icEyeClose, icGoogle, icGithub} from '../../../assets/icons'

import style from './styles.module.scss'


const SignUp = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(true);
    const [getAccessToken] = useGetAccessTokenMutation();
    const {data: userProfile} = useGetUserProfileQuery();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [signUp, {isLoading, error}] = useSignUpMutation();

    useEffect(() => {
        handleGitHubCallback();
    }, []);

    const onSubmit = async (data) => {
        try {
            const result = await signUp(data).unwrap();

            // Once the API is ready, you need to uncomment out and synchronize the keys with the backend
            // dispatch(setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
            // dispatch(setUser(result.user));
            // navigate('/next-page')
        } catch (e) {
            console.error(e)
        }
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            // Once the API is ready, you need to uncomment out and synchronize with the backend
            // dispatch(setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
            // dispatch(setUser(result.user));
            // navigate('/next-page')
        }
    });

    const handleLogin = async (code) => {
        try {
            const {data} = await getAccessToken(code);
            const accessToken = data.access_token;
            await userProfile(accessToken).unwrap();
        } catch (error) {
            console.error(error)
        }
    };

    const handleGitHubCallback = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');

        if (code) {
            await handleLogin(code);
        }
    };

    return (
        <AuthLayout title={'Sing up to your account'}>
            <div className={style.buttonsAuthContainer}>
                <Button className={style.buttonAuth} variant="default" onClick={() => loginWithGoogle()}>
                    <img src={icGoogle} alt="logo google"/>
                    <span>Google</span>
                </Button>
                <Button className={style.buttonAuth} variant="default"
                        onClick={() => window.location.href = GITHUB_OAUTH_URL}>
                    <img src={icGithub} alt="logo github"/>
                    <span>Github</span>
                </Button>
            </div>
            <div className={style.dividerContainer}>
                <div className={style.line}/>
                <span className={style.dividerText}>OR</span>
                <div className={style.line}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    register={register}
                    inputProps={{
                        required: true,
                        pattern: EMAIL_PATTERN_VALIDATION
                    }}
                    error={errors?.email ? 'Email wrong' : transformErrors(error)?.email}
                />
                <div>
                    <Field
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
                                ' The password fields should be at least 8 characters long.'
                                : transformErrors(error)?.password
                        }
                        icon={showPassword ? icEye : icEyeClose}
                        handleIcon={() => setShowPassword(!showPassword)}
                        altIcon="icon eye"
                    />
                </div>
                <Button
                    className={style.buttonSubmit}
                    disabled={isLoading}
                    variant="blue"
                >
                    Sign up to Qencode
                </Button>
                <p className={style.textInfo}>
                    Already a Qencode member?
                    <Link to="/login">
                        Log in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default SignUp;

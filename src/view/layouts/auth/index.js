import {Link} from "react-router-dom";

import { icLogo } from "../../../assets/icons";

import style from './styles.module.scss';

const AuthLayout = ({ title, children }) => {
    return (
        <div className={style.container}>
            <Link to={'/'}>
                <img src={icLogo} className={style.logo} alt="logo company"/>
            </Link>
            <h1 className={style.title}>
                {title}
            </h1>
            {children}
        </div>
    );
};

export default AuthLayout;

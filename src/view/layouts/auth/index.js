import { icLogo } from "../../../assets/icons";

import style from './styles.module.scss';

const AuthLayout = ({ title, children }) => {
    return (
        <div className={style.container}>
            <img src={icLogo} className={style.logo} alt="logo company"/>
            <h1 className={style.title}>
                {title}
            </h1>
            {children}
        </div>
    );
};

export default AuthLayout;

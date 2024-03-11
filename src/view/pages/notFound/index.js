import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h2>404 - Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default NotFound;

import React, { useEffect, useState } from 'react'
import styles from "./Landing.module.css"
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from '../../components/Button/Button';
import { ReactNotifications, Store } from 'react-notifications-component';
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    var navigate = useNavigate();
    const [loader, setloader] = useState(false);
    const currentURL = window.location.href;

    const handleLogin = () => {
        window.location.href = currentURL + "\login"
    };

    const handleSignUp = () => {
        window.location.href = currentURL + "\signup"
    };
    useEffect(() => {
        const logbit = localStorage.getItem('logbit');

        if (logbit) {
            navigate('/weather');
        }
    }, []);

    return (
        <div className={styles.container}>

            <h1 className={styles.logo}>
                WINDY
            </h1>
            <div className={`${styles.page_wrapper_main}`}>
                <div className={`${styles.page_wrapper}`}>
                    <div className={`${styles.landing_container}`}>
                        <div className={`${styles.landingFormContainer}`}>
                            {loader && <SimpleLoader message={"Loading"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <Button text={"Login"} onClickMethod={handleLogin} color='rgb(255, 100, 0)' />
                                <br /><br />
                                <Button text={"Sign Up"} onClickMethod={handleSignUp} color='rgb(255, 100, 0)' />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing
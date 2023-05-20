import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import FormField from "../../components/FormField/FormField";
import { LOGIN_FORM_FIELDS } from "../../data/RegData";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
import Heading from "../../components/Heading/Heading.js";
import { apiLogin } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

const Login = () => {
    var navigate = useNavigate();

    const loginDetailsFormat = {
        email: "",
        pass: "",
    }
    
    const clickedSubmit = async () => {

        setloader(true);

        const resp = await apiLogin({
            ...loginDetails,
        });
        if (resp === undefined) {
            Store.addNotification({ ...toastNotification, message: "Error Undefined" })
        } else {
            if (resp.status === 200) {
                localStorage.setItem("email", resp.data.email);
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("logbit", 1);
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                navigate('/weather');
                // setloader(false);

            } else if (resp.status >= 400 && resp.status < 500) {
                console.log(resp.data.message);
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag })
                setloader(false);

            } else if (resp.status >= 500 && resp.status < 600) {
                console.log(resp.data.message);
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag })
                setloader(false);

            }
        }

    }
    const [loader, setloader] = useState(false);
    const [loginDetails, setLoginDetails] = useState(loginDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const changeLoginFormState = (args) => {
        let prevState = loginDetails
        prevState[args.key] = args.value
        setLoginDetails({ ...prevState })
    }
    useEffect(() => {
        const logbit = localStorage.getItem('logbit');

        if (logbit) {
            navigate('/weather'); // Redirect to login page if not authenticated
        }
    }, []);
    return (
        <>
            <div className={`${styles.login_wrapper_main}`}>
                <div className={`${styles.login_wrapper}`}>
                    <Heading text='LOGIN' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"Logging in"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {LOGIN_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={loginDetails}
                                                    setter={changeLoginFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }

                                </>
                                <div>
                                    <Button text={"Login"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' /><br/><br/>
                                    <Button text={"Forgot Password"} onClickMethod={()=>{navigate('/forgotpass')}} color='rgb(255, 100, 0)' />
                                    <Modal showCloseIcon={false} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} center autofocus={false} classNames={{
                                        overlay: `${styles.customOverlay}`,
                                        modal: `${styles.customModal}`,
                                    }}>
                                        {/* <Popup /> */}
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login
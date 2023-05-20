import { useState, useEffect } from "react";
import styles from "./Register.module.css";
import FormField from "../../components/FormField/FormField";
import { REGISTER_FORM_FIELDS } from "../../data/RegData";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
import Heading from "../../components/Heading/Heading.js";
import { apiSignUp } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';


const Register = () => {
    var navigate = useNavigate();

    const registerDetailsFormat = {
        firstname: "",
        lastname: "",
        email: "",
        pass: "",
    }
    const clickedSubmit = async () => {

        setloader(true);

        const resp = await apiSignUp({
            ...registerDetails,
        });
        if (resp === undefined) {
            Store.addNotification({ ...toastNotification, message: "Error Undefined" })
        } else {
            if (resp.status === 200) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                setLoginDetails(registerDetailsFormat);
                navigate('/');
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
    const [registerDetails, setLoginDetails] = useState(registerDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const changeLoginFormState = (args) => {
        let prevState = registerDetails
        prevState[args.key] = args.value
        setLoginDetails({ ...prevState })
    }
    useEffect(() => {
        const logbit = localStorage.getItem('logbit');
    
        if (logbit) {
          navigate('/weather'); 
        }
      }, []);
    return (
        <>
            <div className={`${styles.register_wrapper_main}`}>
                <div className={`${styles.register_wrapper}`}>
                    <Heading text='Sign Up' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"Logging in"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {REGISTER_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={registerDetails}
                                                    setter={changeLoginFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }

                                </>
                                <div>
                                    <Button text={"Sign Up"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' />
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

export default Register
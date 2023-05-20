import { useState, useEffect } from "react";
import styles from "./ChangePass.module.css";
import FormField from "../../components/FormField/FormField";
import { RESET_PASS_FIELDS } from "../../data/RegData";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
import Heading from "../../components/Heading/Heading.js";
import { apiChangePassword} from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

const ChangePass = () => {
    var navigate = useNavigate();

    const resetDetailsFormat = {
        email: "",
        pass: "",
        conpass: "",
    }
    const clickedChangePassword = async () => {
        const resp = await apiChangePassword({
            ...resetDetails,
        });
        if (resp === undefined) {
            Store.addNotification({ ...toastNotification, message: "Error Undefined" })
        } else {
            if (resp.status === 200) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                navigate('/login');
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
    const [resetDetails, setResetDetails] = useState(resetDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const changeResetFormState = (args) => {
        let prevState = resetDetails
        prevState[args.key] = args.value
        setResetDetails({ ...prevState })
    }
    
    return (
        <>
            <div className={`${styles.reset_wrapper_main}`}>
                <div className={`${styles.reset_wrapper}`}>
                    <Heading text='RESET PASSWORD' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"Logging in"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {RESET_PASS_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={resetDetails}
                                                    setter={changeResetFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }

                                </>
                                <div>
                                    <Button text={"Reset"} onClickMethod={clickedChangePassword} color='rgb(255, 100, 0)' /><br /><br />
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

export default ChangePass;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import success from "../../assets/images/bg/verified.png";
import styles from "./EmailVerification.module.css";
import { apiVerifyEmail } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';
import { toastNotification } from "../../components/Notification/Notification";
import Button from "../../components/Button/Button";
import 'react-notifications-component/dist/theme.css';
const EmailVerification = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
    var navigate = useNavigate();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const resp = await apiVerifyEmail(param.email,param.token);
                if (resp === undefined) {
                    Store.addNotification({ ...toastNotification, message: "Error Undefined" })
                } else {
                    if (resp.status === 200) {
                        Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                        navigate('/');
                        // setloader(false);
        
                    } else if (resp.status >= 400 && resp.status < 500) {
                        console.log(resp.data.message);
                        Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag })
        
                    } else if (resp.status >= 500 && resp.status < 600) {
                        console.log(resp.data.message);
                        Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag })
        
                    }
                }
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param, validUrl]);

	return (
		<>
			
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
                    <Button text={"Login"} onClickMethod={()=>{navigate('/login')}} color='rgb(255, 100, 0)' />

				</div>
		</>
	);
};

export default EmailVerification;
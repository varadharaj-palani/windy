import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";
import { apiGetSavAccount, apiPayBill } from "../../auth/auth";
import { MODAL_FORM_FIELDS, Accounts, Billno } from "../../data/modaldata";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from "../Notification/Notification";
import 'react-notifications-component/dist/theme.css';

function Modal(props) {
    const [accData, setAccData] = useState([]);
    const billDataFormat = {
        email: localStorage.getItem('email'),
        pwd: "",
        accno: "",
        billno: props.datum.billno,
    }
    const [billData, setBillData] = useState(billDataFormat);
    const [bit, setBit] = useState(false)
    const changeAccState = (args) => {
        let prevState = billData
        prevState[args.key] = args.value
        setBillData({ ...prevState })
    }
    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };

    console.log(props.datum);
    if (!props.datum.modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const proceedTransaction = async () => {
        const resp = await apiPayBill(billData);
        if (resp === undefined) {
            console.log('Error Try Again')
        }
        else {
            if (resp.status === 200) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                props.datum.setModal(false)
            }
            else if (resp.status >= 400 && resp.status < 500) {
                console.log("Query Error")
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
            else if (resp.status >= 500 && resp.status < 600) {
                console.log("Internal Server Error")
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
        }
    }

    const callapi = async () => {
        const resp = await apiGetSavAccount(config);
        if (resp === undefined) {
            console.log('Error Try Again')
        }
        else {
            if (resp.status === 200) {
                console.log("Account Found")
                console.log(resp.data);
                setAccData(resp.data);
            }
            else if (resp.status >= 400 && resp.status < 500) {
                console.log("Query Error")
            }
            else if (resp.status >= 500 && resp.status < 600) {
                console.log("Internal Server Error")
            }
        }
    }

    useEffect(() => {
        console.log("useEffect");
        callapi().then(() => {
            console.log(billData);
            setBit(!bit);
        });
    }, [])


    return (
        <>
            <div className={`${styles.modal}`}>
                <div onClick={() => { props.datum.setModal(!props.datum.modal) }} className={`${styles.overlay}`}></div>
                <div className={`${styles.modalContent}`}>
                    <button className={`${styles.closeModal}`} onClick={() => { props.datum.setModal(false) }}>
                        x
                    </button>
                    <h2>Pay Bill</h2>
                    {Billno.map((field, key) => {
                        return (
                            <>
                                <FormField
                                    key={key}
                                    type={field.type}
                                    name={field.name}
                                    heading={field.heading}
                                    value={billData}
                                    setter={changeAccState}
                                />
                            </>
                        );
                    })
                    }
                    {bit && Accounts.map((field, key) => {
                        return (
                            <>
                                <FormField
                                    key={key}
                                    type={field.type}
                                    name={field.name}
                                    heading={field.heading}
                                    value={billData}
                                    dropdownValues={accData}
                                    setter={changeAccState}
                                />
                            </>
                        );
                    })
                    }
                    {MODAL_FORM_FIELDS.map((field, key) => {
                        return (
                            <>
                                <FormField
                                    key={key}
                                    type={field.type}
                                    name={field.name}
                                    heading={field.heading}
                                    value={billData}
                                    setter={changeAccState}
                                />
                            </>
                        );
                    })
                    }

                    <Button text='Proceed' onClickMethod={proceedTransaction} />
                </div>
            </div>
        </>)

}
export default Modal;
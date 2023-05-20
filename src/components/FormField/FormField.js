import React from "react";
import styles from "./FormField.module.css";

function FormField({
    type,
    heading,
    info,
    name,
    misc,
    dropdownValues,
    value,
    setter,
}) {
    const renderFormField = () => {
        switch (type) {
            case "date":
                return (
                    <div className={`${styles.form_container}`}>
                        <p className={`${styles.heading}`}>{heading}</p>
                        <input
                            type={type}
                            value={value[name]}
                            onChange={(e) =>
                                setter({
                                    key: name,
                                    value: e.target.value,
                                    memberNumber: misc?.memberNumber,
                                })
                            }
                        />
                        <p className={`${styles.info}`}>{info}</p>
                    </div>
                );
            case "text":
                return (
                    <div className={`${styles.form_container}`}>
                        <p className={`${styles.heading}`}>{heading}</p>
                        <input
                            type={type}
                            value={value[name]}
                            onChange={(e) =>
                                setter({
                                    key: name,
                                    value: e.target.value,
                                    memberNumber: misc?.memberNumber,
                                })
                            }
                        />
                        <p className={`${styles.info}`}>{info}</p>
                    </div>
                );

            case "textarea":
                return (
                    <div className={`${styles.form_container}`}>
                        <p className={`${styles.heading}`}>{heading}</p>
                        <textarea
                            className={`${styles.textarea}`}
                            value={value[name]}
                            onChange={(e) =>
                                setter({
                                    key: name,
                                    value: e.target.value,
                                    memberNumber: misc?.memberNumber,
                                })
                            }
                        />
                        <p className={`${styles.info}`}>{info}</p>
                    </div>
                );

            case "dropdown":
                return (
                    <div className={`${styles.form_container}`}>
                        <p className={`${styles.heading}`}>{heading}</p>
                        <select
                            value={value[name]}
                            onChange={(e) =>
                                setter({
                                    key: name,
                                    value: e.target.value,
                                    memberNumber: misc?.memberNumber,
                                })
                            }
                        >{console.log(dropdownValues)}
                            {dropdownValues.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                        <p className={`${styles.info}`}>{info}</p>
                    </div>
                );
            case "tel":
                return (
                    <div className={`${styles.form_container}`}>
                        <p className={`${styles.heading}`}>{heading}</p>
                        <input
                            type={type}
                            value={value[name]}
                            onChange={(e) =>
                                setter({
                                    key: name,
                                    value: e.target.value,
                                    memberNumber: misc?.memberNumber,
                                })
                            }
                        />
                        <p className={`${styles.info}`}>{info}</p>
                    </div>
                );
            case "number":
                return (
                    <div className={`${styles.form_container}`}>
                        <p className={`${styles.heading}`}>{heading}</p>
                        <input
                            type={type}
                            value={value[name]}
                            min={0}
                            onChange={(e) =>
                                setter({
                                    key: name,
                                    value: e.target.value,
                                    memberNumber: misc?.memberNumber,
                                })
                            }
                        />
                        <p className={`${styles.info}`}>{info}</p>
                    </div>
                );
            case "password":
                return (
                    <div className={`${styles.form_container}`}>
                        <p className={`${styles.heading}`}>{heading}</p>
                        <input
                            type={type}
                            value={value[name]}
                            onChange={(e) =>
                                setter({
                                    key: name,
                                    value: e.target.value,
                                    memberNumber: misc?.memberNumber,
                                })
                            }
                        />
                        <p className={`${styles.info}`}>{info}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return <>{renderFormField()}</>;
}

export default FormField;

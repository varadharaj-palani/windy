import React, { useState } from "react";
import styles from "./CoordinateBox.module.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import Button from "../../components/Button/Button";
import WeatherCard from "../../pages/Weather/WeatherCard";
import { apigetWeatherCoordinate } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

function CoordinateBox() {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [data, setData] = useState({});

    const handleLatitudeChange = (event) => {
        setLatitude(event.target.value);
    };

    const handleLongitudeChange = (event) => {
        setLongitude(event.target.value);
    };

    const clickedSubmit = async () => {
        const config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };

        const resp = await apigetWeatherCoordinate({
            'lat': latitude,
            'long': longitude
        }, config);
        if (resp === undefined) {
            Store.addNotification({ ...toastNotification, message: "Error Undefined" })
        } else {
            
            if (resp.status == 200) {
                console.log(resp)
                setData(resp.data.data)
                console.log(data)
                // Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                // setloader(false);

            } else if (resp.status >= 400 && resp.status < 500) {
                console.log(resp.data.message);
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag })

            } else if (resp.status >= 500 && resp.status < 600) {
                console.log(resp.data.message);
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag })

            }
        }

    }

    return (
        <> {(typeof data.main != 'undefined') ? (
            <WeatherCard weatherData={data} />
        ) : (
            <>
                <div className={styles.bar}>
                    <input
                        className={styles.coordinateBox}
                        type="text"
                        value={latitude}
                        onChange={handleLatitudeChange}
                        placeholder="Enter latitude"
                    />
                    <FaMapMarkerAlt className={styles.coordinateIcon} />
                </div>
                <br />
                <div className={styles.bar}>
                    <input
                        className={styles.coordinateBox}
                        type="text"
                        value={longitude}
                        onChange={handleLongitudeChange}
                        placeholder="Enter longitude"
                    />
                    <FaMapMarkerAlt className={styles.coordinateIcon} />
                </div>
                <br />
                <Button text={"Get Weather"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' /><br /><br />
            </>
        )}
        </>
    );
}

export default CoordinateBox;

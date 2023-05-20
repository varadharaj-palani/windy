import React, { useState } from "react";
import styles from "./SearchBox.module.css";
import { FaSearch } from "react-icons/fa";
import Button from "../../components/Button/Button";
import WeatherCard from "../../pages/Weather/WeatherCard";
import { apigetWeatherCity } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

const SearchBox = () => {
    const [location, setLocation] = useState("");
    const [data, setData] = useState({});

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    };
    const clickedSubmit = async () => {
        const config = {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        };

        const resp = await apigetWeatherCity({
            'city': location,
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
        <>{(typeof data.main != 'undefined') ? (
            <WeatherCard weatherData={data} />
        ) : (
            <>
                <div className={styles.bar}>
                    <input
                        className={styles.searchBox}
                        type="search"
                        value={location}
                        onChange={handleLocationChange}
                        placeholder="Enter location"
                        autoComplete="off"
                        inputMode="search"
                        on
                    />
                    <FaSearch className={styles.searchIcon} />
                </div>
                <br />
                <Button text={"Get Weather"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' /><br /><br />
            </>
        )}
        </>

    );
}

export default SearchBox;

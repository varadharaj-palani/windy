import React, { useState, useEffect } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import CoordinateInput from "../../components/CoordinateBox/CoordinateBox";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import styles from "./Weather.module.css";
import { ReactNotifications, Store } from 'react-notifications-component';
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';
import WeatherCard from "./WeatherCard";

import { useNavigate } from "react-router-dom";

const Weather = () => {
    const [searchType, setSearchType] = useState(null);
    const [loader, setloader] = useState(false);
    var navigate = useNavigate();

    const handleLocationSearch = () => {
        setSearchType("location");
    };

    const handleCoordinateSearch = () => {
        setSearchType("coordinates");
    };

    const handleBack = () => {
        setSearchType(null);
    };
    useEffect(() => {
        const logbit = localStorage.getItem('logbit');

        if (!logbit) {
            navigate('/'); // Redirect to login page if not authenticated
        }
    }, []);
    return (
        <>
            <div className={`${styles.button}`}>
                <Button text={"Log Out"} onClickMethod={() => { localStorage.clear(); Store.addNotification({ ...toastNotification, message: "Logged Out" }); navigate('/'); }} color='rgb(255, 100, 0)' />
            </div>
            <div className={`${styles.weather_wrapper_main}`}>
                <div className={`${styles.weather_wrapper}`}>
                    <Heading text='WINDY' />
                    <div className={`${styles.page_container}`}>
                        <div className={`${styles.pageboxContainer}`}>
                            {loader && <SimpleLoader message={"Loading"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.boxWrapper}`}
                            >
                                {searchType === null && (
                                    <>
                                        <Button text={"Location"} onClickMethod={handleLocationSearch} color='rgb(255, 100, 0)' />
                                        <br /><br />
                                        <Button text={"Coordinates"} onClickMethod={handleCoordinateSearch} color='rgb(255, 100, 0)' />
                                    </>
                                )}

                                {searchType === "location" && (
                                    <>
                                        <SearchBox />
                                        <br/>
                                        <Button text={"Back"} onClickMethod={handleBack} color='rgb(255, 100, 0)' />
                                    </>
                                )}

                                {searchType === "coordinates" && (
                                    <>
                                        <CoordinateInput />
                                        <Button text={"Back"} onClickMethod={handleBack} color='rgb(255, 100, 0)' />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;

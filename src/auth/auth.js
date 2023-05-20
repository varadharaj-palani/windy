import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
})


export const apiLogin = async (data) => {
  try {
    const response = await api.post("api/login", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiSignUp = async (data) => {
  try {
    const response = await api.post("api/signup", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiResetPass = async (data) => {
  try {
    const response = await api.get(`api/forgotpass/${data.email}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiVerifyEmail = async (email,token) => {
  try{
    const response = await api.get(`api/everify/${email}/${token}`)
    return response;
  } catch (error) {
    return error.response;
  }
};


export const apiVerifyCode = async (data) => {
  try{
    console.log("data",data)
    const response = await api.post(`api/verifycode`,data)
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apiChangePassword = async (data) => {
  try{
    const response = await api.post(`api/changepass`,data)
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apigetWeatherCoordinate = async (data, config) => {
  try{
    const response = await api.post(`api/getweather/coordinates`,data,config)
    return response;
  } catch (error) {
    return error.response;
  }
};

export const apigetWeatherCity = async (data, config) => {
  try{
    const response = await api.post(`api/getweather/city`,data,config)
    return response;
  } catch (error) {
    return error.response;
  }
};
import Cookies from 'js-cookie'

const BASE_URL = "http://localhost:8080/api/humidityData";

const token = Cookies.get("token");

export const fetchhumidityData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw Error("Response is not ok while fetching humidityData");
    return response.json();
  } catch (err) {
    console.error("Could not connect to API ", err);
    throw err;
  }
};

export const fetchLatestHumidityData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/latest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw Error("Response is not Ok while fecthing data humdity");
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const fetchhumidityDataById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw Error("Response is not ok while fetching humidityData");
    return response.json();
  } catch (err) {
    console.error("Could not connect to API ", err);
    throw err;
  }
};

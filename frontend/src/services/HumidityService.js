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
    if (response.ok) {
      console.log("Response is okay! fetching humidityData latest");
      return response.json();
    } 
    if (response.status === 204) {
     console.log("No content available");
     return null;

  }else throw Error("Response is not ok while fetching TempData");

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
    if (response.ok)
    {
      console.log("Response latest hum status ", response.status);
      return response.json();
    }
    if(response.status === 404) {
      console.log("No value available");
      return null;
    }
    
    else{
       console.log("Response latest hum status ", response.status);
    }
    } 
  catch (err) {
    throw Error("Response is not ok while fetching humidityData latest");

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


  export const getHistory = async (limit) => {
    try {
      const response = await fetch(`${BASE_URL}/history?_limit=${limit}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
          console.error("history response is okay!");
          return response.json();
      }

      if (response.status === 204) {
        console.log("No content available");
        return null;
      }
    } catch (err) {
      console.error("Could not connect to API ", err);
      throw err;
    }       
  }

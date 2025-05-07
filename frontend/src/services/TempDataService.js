import Cookies from "js-cookie";

const token = Cookies.get("token");

const BASE_URL = "http://localhost:8080/api/tempData";

export const fetchTempData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
        console.log("Response is okay!");
        return response.json();
    } 
    if (response.status === 204) {
      console.log("No content available");
      return null;

    }else throw Error("Response is not ok while fetching TempData");

  }
    catch (err) {
    console.error("Could not connect to API ", err);
    throw err;
  }
};

export const fetchLatestTemperatureData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/latest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (response.ok){
      return response.json();
    }
    if (response.status === 404) {
      console.log("No value available");
      return null;
    }
  } catch (err) {
    throw Error("Response is not ok while fetching TempData latest");
  }
};

export const fetchTempDataById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw Error("Response is not ok while fetching TempData");
    return response.json();
  } catch (err) {
    console.error("Could not connect to API ", err);
    throw err;
  }
}


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


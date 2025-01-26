import Cookies from 'js-cookie'

const token = Cookies.get("token")

const BASE_URL = "http://localhost:8080/api/seuil";

export const setSeuil = async (Seuil) => {
  try {
    const response = await fetch(`${BASE_URL}/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Seuil),
    });

    if (!response.ok) throw Error("Could not set threshold");
    return await response.json();
  } catch (err) {
    console.error("Could not connect to API ", err);
    throw err;
  }
};

export const getSeuil = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw Error("Could not get threshold");
    return await response.json();
  } catch (err) {
    console.error("Could not connect to API ", err);
    throw err;
  }
};

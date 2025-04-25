
import Cookies from 'js-cookie'
const BASE_URL = "http://localhost:8080/api/brokers";

const token = Cookies.get("token");

export const fetchBrokers = async() => 
{

    try {
        const response = await fetch(`${BASE_URL}/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) 
          console.error("Response isn't okay while fetching Brokers");
    
        return await response.json();
      } catch (err) {
        console.error("Could not connect to the API");
        throw err;
      }    
}


export const fetchBrokerById =  async(id)=>
{

    try{
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw Error("Response isn't okay while fetching Broker");

    return await response.json();
  } catch (err) {
    console.error("Could not connect to the API");
    throw err;
  }
}




export const addTopic = async (topic) => {
  try {
    const response = await fetch(`${BASE_URL}/subscribe?topic=${topic}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      console.error("Response isn't okay while adding topic");
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error("Could not connect to the API");
  }
};



export const cb = async (ip, port) => {
  try {
    const response = await fetch(`${BASE_URL}/cb?ip=${ip}&port=${port}`, {
      method: "POST", // ⬅️ must be POST
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Response isn't okay while changing the Broker");
      return null;
    }

    return await response.text(); // or `response.json()` if your backend returns JSON
  } catch (err) {
    console.error("Could not connect to the API");
  }
};



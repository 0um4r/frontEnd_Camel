
import Cookies from 'js-cookie'
const BASE_URL = "http://localhost:8080/api/brokers";

const token = Cookies.get("token");

export const fetchBrokers = async() => 
{

    try {
        const response = await fetch(`${BASE_URL}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw Error("Response isn't okay while fetching Users");
    
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



export const cb = async(ip,port) =>{

        try {
            const response = await fetch(`${BASE_URL}/cb?ip=${ip}&&port=${port}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) throw Error("Response isn't okay cb failed");
        
            return await response.json();
          } catch (err) {
            console.error("Could not connect to the API");
          }
    }


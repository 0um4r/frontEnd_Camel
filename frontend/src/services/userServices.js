
import Cookies from 'js-cookie'
const BASE_URL = "http://localhost:8080/api/users";

const token = Cookies.get("token");

export const SigninUser = async (Credentials) => {
  /*This normally returns a token*/

  try {
    const response = await fetch(`${BASE_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Credentials),
    });

    if (!response.ok) {
      throw Error("Response is not OK Signing in");
    }

    return await response.json();
  } catch (err) {
    console.error("Could not connect to API", err);
    throw err;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`, {
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
};

export const fecthUserById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw Error("Response isn't Okat while fecthing user");
    return await response.json();
  } catch (err) {
    console.error("Could not connect to the API", err);
    throw err;
  }
};

export const fetchUserByEmail = async (email) => {
  try {
    const response = await fetch(
      `${BASE_URL}/filter/email?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Response isn't OK while fetching user");

    return await response.json();
  } catch (err) {
    console.error("Could not connect to the API", err);
    throw err;
  }
};

export const updateUser = async (id, newVersion) => {
  try {
    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newVersion),
    });

    if (!response.ok) throw Error("Response is not ok while updating user");

    return response.json();
  } catch (err) {
    console.error("Could not connect to API", err);
    throw err;
  }
};


export const createUser = async (User) =>
{

  try {
    const response = await fetch(`${BASE_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    });
    if (!response.ok) {
      throw new Error("Response isn't okay");
    }
    return await response.json();
  } catch (err) {
    console.error("Error could not connect to API", err);
    throw err;
  }

}

export const deletUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw Error("Response is not ok while deleting user");

    return response.json();
  } catch (err) {
    console.error("Could not connect to API", err);
    throw err;
  }
};

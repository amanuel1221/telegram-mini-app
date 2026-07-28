import { createContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  logout as logoutApi,
} from "../api/authApi";


export const AuthContext = createContext();


export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchUser = async () => {

    try {

      const response = await getCurrentUser();

      setUser(response.user);

      return response.user;

    } catch (error) {

      console.log(
        "Fetch user failed:",
        error.response?.data || error.message
      );

      setUser(null);

      return null;

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchUser();

  }, []);



  const refreshUser = async () => {

    return await fetchUser();

  };



  const logout = async () => {

  try {

    await logoutApi();

  } catch(error){

    console.log(error);

  } finally {

    setUser(null);

    window.location.href = "/login";

  }

};


  return (

    <AuthContext.Provider

      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}

    >

      {children}

    </AuthContext.Provider>

  );

}
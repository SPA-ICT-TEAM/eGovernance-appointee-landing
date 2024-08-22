// src/context/UserContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [advisers, setAdvisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvisers = async () => {
      try {
        const response = await axios.get('https://v2-appointees.enugustate.gov.ng/api/appointee/index');
        console.log(response.data);
        setAdvisers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisers();
  }, []);

  return (
    <UserContext.Provider value={{ advisers, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

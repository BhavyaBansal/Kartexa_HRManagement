// SessionContext.js
import React, {createContext, useState, useEffect} from 'react';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

const SessionContext = createContext();

const SessionProvider = ({children}) => {
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    // Retrieve session token from storage on app start
    AsyncStorage.getItem('sessionToken')
      .then(token => {
        if (token) {
          setSessionToken(token);
        }
      })
      .catch(error => {
        console.error('Error retrieving session token:', error);
      });
  }, []);

  const login = token => {
    // Store the session token in AsyncStorage and update the session state
    AsyncStorage.setItem('sessionToken', token)
      .then(() => {
        setSessionToken(token);
      })
      .catch(error => {
        console.error('Error storing session token:', error);
      });
  };

  const logout = () => {
    // Clear the session token from AsyncStorage and update the session state
    AsyncStorage.removeItem('sessionToken')
      .then(() => {
        setSessionToken(null);
      })
      .catch(error => {
        console.error('Error removing session token:', error);
      });
  };

  const sessionContextValue = {
    sessionToken,
    login,
    logout,
  };

  return (
    <SessionContext.Provider value={sessionContextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export {SessionContext, SessionProvider};

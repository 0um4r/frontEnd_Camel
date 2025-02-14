import React, { createContext, useState } from "react";

export const BrokerContext = createContext();

export const BrokerProvider = ({ children }) => {
  const [brokers, setBrokers] = useState([
    { id: 1, ip: "192.168.1.1", port: "8080", tempAlerts: 13, humAlerts: 15 },
    { id: 2, ip: "192.168.1.2", port: "8081", tempAlerts: 31, humAlerts: 12 },
  ]);

  const addBroker = (newBroker) => {
    setBrokers([...brokers, { ...newBroker, tempAlerts: 0, humAlerts: 0 }]);
  };

  return (
    <BrokerContext.Provider value={{ brokers, addBroker }}>
      {children}
    </BrokerContext.Provider>
  );
};
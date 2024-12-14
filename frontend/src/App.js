import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Signup

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default App;

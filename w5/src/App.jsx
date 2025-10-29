import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Products from "./components/Products";
import User from "./components/User";
import Quotes from "./components/Quotes";

function App() {
  return (
    <>
      <div className="text-lg">DashBoard</div>
      <Products />
      <User />
      <Quotes />
    </>
  );
}

export default App;

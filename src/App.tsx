import React from "react";
import { Router } from "./Router";
import { UserProvider } from "./modules/shared/user.context";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router />
      </div>
    </UserProvider>
  );
}

export default App;

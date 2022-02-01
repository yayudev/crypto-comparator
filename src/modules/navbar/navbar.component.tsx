import React, { useContext } from "react";
import { UserContext } from "../shared/user.context";
import "./navbar.styles.css";

export function Navbar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar-user">
        {user && (
          <div className="navbar-user-info">
            <span className="navbar-user-name">
              <span>Logged in as </span>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </span>

            <button
              className="navbar-user-logout-button"
              onClick={() => setUser(null)}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

import { createContext, useEffect, useState, ReactNode } from "react";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export const UserContext = createContext({
  user: null as User | null,
  setUser: (user: User | null) => {},
});

/**
 * Custom context provider for the user so we can store it using local storage.
 */
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem("user");

    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
  }, []);

  function updateUser(user: User | null) {
    window.localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

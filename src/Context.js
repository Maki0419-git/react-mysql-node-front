import { createContext } from "react";



export const userStatus = {
    isSignIn: false,
    progress: "register",
}



export const Context = createContext({
    userStatus,
    setUserStatus: (newStatus) => {
        this.userStatus = newStatus;
    },
});
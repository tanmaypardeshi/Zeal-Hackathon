import React, {useState, createContext} from 'react';
const {Provider, Consumer} = createContext();

export const AuthContextProvider = props => {
    const [authStat, setAuthStat] = useState({
        signedIn: false,
        username: null
    });

    var setAuth;

    return (
        <Provider value = {[authStat, setAuth]}>
            {props.children}
        </Provider>
    )
}
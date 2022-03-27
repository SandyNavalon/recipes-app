import React, { useReducer } from 'react';
import { initialState, AuthReducer } from './reducer';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuthState debe utilizarse dentro de un AuthProvider");
    }
    return context;
}


export function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch debe utilizarse dentro de un AuthProvider");
    }

    return context;
}


// Context/context.js

export const AuthProvider = ({ children }) => {
    /**use reducer devuelve user como estado y dispatch como método para alterar ese estado con cambios y actualizaciones */
    const [user, dispatch] = useReducer(AuthReducer, initialState);

    return (
        //aqui pasamos el usuario como valor
        <AuthStateContext.Provider value={user}>
            {/*aquí pasamos el método de envío*/}
            <AuthDispatchContext.Provider value={dispatch}>
                {/**lo cual significa que tanto user como método de envío serán accesibles para cualquier hijo que use AuthProvider
                 * authProvider está llamado en app.jsx (que será el children) con lo cual todo lo que vaya dentro tendrá este user
                 *  y método de envío.
                 */}
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
import routes from "components/navigation/routes";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { localSource } from "../../core/data/source/local.source";
type AuthenticationProviderProps = {
    children: ReactNode
}

type AuthenticationContextValue = {
    isAuthenticated: boolean,
    setAuthenticated: (isAuthenticated: boolean) => void,
    logout: () => void
}

const AuthenticationContext = createContext({

} as AuthenticationContextValue);

export function useAuthentication() {
    return useContext(AuthenticationContext)
}

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {

    const [isAuthenticated, setAuthenticated] = useState<boolean>(localSource.getToken() != null);
    const history = useHistory()

    function logout() {
        setAuthenticated(false);
        localSource.logout();
        console.log("logout now");
        
        history.replace(routes.LOGIN);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            return
        }

    }, [isAuthenticated])

    global.logout = logout;

    return (
        <AuthenticationContext.Provider value={{
            isAuthenticated,
            setAuthenticated,
            logout,
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}


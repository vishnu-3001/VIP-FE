import { createContext } from "react";
import { useState } from "react";
const AuthContext=createContext(
    {
        token:'',
        login:()=>{},
        logout:()=>{}
    }
)
export function AuthProvider({children}){
    const[Token,setToken]=useState(sessionStorage.getItem('token')||'');
    function login(newToken){
        sessionStorage.setItem('token',newToken);
        setToken(newToken);
    }
    function logout(){
        sessionStorage.removeItem('token');
        setToken('');
    }
    const value={
        token:Token,
        login:login,
        logout:logout
    }
    return(
        <AuthContext value={value}>
            {children}
        </AuthContext>
    )
}
export default AuthContext
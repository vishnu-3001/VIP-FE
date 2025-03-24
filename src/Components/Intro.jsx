import { Outlet,useNavigate } from "react-router-dom"
import { useEffect } from "react";
export default function Intro(){
    const navigate=useNavigate();
    useEffect(()=>{
        const token=sessionStorage.getItem('token');
        if(!token){
            navigate('/Login')
        }
        else{
            navigate('/DocumentFetch')
        }
    },[navigate])
    return(
        <div>
            <p>Welcome to the app</p>
            <Outlet></Outlet>
        </div>
    )
}
import { createContext } from "react";
import { useState } from "react";
const DocumentContext=createContext({
    document:{},
    userChoice:'',
    setChoice:()=>{},
    setDocument:()=>{}
});
export function  DocumentProvider({children}){
    const[view,setView]=useState('original');
    const [doc,setDoc]=useState({
        original:'',
        enhanced:[]
    })
    function setUserView(selectedView){
        setView(selectedView);
    }
    function setDocument(data){
        setDoc(prev=>({
            ...prev,
            original:data.original,enhanced:data.enhanced
        }))
    }
    const value={
        document:doc,
        userChoice:view,
        setChoice:setUserView,
        setDocument
    }
    return(
        <DocumentContext value={value}>
            {children}
        </DocumentContext>
    )
    
}
export default DocumentContext
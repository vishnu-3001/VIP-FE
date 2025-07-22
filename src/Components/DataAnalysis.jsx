import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect,useContext, useState } from "react";
import classes from "./Analysis.module.css"
import DocumentContext from "../Store/DocumentContext";
import YearMonthAnalysis from "./YearMonthAnalysis";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function DataAnalysis(){
    const documentCtx=useContext(DocumentContext);
    const {doc_id}=documentCtx;
    const beUrl=process.env.REACT_APP_BE_URL;
    const[data,setData]=useState();
    useEffect(()=>{
        const url=beUrl+"api/v1/analysis/date_analysis?file_id="+doc_id;
        async function fetchData(){
            try{
                const response=await fetch(url,{
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                if(!response.ok){
                    throw new Error("An error occurred while fetching data");
                }
                const data=await response.json();
                setData(data);
            }catch(error){
                console.error("Error fetching data:",error);
            }
        }
        fetchData()
    },[])
    return (
            <div>
                <YearMonthAnalysis data={data} />
            </div>
    );
}




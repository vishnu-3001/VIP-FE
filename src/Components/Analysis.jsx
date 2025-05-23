import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect,useContext, useState } from "react";
import classes from "./Analysis.module.css"
import DocumentContext from "../Store/DocumentContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio:false,
    aspectRatio:2,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Monthly Sales Analysis",
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data2 = {
    labels,
    datasets: [
        {
            label: 'Product A',
            data: [300, 500, 700, 400, 600, 800, 750],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Product B',
            data: [200, 400, 450, 300, 500, 700, 680],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function Analysis() {
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
                console.log(data)
                setData(data);
            }catch(error){
                console.error("Error fetching data:",error);
            }
        }
        fetchData()
    },[])
    function handleCheckboxChange(event) {
        const isChecked = event.target.checked;
        // console.log("Checkbox is checked:", isChecked);
        console.log(event.target.value);
    }
    return (
        <div>
                    <div className={classes.graphContainer}>
            <div>
                <Bar options={options} data={data2} width={"600px"} height={"300px"}/>
            </div>
            <div className={classes.filterContainer}>
                <h3>
                    Time
                </h3>
                <label>
                    <input type="checkbox" id="year" onChange={handleCheckboxChange} value="year"></input>
                    Year
                </label>
                <label>
                    <input type="checkbox" id="year" onChange={handleCheckboxChange} value="year"></input>
                    Month
                </label>
            </div>
            <div className={classes.filterContainer}>
                <h3>
                    Type
                </h3>
                <label>
                    <input type="checkbox" id="year" onChange={handleCheckboxChange} value="year"></input>
                    Project update
                </label>
                <label>
                    <input type="checkbox" id="year" onChange={handleCheckboxChange} value="year"></input>
                    Meeting notes
                </label>
                <label>
                    <input type="checkbox" id="year" onChange={handleCheckboxChange} value="year"></input>
                    Todo
                </label>
                <label>
                    <input type="checkbox" id="year" onChange={handleCheckboxChange} value="year"></input>
                    Feedback
                </label>
            </div>
        </div>
            <div>
                <h3>AI Comment</h3>
                {
                    data && <p>{data.report}</p>
                }
            </div>
            <div>
                <textarea rows="4" cols="50" placeholder="Ask for more detailes here"></textarea>
                <button className="drive-button">Ask</button>
            </div>
        </div>
    );
}



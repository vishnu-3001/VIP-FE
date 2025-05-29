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

// export const options = {
//     responsive: true,
//     maintainAspectRatio:false,
//     aspectRatio:2,
//     plugins: {
//         legend: {
//             position: "top",
//         },
//     },
// };




export default function Analysis() {
    const documentCtx=useContext(DocumentContext);
    const {doc_id}=documentCtx;
    const beUrl=process.env.REACT_APP_BE_URL;
    const[data,setData]=useState();
    const[checked,setChecked]=useState('year');
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
                const processed_data=processData(data);
                console.log(processed_data);
                setData(processed_data);
            }catch(error){
                console.error("Error fetching data:",error);
            }
        }
        function processData(data) {
            const yearly_data = data.yearly_data;
            const monthly_data = data.monthly_data;
            const colorMap = {
                "project-update": "#d6eaf8",
                "meeting-notes": "#e8daef",
                "todo": "#ffdab9",
                "feedback": "#fffacd",
                "other": "#d5f5e3"
            };
            const yearlabelSet = new Set();
            const monthlabelSet=new Set();
            Object.values(yearly_data).forEach(entry =>
                Object.keys(entry).forEach(label => yearlabelSet.add(label))
            );
            Object.values(monthly_data).forEach(entry =>
                Object.keys(entry).forEach(label => monthlabelSet.add(label))
            );
            const labels = Array.from(yearlabelSet); 
            const xKeys = Object.keys(yearly_data).sort();
            const datasets = labels.map(label => ({
                label: label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
                data: xKeys.map(year => yearly_data[year]?.[label] || 0),
                backgroundColor: colorMap[label] || "rgba(200, 200, 200, 0.5)" 
            }));
            const monthLabels=Array.from(monthlabelSet);
            const xMonthKeys=Object.keys(monthly_data).sort();
            const monthDatasets = monthLabels.map(label => ({
                label: label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                data: xMonthKeys.map(month => monthly_data[month]?.[label] || 0),
                backgroundColor: colorMap[label] || "rgba(200, 200, 200, 0.5)"
            }));
            const final_data={
                        yearly_data:{labels:xKeys,datasets:datasets},
                        monthly_data:{labels:xMonthKeys,datasets:monthDatasets},
                        report:data.report
                    }
            return final_data;
        }
        fetchData()
    },[])
    function handleCheckboxChange(event) {
        setChecked(event.target.value);
        console.log(event.target.value);
    }
    return (
        <div>
                    <div className={classes.graphContainer}>
            {data&&<div>
                {
                    checked === "year" ? <h2>Yearly Analysis</h2> : <h2>Monthly Analysis</h2>
                }
                {
                    checked === "year"?<Bar data={data.yearly_data} width={"600px"} height={"300px"}/>:<Bar data={data.monthly_data} width={"600px"} height={"300px"}></Bar>

                }
            </div>}
            <div className={classes.filterContainer}>
                <h3>
                    Time
                </h3>
                <label>
                    <input type="radio" id="year" onChange={handleCheckboxChange} value="year" name="time" defaultChecked></input>
                    Year
                </label>
                <label>
                    <input type="radio" id="year" onChange={handleCheckboxChange} value="month" name="time"></input>
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



import { useState } from "react";
import { Bar } from "react-chartjs-2";
import classes from "./yearMonthAnalysis.module.css"
export default function YearMonthAnalysis(props) {
    const [checked, setChecked] = useState('year');
    if (!props.data) {
        return <div>Loading...</div>;
    }

    function processData() {
        const { yearly_data = {}, monthly_data = {}, semester_data = {}, quarterly_data = {} } = props.data || {};
    
        const colorMap = {
            "project-update": "#d6eaf8",
            "meeting-notes": "#e8daef",
            "todo": "#ffdab9",
            "feedback": "#fffacd",
            "other": "#d5f5e3"
        };
    
        function extractLabels(data) {
            const labelSet = new Set();
            Object.values(data).forEach(entry =>
                Object.keys(entry || {}).forEach(label => labelSet.add(label))
            );
            return Array.from(labelSet);
        }
    
        function createDatasets(data, labels, xKeys) {
            return labels.map(label => ({
                label: label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                data: xKeys.map(x => (data[x]?.[label]) || 0),
                backgroundColor: colorMap[label] || "rgba(200, 200, 200, 0.5)"
            }));
        }
    
        function prepareDataBlock(timeData) {
            const labels = extractLabels(timeData);
            const xKeys = Object.keys(timeData).sort();
            const datasets = createDatasets(timeData, labels, xKeys);
            return { labels: xKeys, datasets };
        }
    
        return {
            yearly_data: prepareDataBlock(yearly_data),
            monthly_data: prepareDataBlock(monthly_data),
            semester_data: prepareDataBlock(semester_data),
            quarterly_data: prepareDataBlock(quarterly_data),
        };
    }
    function processSummaryData(summaryData) {
        const colorMap = {
            "project-update": "#d6eaf8",
            "meeting-notes": "#e8daef",
            "todo": "#ffdab9",
            "feedback": "#fffacd",
            "other": "#d5f5e3"
        };
    
        function prettifyLabel(label) {
            return label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
    
        const labels = ["Summary"];  // Single category on x-axis
    
        const datasets = Object.keys(summaryData).map(label => ({
            label: prettifyLabel(label),
            data: [summaryData[label]],  // Single value per dataset
            backgroundColor: colorMap[label] || "rgba(200, 200, 200, 0.5)"
        }));
    
        return { labels, datasets };
    }
    
    

    function handleCheckboxChange(event) {
        setChecked(event.target.value);
    }

    const processedData = processData();
    const processedSummaryData = processSummaryData(props.data?.component_data || {});

    return (
        <div className={classes.graphContainer}>
            {checked === "year" && <h2>Yearly Analysis</h2>}
            {checked === "month" && <h2>Monthly Analysis</h2>}
            {checked === "semester" && <h2>Semsester wise Analysis</h2>}
            {checked === "quarterly" && <h2>Quarterly Analysis</h2>}
            {checked === "summary" && <h2>Summary</h2>}
            <div className={classes.chartAndFilter}>
                <div className={classes.chartWrapper}>
                    {checked === "year" &&
                        <Bar data={processedData.yearly_data} options={{ responsive: true, maintainAspectRatio: false }} /> 
                    }
                    {checked === "month" &&
                        <Bar data={processedData.yearly_data} options={{ responsive: true, maintainAspectRatio: false }} /> 
                    }
                    {checked === "semester" &&
                        <Bar data={processedData.semester_data} options={{ responsive: true, maintainAspectRatio: false }} /> 
                    }
                    {checked === "quarterly" &&
                        <Bar data={processedData.quarterly_data} options={{ responsive: true, maintainAspectRatio: false }} /> 
                    }
                    {checked === "summary" &&
                        <Bar data={processedSummaryData} options={{ responsive: true, maintainAspectRatio: false }} /> 
                    }
                </div>
                <div className={classes.filterContainer}>
                    <h3>Filters</h3>
                    <label htmlFor="year">
                        <input type="radio" id="year" value="year" onChange={handleCheckboxChange} name="time" defaultChecked />
                        Year
                    </label>
                    <label htmlFor="month">
                        <input type="radio" id="month" value="month" onChange={handleCheckboxChange} name="time" />
                        Month
                    </label>
                    <label htmlFor="semester">
                        <input type="radio" id="semester" value="semester" onChange={handleCheckboxChange} name="time" />
                        Semester
                    </label>
                    <label htmlFor="quarterly">
                        <input type="radio" id="quarterly" value="quarterly" onChange={handleCheckboxChange} name="time" />
                        Quarter
                    </label>
                    <label htmlFor="summary">
                        <input type="radio" id="summary" value="summary" onChange={handleCheckboxChange} name="time" />
                        Summary
                    </label>
                </div>
            </div>
        </div>
    );
}

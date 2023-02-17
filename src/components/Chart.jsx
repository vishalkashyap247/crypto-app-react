import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const Chart = ({arr=[], currency, days}) => {
    const prices=[];
    const date=[];
    
    // console.log("aur array is : ", arr);
    for (let i = 0; i < arr.length; i++) {
        if(days === "1"){
            date.push(new Date(arr[i][0]).toLocaleTimeString());
        }
        else{
            date.push(new Date(arr[i][0]).toLocaleDateString());
        }
        prices.push(arr[i][1]);
    }

    const data = {
        labels:date,
        datasets:[{
            label:`Prices in ${currency}`,
            data:prices,
            borderColor:"rgb(255,99,132)",
            backgroundColor:"rgba(255,99,132,0.5)"
        }]
    }

     //(<Line options={{responsive:true, maintainAspectRatio: false}} data={data} style={{height: "400px"}} />)
    return (<Line 
    options={{responsive:true, maintainAspectRatio: false}} 
    data={data} 
    style={{height: '400px', '@media (maxWidth: 767px)': {height: '300px'}}} 
/>)
}

export default Chart
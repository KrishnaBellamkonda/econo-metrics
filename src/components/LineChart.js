import react from 'react';
import {Line} from 'react-chartjs-2'

const LineChart = (props)=>{

    let gdp_series = [...props.state["gdp_series"]];
    const ai_prediction = props.state["gdp_prediction"];
    console.log("GDP series", gdp_series)

    const complete_series = gdp_series.push(ai_prediction);

    const data = {
        labels:[2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, "AI pred for 2020"],
        datasets: [
            {
                label: props.countryName,
                data: gdp_series,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth:1, 
                backgroundColor: [
                    "#D9D5D8",
                    "#D9D5D8",
                    "#D9D5D8",
                    "#D9D5D8",
                    "#D9D5D8",
                    "#D9D5D8",
                    "#D9D5D8",
                    "#D9D5D8",
                    "#94B99A",
                ]

            }, 



        
        ]

    }

    return (
       <Line  
       data = {data}
       
       />
    )
}

export default LineChart;
import React from 'react';
import {Doughnut} from 'react-chartjs-2';


// Utility 

const argSort = (arr1, arr2) => arr1
    .map((item, index) => [arr2[index], item]) // add the args to sort by
    .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
    .map(([, item]) => item);



const DoughnutChart = (props)=>{

    // Getting the Props 
    const indicatorNames = props.indicatorNames;
    const state = props.state;

    const dataArray = [];
    Object.keys(state).forEach((item)=>{
        dataArray.push(state[item])
    })

    // MOdification => Remoing the usage of indicatorNames
    const labelsArray = [];
    Object.keys(state).forEach((item)=>{
        labelsArray.push(item)
    })
    
    const sortedLabelsArray = argSort(labelsArray, dataArray);
    const sortedDataArray = argSort(dataArray, dataArray)
    
    // Colors
    let backgroundColor, color;
    if(props.settings){
        backgroundColor = props.settings.backgroundColor? props.settings.backgroundColor:'rgba(75,192,192,1)';
        color = props.settings.color?props.settings.color: 'rgba(0, 0, 0, 0.1)'
        }

    // Color family 
    const colorFamily = ["#770F88","#862A95","#9544A2","#A45FB0","#B37ABD","#C394CA","#D2AFD7","#E1CAE5","#F0E4F2","#FFFFFF"]

    // Data 
    const data  = {
        labels: sortedLabelsArray,
        datasets:[
            {
            label:props.indicatorName,  // Give Country Name
            data: sortedDataArray,
            backgroundColor: colorFamily,
            // borderColor: 'rgba(0,0,0,1)',
            borderWidth:1
        }, 
    
    ]
    }

    // Options
    const options = {
        scales:{
            y: {beginAtZero: true}

        },
        maintainAspectRatio:true

    }


    return (

        <Doughnut 
        data = {data}
        options = {options}
        />
    )
}

export default DoughnutChart
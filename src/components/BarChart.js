import React from 'react';
import {Bar} from 'react-chartjs-2';


const BarChart= (props)=>{

    // Getting the Props 
    const indicatorNames = props.indicatorNames;
    const state = props.state;
    const worldState = props.worldState;

    // console.log(worldState)

    const labelsArray = [];
    Object.keys(state).forEach((item)=>{
        labelsArray.push(indicatorNames[item])
    })
    
    const dataArray = [];
    Object.keys(state).forEach((item)=>{
        dataArray.push(state[item])
    })

    // Colors
    let backgroundColor, color, optionsObject;
    if(props.settings){
        backgroundColor = props.settings.backgroundColor? props.settings.backgroundColor:'rgba(75,192,192,1)';
        color = props.settings.color?props.settings.color: 'rgba(0, 0, 0, 0.1)';
        // Using the Color value to change the color of ticks
        optionsObject  = {
           scales: {
            y:{
                beginAtZero: true,
                ticks: {
                    color:color
                }
            }, 

            x: {
                ticks: {
                    color:color
                }
            }

            },

            plugins:{

                legend: {
                    labels:{
                        color:color
                    }
                    
                }
            }
            
            

        }    
    }

    // The Data prop for the Bar Chart
    const data  = {
        labels: labelsArray,
        datasets:[
            {
            label:props.countryName,  // Give Country Name
            data: dataArray,
            backgroundColor: backgroundColor,
            borderColor: 'rgba(0,0,0,1)',
            color:color,
            borderWidth:1
        }, 
    
    ]
    }




    // If world is true then add the world Query Parameters
    if (props.world){

        if(props.type === 'trade'){
            Object.keys(worldState).forEach((key)=>{
                worldState[key] = worldState[key]/216
            })
        }

        const worldDataArray = []
        Object.keys(worldState).forEach((item)=>{
            worldDataArray.push(worldState[item])
        })

        const worldDataset =  {
                label:"World Average",
                data:worldDataArray,
                backgroundColor:'rgba(85, 150, 97, 0.6)',
                borderColor:"rgba(0, 0, 0, 1)",
                borderWidth: 1
            }

            data.datasets.push(worldDataset)
    }



    // Options prop for the Bar Chart
    const options = {
        scales:{
            y: {
                beginAtZero: true,
                
            }, 


        },

        

    }

    // Plugins
 

    return (
        <Bar 
        data = {data}
        options = {props.settings?optionsObject:options}

        />
    )

}


export default BarChart
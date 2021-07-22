import React from 'react'
import DoughnutChart from './DoughnutChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// Utility Visualization 
const argSort = (arr1, arr2) => arr1
    .map((item, index) => [arr2[index], item]) // add the args to sort by
    .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
    .map(([, item]) => item);

function sortWithIndeces(toSort) {
  for (var i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort(function(left, right) {
    return left[0] < right[0] ? -1 : 1;
  });
  toSort.sortIndices = [];
  for (var j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
  }
  return toSort;
}

const dsu = (arr1, arr2) => arr1
  .map((item, index) => [arr2[index], item]) // add the args to sort by
  .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
  .map(([, item]) => item); // extract the sorted items


const MapVisualization = (props)=>{

    // Get the data 
    const state = props.state
    const indicatorName = props.indicatorName
    const vizId = props.id;

    let doughnutChartState = {};
    // Aggregating and sorting the data 
    if(Object.keys(state).length){
        const valuesArray = state.slice(1, )
        const countries = valuesArray.map((item, index)=>{
            return (item[0]) 
        })
        const values = valuesArray.map((item, index)=>{
            return (item[1])
        })

        const sortCountries = dsu(countries, values)
        const sortedValues = dsu(values, values)

        sortCountries.slice(0, 9).forEach((country, index)=>{
            doughnutChartState[country] = sortedValues[index]
        })

        console.log(doughnutChartState)
    // console.log(indicatorName, sortCountries)
    // Convert data into top three and others 
}
    

    // Conditional REndering 
    function renderViz(isTrue){
        if(isTrue){
            return (
                <DoughnutChart 
                    state = {doughnutChartState}
                />
            )
        }
        return <p>Loading</p>
    }

    return (

    <div class="doughnut-viz" id={vizId}>
        <h4>{indicatorName}</h4>
        <DoughnutChart
        state = {doughnutChartState}
        indicatorName = {props.indicatorName}
        />
    </div>
  
        
    )
}


export default MapVisualization;
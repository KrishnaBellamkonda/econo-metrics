import React from 'react';
import {useReducer, useMemo, useEffect, useState} from 'react';
import axios from 'axios';

// Importing the preprocessing data
import PREPROCESSING_DATA from './preprocessing_data/preprocessing_data.json'

//Import the One Country Results Components
import OneCountryResults from './OneCountryResults';

// Import the required Arrays and Objects
import codeToCountryName from "./arrays/COUNTRIES_ONLY_CODE_TO_NAME.json"
import indicatorNames from "./arrays/ONE_COUNTRY_INDICATOR_NAMES.json"


// One Country Fetch Function 
import * as queryFunctions from './functions/finalQueries'


// Defining the preprocessing constants
const mean  = PREPROCESSING_DATA["mean"];
const std = PREPROCESSING_DATA["std"];


const countries = Object.values(codeToCountryName);
const countriesIds = Object.keys(codeToCountryName);

const indicators = Object.keys(indicatorNames);
const indicatorIds = Object.values(indicatorNames)


// ACTIONS
const ACTIONS = {
    yearChange:"year",
    countryChange:"country",
    indicatorChange:"indicator", 

    co2:"EN.ATM.CO2E.KT",
    inflation:"FP.CPI.TOTL.ZG", 
    gdp:"NY.GDP.MKTP.CD", 
    gdpPerCapita:"NY.GDP.PCAP.CD", 
    gdpPerCapitaPPP:"NY.GDP.PCAP.PP.CD", 
    gniPerCapita:"NY.GNP.PCAP.PP.CD", 
    lifeExpectancy:"SP.DYN.LE00.IN", 
    imports:"NE.IMP.GNFS.CD", 
    exports:"NE.EXP.GNFS.CD",
    nan:"nan",

    gdp_series:"gdp_series",
    gdp_prediction:"gdp_prediction"
    


}

// Reducer
function reducer(state, action){
    switch(action.type){
        case ACTIONS.yearChange:
            return yearChangeHandler(state, action)
        case ACTIONS.indicatorChange:
            return indicatorChangeHandler(state, action)
        case ACTIONS.countryChange:
            return countryChangeHandler(state, action)
        default:
            break
        }
}

function queryReducer(state, action){
    switch(action.type){
        case ACTIONS.co2:
            return queryChangeHandler(state, action)
        case ACTIONS.inflation:
            return queryChangeHandler(state, action)
        case ACTIONS.gdp:
            return queryChangeHandler(state, action)
        case ACTIONS.gdpPerCapita:
            return queryChangeHandler(state, action)
        case ACTIONS.gdpPerCapitaPPP:
            return queryChangeHandler(state, action)
        case ACTIONS.gniPerCapita:
            return queryChangeHandler(state, action)
        case ACTIONS.lifeExpectancy:
            return queryChangeHandler(state, action)
        case ACTIONS.imports:
            return queryChangeHandler(state, action)
        case ACTIONS.exports:
            return queryChangeHandler(state, action)
        case ACTIONS.nan:
            return queryNanHandler(state, action)
        case ACTIONS.gdp_series:
            return queryAIHandler(state, action)
        case ACTIONS.gdp_prediction:
            return queryChangeHandler(state, action)
        default: 
            return state
    }
}

function worldQueryReducer(state, action){
    switch(action.type){
        case ACTIONS.co2:
            return queryChangeHandler(state, action)
        case ACTIONS.inflation:
            return queryChangeHandler(state, action)
        case ACTIONS.gdp:
            return queryChangeHandler(state, action)
        case ACTIONS.gdpPerCapita:
            return queryChangeHandler(state, action)
        case ACTIONS.gdpPerCapitaPPP:
            return queryChangeHandler(state, action)
        case ACTIONS.gniPerCapita:
            return queryChangeHandler(state, action)
        case ACTIONS.lifeExpectancy:
            return queryChangeHandler(state, action)
        case ACTIONS.imports:
            return queryChangeHandler(state, action)
        case ACTIONS.exports:
            return queryChangeHandler(state, action)
        case ACTIONS.nan:
            return queryNanHandler(state, action)
        default: 
            return state
    }  
}

// Handlers 
function yearChangeHandler(state, action){
    let newState = {...state, year:action.payload.value}; 
    return newState
}

function indicatorChangeHandler(state, action){
    let newState = {...state, indicator:action.payload.value}; 
    return newState
}

function countryChangeHandler(state, action){
    let newState = {...state, country:action.payload.value}; 
    return newState
}

function queryChangeHandler(state, action){
    let newState = {...state};
    newState[action.type] = action.payload.value
    return newState
}

function queryNanHandler(state, action){
    let newState = {...state}
    newState[action.type] = "";
    return newState
}

function queryAIHandler(state, action){
    let newState = {...state};
    newState[action.type] = action.payload.value;
    return newState
}

// Initial State 
const INITIAL_STATE  = {
    country:"AFG",
    indicator:"FP.CPI.TOTL.ZG",
    year:"2019"
}

const QUERY_INITIAL_STATE = {

    "EN.ATM.CO2E.KT":"", 
    "FP.CPI.TOTL.ZG":"",
    "NY.GDP.MKTP.CD":"",
    "NY.GDP.PCAP.CD":"",
    "NY.GDP.PCAP.PP.CD":"",
    "NY.GNP.PCAP.PP.CD":"",
    "SP.DYN.LE00.IN":"",
    "NE.IMP.GNFS.CD":"",
    "NE.EXP.GNFS.CD":"",

    "gdp_series":"",
    "gdp_prediction":"",

}

const WORLD_QUERY_INITIAL_STATE = {
    "EN.ATM.CO2E.KT":"", 
    "FP.CPI.TOTL.ZG":"",
    "NY.GDP.MKTP.CD":"",
    "NY.GDP.PCAP.CD":"",
    "NY.GDP.PCAP.PP.CD":"",
    "NY.GNP.PCAP.PP.CD":"",
    "SP.DYN.LE00.IN":"",
    "NE.IMP.GNFS.CD":"",
    "NE.EXP.GNFS.CD":""
}

// State
// Could Use Refs to Solve the problem of changing State without
// Clicking Submit

// AI preprocessing functions
// Functions
async function makeAIModelRequest(inputs){
    const URL = "http://localhost:8501/v1/models/gdp_model_building_2:predict"; 
    const input_object = {
        "instances":inputs
    }
    
    try {const response = await axios.post(URL, input_object);
    const response_data = await response.data;
    console.log(response_data)
    return response_data
    
    } catch(err){
        console.log(err)
    }

}

// Use CORS
async function makeAIModelRequestFetch(inputs){
    const URL = "/v1/models/gdp_model_building_2:predict"; 
    const input_object = {
        "instances":inputs
    }
    
    const post_object  = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        //"Access-Control-Allow-Origin":"*",
        
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(input_object) // body data type must match "Content-Type" header
      }
    
    const response =  await fetch(URL, post_object)
                    .then(res=>res.json())

    return response
}


function preprocessingAIInput(values){
    // Reverse the values
    const reverse_values = values.reverse();
    // Preprocessing the values
    const preprocessed_values = values.map((values)=>{
        return ((values-mean)/std)
    })
    // Increase a dimension 
    const preprocessed_values_in_dims = preprocessed_values.map((input)=>{
        return ([input])
    })
    return [preprocessed_values_in_dims]
}

function preprocessingOutputs(prediction_object){
    const prediction_value = prediction_object["predictions"][0][0];
    return ((prediction_value*std)+mean)
}


const OneCountry = ()=>{

    const [formState, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [queryState, queryDispatch] = useReducer(queryReducer, QUERY_INITIAL_STATE);
    const [worldQueryState, worldQueryDispatch] = useReducer(worldQueryReducer, WORLD_QUERY_INITIAL_STATE)    

    useEffect(()=>{console.log(queryState[ACTIONS.gdp])}, [queryState])

    // Memoizing formState
    // useMemo(()=>{console.log("SAme")}, [formState])



    // country Query Handler 
    function oneCountrySection(countries_list, date_list = [2019]){
    
        // Controls 
        const indicators_list = ["FP.CPI.TOTL.ZG", "NY.GDP.MKTP.CD", "NY.GDP.PCAP.CD", "NY.GDP.PCAP.PP.CD", "NY.GNP.PCAP.PP.CD", "SP.DYN.LE00.IN",  "NE.IMP.GNFS.CD", "NE.EXP.GNFS.CD"];
        const indicator_names_list = ["Inflation", "GDP", "GDP per Capita", "GDP per capita PPP", "GNI per capita PPP", "life expectancy",  "imports", "exports"]
        const world_list = ["WLD"]
        // const date_list = [2019];
        
        const apiQuery = queryFunctions.createCompleteQuery(countries_list, indicators_list, date_list);
        const countrySectionResults = queryFunctions.getAggregatedData(apiQuery)
        .then(results =>{
            const filteredResults = queryFunctions.filterRegionAPIResponse(results);
            const {allValues, allIds} = queryFunctions.dataExtraction(filteredResults, indicators_list);
            allValues.forEach((item, index)=>{
                // console.log(indicator_names_list[index]);
                // console.log("Length:", allIds[index].length);
                // console.log("Value:", item)
                // console.log("\n")
                if(item[0]){
                    console.log(indicator_names_list[index])
                    queryDispatch({type:indicators_list[index], payload:{value:item[0]}})
                } else {
                    queryDispatch({type:ACTIONS.nan})
                }
            })
        
            
        })
        
        const co2Query = queryFunctions.createCompleteQuery(countries_list, ["EN.ATM.CO2E.KT"], [2016]);
        const countryCO2Aggregator = queryFunctions.getAggregatedData(co2Query)
        .then(co2_results => {
            const filteredCO2 = queryFunctions.filterRegionAPIResponse(co2_results);
            const {values, ids} = queryFunctions.dataExtraction(filteredCO2);
            // console.log("\n")
            // console.log("CO2 Emissions")
            // console.log("Length:", values.length);
            // console.log("Length:", values)
            // console.log("\n")
            if(values[0]) {
                console.log("CO2 emissions received")
                queryDispatch({type:ACTIONS.co2, payload:{value:values[0]}}) 
            } else {
                queryDispatch({type:ACTIONS.nan})
            }

        
        
        })

        // World Query 
        const workdApiQuery = queryFunctions.createCompleteQuery(world_list, indicators_list, date_list);
        const worldSectionResults = queryFunctions.getAggregatedData(workdApiQuery)

        .then(results =>{
            const filteredResults = queryFunctions.filterRegionAPIResponse(results);
            const {allValues, allIds} = queryFunctions.dataExtraction(filteredResults, indicators_list);
            allValues.forEach((item, index)=>{
                // console.log(indicator_names_list[index]);
                // console.log("Length:", allIds[index].length);
                // console.log("Value:", item)
                // console.log("\n")
                if(item[0]){
                    console.log(indicator_names_list[index])
                    worldQueryDispatch({type:indicators_list[index], payload:{value:item[0]}})
                } else {
                    worldQueryDispatch({type:ACTIONS.nan})
                }
            })
        
            
        })
        
        const worldCo2Query = queryFunctions.createCompleteQuery(world_list, ["EN.ATM.CO2E.KT"], [2016]);
        const worldCO2Aggregator = queryFunctions.getAggregatedData(worldCo2Query)
        .then(co2_results => {
            const filteredCO2 = queryFunctions.filterRegionAPIResponse(co2_results);
            const {values, ids} = queryFunctions.dataExtraction(filteredCO2);
            // console.log("\n")
            // console.log("CO2 Emissions")
            // console.log("Length:", values.length);
            // console.log("Length:", values)
            // console.log("\n")
            if(values[0]) {
                console.log("World CO2 emissions received")
                worldQueryDispatch({type:ACTIONS.co2, payload:{value:values[0]}}) 
            } else {
                worldQueryDispatch({type:ACTIONS.nan})
            }

        
        
        })
        
        }

    // AI prediction 
    function getAIPredictions(countries_list){
        
        // Controls 
        const indicators_list = ["NY.GDP.MKTP.CD"];
        const indicator_names_list = ["GDP"]
        const date_list = [2012, 2019];

        const apiQuery = queryFunctions.createCompleteQuery(countries_list, indicators_list, date_list);
        const countrySectionResults = queryFunctions.getAggregatedData(apiQuery)
        .then( async function(results){
            const filteredResults = queryFunctions.filterRegionAPIResponse(results);
            const {allValues, allIds} = queryFunctions.dataExtraction(filteredResults, indicators_list);
            allValues.forEach((item, index)=>{
                console.log(indicator_names_list[index]);
                console.log("Length:", allIds[index].length);
                console.log("Value:", item)
                console.log("\n")
            })

            queryDispatch({type:ACTIONS.gdp_series, payload:{
                value:allValues[0]
            }})

            const preprocessed_inputs = preprocessingAIInput(allValues[0])
            const predictions = await makeAIModelRequestFetch(preprocessed_inputs);
            const final_prediction = preprocessingOutputs(predictions);
            queryDispatch({type:ACTIONS.gdp_prediction, payload:{
                value:final_prediction
            }})
            console.log(predictions)
            //const final_prediction = preprocessingOutputs(predictions);
            // queryDispatch({type:ACTIONS.gdp_prediction, payload:{
            //     value:final_prediction
            // }})
            //console.log(final_prediction)
            //console.log(predictions)
                
    })}

    function oneCountryQueryHandler(e){
        oneCountrySection([formState.country], [parseInt(formState.year)])
        getAIPredictions([formState.country])
    }
    

    

    // function getAIPredictiosHandler(e){
    //     getAIPredictions([formState.country])
    // }
    return (
        <div className="country-indepth">
            <div className="country-indepth-text container">
                <h2>Country Indepth</h2>
                <p>Get an in-depth analysis of a country. To get a current day analysis, set the year to latest year </p>
                
            </div>
            <form className="country-indepth-settings  container" 
                id="country-indepth-settings"
                >
                <fieldset className="box-shadow">

                    <div className="fieldset-item">
                        <select id="country-indepth-country"
                            onInput={(e)=>dispatch({type:ACTIONS.countryChange, payload:{value:e.target.value}})}
                        >
                            

                            {countries.map((item, index)=>(
                                <option id={countriesIds[index]} value={countriesIds[index]}>{item}</option>
                            ))}
                        </select>
                        <label htmlFor="country-indepth-country">Country:</label>
                    </div>


                    <div className="fieldset-item">
                        <input type="range" 
                        id="country-indepth-year"
                        max="2019"
                        min="1960"
                        onInput={(e)=>dispatch({type:ACTIONS.yearChange,  payload:{value:e.target.value}})}
                        
                        

                        />
                        <label htmlFor="country-indepth-year">Year:</label>

                        {/* <span>{formState.year}</span> */}
                    </div>


                </fieldset>

                <a
                href="#one-country-analyze"
                id="one-country-analyze"
                className="analyze"
                onClick={oneCountryQueryHandler}
                >Analyze</a>


            </form>
                <OneCountryResults 
                queryState = {queryState}
                worldQueryState = {worldQueryState}
                indicatorNames = {indicatorNames}
                countryName = {codeToCountryName[formState.country]}
                />

            
            
        </div>
    )
}

export default React.memo(OneCountry);
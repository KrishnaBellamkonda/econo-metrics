import React from 'react';
import {useReducer, useEffect} from 'react';

// Import BarChart & DoughnutChart for visualization 
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';

// Import the requried functions 
import * as queryFunctions from './functions/finalQueries'

// Import the required arrays for Regions
import regionsCodeToName from './arrays/REGION_ONLY.json';
import worldAtAGlanceIndicatorNames from './arrays/WORLD_AT_GLANCE.json'

// Utility 
function keyValueSwap(object){
    let swapedKeyValue = {}
    const keys = Object.keys(object);
    const values = Object.values(object)
    values.forEach((item, index)=>{
        swapedKeyValue[item] = keys[index]
    })
    return swapedKeyValue
} // Could be placed in the parent component

const indicatorCodeToName = keyValueSwap(worldAtAGlanceIndicatorNames)
// State 
const WAC_FORM = {
    indicator:worldAtAGlanceIndicatorNames["Economic Growth"]
}

const WAC_QUERY = {
    "SP.POP.TOTL":"",
    "NY.GDP.MKTP.KD.ZG":"",
    "IQ.CPA.GNDR.XQ":""

    
}

// ACTIONS
const WAC_ACTIONS = {
    economic_growth:"growth",
    population:"populaton", 
    gender_parity_index:"gender_parity_index",

    population_query:"SP.POP.TOTL",
    economic_growth_query:"NY.GDP.MKTP.KD.ZG",
    gender_parity_index_query:"IQ.CPA.GNDR.XQ"

    


}

// "SP.POP.TOTL":"population_query",
// "NY.GDP.MKTP.KD.ZG":"economic_growth_query",
// "IQ.CPA.GNDR.XQ":"gender_parity_index"

// Handlers
function formHandler(state, action){
    let newState = {...state};
    newState.indicator = action.payload.value;
    return newState
}

function queryHandler(state, action){
    let newState = {...state};
    newState[action.type] = action.payload.value;
    return newState
}

// Reducer
function WACReducer(state, action){
    switch(action.type){
        case WAC_ACTIONS.population:
            console.log("population WAC activated")
            return formHandler(state, action)
        case WAC_ACTIONS.economic_growth:
            return formHandler(state, action)
        case WAC_ACTIONS.gender_parity_index:
            return formHandler(state, action)
        default:
            return state
    }
}


function WACQueryReducer(state, action){
    switch(action.type){
        case WAC_ACTIONS.population_query:
            return queryHandler(state, action)
        case WAC_ACTIONS.economic_growth_query:
            return queryHandler(state, action)
        case WAC_ACTIONS.gender_parity_index_query:
            return queryHandler(state, action)
        default:
            return state
    }
}

const WorldAtAGlancePage = ()=>{

    // State 
    const [WACFormState, WACDispatch] = useReducer(WACReducer, WAC_FORM)
    const [WACQueryState, WACDispatchQuery] = useReducer(WACQueryReducer, WAC_QUERY)

    // World At a Glance Section 
    function worldAtAGlanceSection(LATEST_YEAR=2019){
    
        const regions_countries_list = ["ARB", "EAS", "ECS", "LCN", "MEA", "NAC", "PSS", "SAS", "SSF"];
        const regions_indicators_list = ["NY.GDP.MKTP.KD.ZG", "IQ.CPA.GNDR.XQ", "SP.POP.TOTL"];
        const region_indicator_names_list = ["Economic Growth", "Gender Parity Index", "Total Population"]
        const date_list = [LATEST_YEAR];
        
        const regions_api_query  = queryFunctions.createCompleteQuery(regions_countries_list, regions_indicators_list, date_list)
        const regions_data_results = queryFunctions.getAggregatedData(regions_api_query)
        .then((results)=>{
            const filteredResults = queryFunctions.filterRegionAPIResponse(results);
            const {allValues, allIds} = queryFunctions.dataExtraction(filteredResults, regions_indicators_list);
            allValues.forEach((item, index)=>{
                const region_indicator_name = region_indicator_names_list[index];
                const ids = allIds[index]
                const regionNameToValue = {}
                item.forEach((value, itemIndex)=>{
                    regionNameToValue[ids[itemIndex]] = value
                })

                WACDispatchQuery({type:regions_indicators_list[index], payload:{value:regionNameToValue}})
                
                // // Detailed Logging 
                // console.log(region_indicator_name);
                // console.log(regions_indicators_list[index])
                // console.log("Length:", Object.keys(regionNameToValue).length);

            })
        
            // const regions_literacy_api_query  = queryFunctions.createCompleteQuery(regions_countries_list, ["SE.ADT.LITR.ZS"], [2016])
            // const regions_literacy_data_results = queryFunctions.getAggregatedData(regions_literacy_api_query)
            // .then(results=>{
            //     const filteredLiteracyResults = queryFunctions.filterRegionAPIResponse(results);
            //     const {values, ids} = queryFunctions.dataExtraction(filteredLiteracyResults);
            //     console.log("\n")
            //     console.log("Literacy Rate")
            //     console.log("Length:", values.length);
            //     console.log("Length:", values)
            //     console.log("\n")
            //     console.log(ids)
            //     const selectedElement = elementsArray[-1];
            //     const text = `${region_indicator_name}: ${regionMaxName} => ${regionMaxValue}`;
            //     selectedElement.textContent = text;
            // })
        })
        }

    // Run once on mount
    useEffect(()=>{
        worldAtAGlanceSection()
    }, [])

    // Visualizations


    return (
        <div className="world-at-a-glance">
            <div className="section-text container">
                <h2>World At A Glance</h2>
                <p>Take a glance at the economic, social and gender situation of different world
                regions</p>
            </div>
            
            <div className="snap-tabs container">
                <div className="world-at-a-glance-settings box-shadow">
                <a href="#world-at-a-glance-economic-growth-viz" 
                id="world-at-a-glance-economic-growth"
                className="world-at-a-glance-fieldset"
                onClick={(e)=>WACDispatch({type:WAC_ACTIONS.economic_growth, payload:{value:worldAtAGlanceIndicatorNames["Economic Growth"]}})}
                >Economic Growth</a>

                <a href="#world-at-a-glance-population-viz" 
                id="world-at-a-glance-population"
                className="world-at-a-glance-fieldset"
                onClick={(e)=>WACDispatch({type:WAC_ACTIONS.population, payload:{value:worldAtAGlanceIndicatorNames["Population"]}})}
                >Population</a>
                
                <a href="#world-at-a-glance-gender-parity-index-viz" 
                id="world-at-a-glance-gender-parity-index"
                className="world-at-a-glance-fieldset"
                onClick={(e)=>WACDispatch({type:WAC_ACTIONS.gender_parity_index, payload:{value:worldAtAGlanceIndicatorNames["Gender Parity Index"]}})}
                >Gender Parity Index</a>
            </div>

                <div className="world-at-a-glance-visualizations scroll-snap-x">
                <section id="world-at-a-glance-economic-growth-viz">
                    <BarChart
                    className="world-at-a-glance-canvas"
                    state={WACQueryState["NY.GDP.MKTP.KD.ZG"]}
                    indicatorNames={regionsCodeToName}
                    countryName={indicatorCodeToName["NY.GDP.MKTP.KD.ZG"]}
                    world={false}
                    settings = {
                        {
                            backgroundColor:"#E7C864",
                            color:"#A1A1A1"
                        }
                    }
                    />

                    {/* <DoughnutChart 
                    state={WACQueryState["NY.GDP.MKTP.KD.ZG"]}
                    indicatorNames={regionsCodeToName}
                    countryName={indicatorCodeToName["NY.GDP.MKTP.KD.ZG"]}
                    settings = {{
                        backgroundColor:"#E7C864"
                    }}
                    /> */}
                </section>

                <section id="world-at-a-glance-population-viz">
                    <BarChart
                    className="world-at-a-glance-canvas"
                    state={WACQueryState["SP.POP.TOTL"]}
                    indicatorNames={regionsCodeToName}
                    countryName={indicatorCodeToName["SP.POP.TOTL"]}
                    world={false}
                    settings = {
                        {
                            backgroundColor:"#E7C864",
                            color:"#A1A1A1"
                        }
                    }
                    />

                    {/* <DoughnutChart 
                    state={WACQueryState["SP.POP.TOTL"]}
                    indicatorNames={regionsCodeToName}
                    countryName={indicatorCodeToName["SP.POP.TOTL"]}
                    settings = {{
                        backgroundColor:"#E7C864"
                    }}
                    /> */}
                </section>

                <section id="world-at-a-glance-gender-parity-index-viz">
                    <BarChart
                    className="world-at-a-glance-canvas"
                    state={WACQueryState["IQ.CPA.GNDR.XQ"]}
                    indicatorNames={regionsCodeToName}
                    countryName={indicatorCodeToName["IQ.CPA.GNDR.XQ"]}
                    world={false}
                    settings = {
                        {
                            backgroundColor:"#E7C864",
                            color:"#A1A1A1"
                        }
                    }
                    />


                    {/* <DoughnutChart 
                    state={WACQueryState["IQ.CPA.GNDR.XQ"]}
                    indicatorNames={regionsCodeToName}
                    countryName={indicatorCodeToName["IQ.CPA.GNDR.XQ"]}
                    settings = {{
                        backgroundColor:"#E7C864"
                    }}
                    /> */}
                </section>

            </div>
            </div>

            
            
        </div>
    )
}

export default WorldAtAGlancePage;
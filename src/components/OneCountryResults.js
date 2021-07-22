import React from 'react'
import BarChart from './BarChart'
import  LineChart from './LineChart'
// import {useContext} from 'react';
// import { Bar } from 'react-chartjs-2';

function keyValueSwap(object){
    let swapedKeyValue = {}
    const keys = Object.keys(object);
    const values = Object.values(object)
    values.forEach((item, index)=>{
        swapedKeyValue[item] = keys[index]
    })
    return swapedKeyValue
} // Could be placed in the parent component

function displayEditing(value, indicator){
    switch(indicator){
        case "NY.GDP.MKTP.CD":
            return (Math.round(value/Math.pow(10, 9))+" billion dollars")
        case "NY.GDP.PCAP.CD":
            return (Math.round(value, 3) + " dollars")
        case "NY.GDP.PCAP.PP.CD":
            return (Math.round(value, 3) + " dollars")
        case "NY.GNP.PCAP.PP.CD":
            return (Math.round(value, 3) + " dollars")
        case "FP.CPI.TOTL.ZG":
            return (value.toFixed(2)+ "% (percent)")
        case "NE.IMP.GNFS.CD":
            return (Math.round(value/Math.pow(10, 9))+" billion dollars")
        case "NE.EXP.GNFS.CD":
            return (Math.round(value/Math.pow(10, 9))+" billion dollars")
        case "SP.DYN.LE00.IN":
            return(Math.round(value)+ " years")
        case "EN.ATM.CO2E.KT":
            return (Math.round(value)+" kT (killo Tonnes)")
        default:
            return (Math.round(value))
    }
}

// filter handler 
function filterQuery(state, indicators){
        const keys = Object.keys(state)
        let filteredObject = {}
        keys.forEach((item, index)=>{
            if(indicators.includes(item))  filteredObject[item] = state[item]
        })
        return filteredObject
    }

const OneCountryResults = (props)=>{

    const MACRO_INDICATORS  = ["NY.GDP.MKTP.CD", "NY.GDP.PCAP.CD", "NY.GDP.PCAP.PP.CD", "NY.GNP.PCAP.PP.CD", "FP.CPI.TOTL.ZG"];
    const TRADE_INDICATORS = ["NE.IMP.GNFS.CD", "NE.EXP.GNFS.CD"];
    const SOCIAL_INDICATORS  = ["SP.DYN.LE00.IN", "EN.ATM.CO2E.KT", ];



    // Query State & world State
    const queryState = props.queryState;
    const worldQueryState = props.worldQueryState;
    const indicatorNames = keyValueSwap(props.indicatorNames);


    // Keys of query state
    // const queryStateKeys = Object.keys(queryState)


    // Filtered States
    const macroState = filterQuery(queryState, MACRO_INDICATORS)
    const tradeState = filterQuery(queryState, TRADE_INDICATORS)
    const socialState = filterQuery(queryState, SOCIAL_INDICATORS)

    // Visualization 
    const MACRO_VIZ = ["NY.GDP.PCAP.CD", "NY.GDP.PCAP.PP.CD", "NY.GNP.PCAP.PP.CD"]
    const TRADE_VIZ = ["NE.IMP.GNFS.CD", "NE.EXP.GNFS.CD"];
    const SOCIAL_VIZ = ["SP.DYN.LE00.IN"]
    const LINE_VIZ = ["gdp_series, gdp_prediction"]
    // Visualization States
    const macroVisualizationData = filterQuery(queryState, MACRO_VIZ)
    const tradeVisualizationData = filterQuery(queryState, TRADE_VIZ)
    const socialVisualizationData = filterQuery(queryState, SOCIAL_VIZ)
    
    const worldMacroVisualizationData = filterQuery(worldQueryState, MACRO_VIZ)
    const worldTradeVisualizationData = filterQuery(worldQueryState, TRADE_VIZ)
    const worldSocialVisualizationData = filterQuery(worldQueryState, SOCIAL_VIZ)

    const lineChartVisualizationData = {
        "gdp_series":queryState["gdp_series"], 
        "gdp_prediction":queryState["gdp_prediction"]
    }
    console.log(queryState)

    return (
        <div className="one-country-results container">

            <section className="macro">
                <div className="one-country-result-text">
                    <h3>Macro</h3>
                    {Object.keys(macroState).map((item, index)=>{
                        if(macroState[item])
                        return (
                            <div className="one-country-result">
                                <p>{indicatorNames[item]}:<span>{displayEditing(macroState[item], item)}</span></p>
                    
                            </div>
                        )
                    })}
                </div>

                <BarChart 
                state = {macroVisualizationData}
                indicatorNames = {indicatorNames}
                worldState = {worldMacroVisualizationData}
                type= "macro"
                world={true}
                countryName = {props.countryName}
                // settings = {{
                //     backgroundColor:"#E7C864"

                // }}
                />
            </section>

            <section className="trade">
                <div className="one-country-result-text">
                    <h3>Trade</h3>
                    {Object.keys(tradeState).map((item, index)=>{
                        return (
                            <div className="one-country-result">
                                <p>{indicatorNames[item]}:<span>{displayEditing(tradeState[item], item)}</span></p>
                    
                            </div>
                        )
                    })}
                </div>

                <BarChart 
                state = {tradeVisualizationData}
                indicatorNames = {indicatorNames}
                worldState = {worldTradeVisualizationData}
                type= "trade"
                world={true}
                countryName = {props.countryName}
                />
            </section>

            <section className="social">
                <div className="one-country-result-text">
                    <h3>Social</h3>
                    {Object.keys(socialState).map((item, index)=>{
                        return (
                            <div className="one-country-result">
                                <p>{indicatorNames[item]}:<span>{displayEditing(socialState[item], item)}</span></p>
                    
                            </div>
                        )
                    })}
                </div>
                <BarChart 
                state = {socialVisualizationData}
                indicatorNames = {indicatorNames}
                type= "social"
                worldState = {worldSocialVisualizationData}
                world={true}
                countryName = {props.countryName}
                />
            </section>

            {/* <section className="world">
                <h3>World</h3>
                {Object.keys(worldQueryState).map((item, index)=>{
                    return (
                        <div className="one-country-result">
                            <p>{indicatorNames[item]}:<span>{displayEditing(worldQueryState[item])}</span></p>
                        </div>
                    )
                })}
            </section> */}

            <section>
                <LineChart
                state = {lineChartVisualizationData}
                countryName = {props.countryName}
                />
            </section>
        </div>
    )
}

export default OneCountryResults;
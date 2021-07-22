import React, { useEffect } from 'react';
import {useReducer} from 'react';

// One Country Fetch Function 
import * as queryFunctions from './functions/finalQueries'

// Import Map component 
import MapVisualization  from './MapVisualization';

// Importing the GeoJSON file 
// import worldsGeoJson from './arrays/all_countries.geo.json';

// Import the popular section Indicators
import codeToCountryName from "./arrays/COUNTRIES_ONLY_CODE_TO_NAME.json"
import popularIndicatorNameToCode from "./arrays/POPULAR_SECTION_INDICATOR_NAMES.json"

const popularIndicatorNames = Object.keys(popularIndicatorNameToCode);
const popularIndicatorCodes = Object.keys(popularIndicatorNameToCode)


// Utility 
function strip(string) {
    return string.replace(/\s/g, '');
}


// Handlers 
function handlerQuery(state, action){
    let newState = {...state};
    newState[action.type] = action.payload.value;
    return newState
}

// Reducers 
function popularPageQueryReducer(state, action ){
    switch(action.type){
        default:
            return handlerQuery(state, action)
    }
}

// Initial State
const POPULAR_QUERY_INITIAL_STATE = {
    "FP.CPI.TOTL.ZG":"",
    "NY.GDP.PCAP.CD":"",
    "NY.GDP.PCAP.PP.CD":"", 
    "NY.GNP.MKTP.CD":"", 
    "NY.GNP.PCAP.PP.CD":"",  
    "SP.POP.TOTL":"",
    "SP.DYN.LE00.IN":""
}


//  const POPULAR_SECTION_INDICATORS=["FP.CPI.TOTL.ZG", "NY.GDP.PCAP.CD",  "NY.GDP.PCAP.PP.CD", "NY.GNP.MKTP.CD", "NY.GNP.PCAP.PP.CD",  "SP.POP.TOTL", "SP.DYN.LE00.IN"]

//     const INDICATOR_NAMES=["Inflation"
//         , "GDP per capita"
//         , "GDP per capita PPP" 
//         , "GNI" 
//         , "GNI per capita, 2010 constant prices"
//         , "Population" 
//         , "Life expectance" 
//     ];




const PopularPage = ()=>{

    // Constants
    const POPULAR_SECTION_INDICATORS=["FP.CPI.TOTL.ZG",
    "NY.GDP.PCAP.CD",  
    "NY.GDP.PCAP.PP.CD", 
    "NY.GNP.MKTP.CD", 
    "NY.GNP.PCAP.PP.CD",  
    "SP.POP.TOTL", 
    "SP.DYN.LE00.IN"]

   const INDICATOR_NAMES=["Inflation"
       , "GDP per capita"
       , "GDP per capita PPP" 
       , "GNI" 
       , "GNI per capita, 2010 CP"
       , "Population" 
       , "Life expectance" 
   ];

   const vizIds = [
       "popular-section-Inflation-viz",
       "popular-section-GDP-viz",
       "popular-section-GDPpercapita-viz",
       "popular-section-GDPpercapitaPPP-viz",
       "popular-section-GNIpercapita-viz",
       "popular-section-Population-viz",
       "popular-section-LifeExpectancy-viz",
   ]

    // State for Popualar Section 
    const [popularQueryState, dispatchQuery] = useReducer(popularPageQueryReducer, POPULAR_QUERY_INITIAL_STATE)
    
    // // Get the Query Functions
    function popularSection(DATE_LIST=[2019]){
    const POPULAR_SECTION_COUNTRIES = ["AFG", "ALB", "DZA", "ASM", "AND", "AGO", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BIH", "BWA", "BRA", "VGB", "BRN", "BGR", "BFA", "BDI", "CPV", "KHM", "CMR", "CAN", "CYM", "CAF", "TCD", "CHI", "CHL", "CHN", "COL", "COM", "COD", "COG", "CRI", "CIV", "HRV", "CUB", "CUW", "CYP", "CZE", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "SWZ", "ETH", "FRO", "FJI", "FIN", "FRA", "PYF", "GAB", "GMB", "GEO", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GUM", "GTM", "GIN", "GNB", "GUY", "HTI", "HND", "HKG", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "IMN", "ISR", "ITA", "JAM", "JPN", "JOR", "KAZ", "KEN", "KIR", "PRK", "KOR", "XKX", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MAC", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MRT", "MUS", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "NCL", "NZL", "NIC", "NER", "NGA", "MKD", "MNP", "NOR", "OMN", "PAK", "PLW", "PAN", "PNG", "PRY", "PER", "PHL", "POL", "PRT", "PRI", "QAT", "ROU", "RUS", "RWA", "WSM", "SMR", "STP", "SAU", "SEN", "SRB", "SYC", "SLE", "SGP", "SXM", "SVK", "SVN", "SLB", "SOM", "ZAF", "SSD", "ESP", "LKA", "KNA", "LCA", "MAF", "VCT", "SDN", "SUR", "SWE", "CHE", "SYR", "TJK", "TZA", "THA", "TLS", "TGO", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "USA", "URY", "UZB", "VUT", "VEN", "VNM", "VIR", "PSE", "YEM", "ZMB", "ZWE"];
    const POPULAR_SECTION_INDICATORS=["FP.CPI.TOTL.ZG",
     "NY.GDP.PCAP.CD",  
     "NY.GDP.PCAP.PP.CD", 
     "NY.GNP.MKTP.CD", 
     "NY.GNP.PCAP.PP.CD",  
     "SP.POP.TOTL", 
     "SP.DYN.LE00.IN"]

    const INDICATOR_NAMES=["Inflation"
        , "GDP per capita"
        , "GDP per capita PPP" 
        , "GNI" 
        , "GNI per capita, 2010 constant prices"
        , "Population" 
        , "Life expectance" 
    ];

    console.log("CODES ", POPULAR_SECTION_INDICATORS.length)
    console.log("NAMES", INDICATOR_NAMES.length)

    const popualar_section_query  = queryFunctions.createCompleteQuery(POPULAR_SECTION_COUNTRIES, POPULAR_SECTION_INDICATORS, DATE_LIST)
    const popular_section_results = queryFunctions.getAggregatedData(popualar_section_query)
        .then((results)=>{
            const filteredResults = queryFunctions.filterRegionAPIResponse(results);
            const {allValues, allIds} = queryFunctions.dataExtraction(filteredResults, POPULAR_SECTION_INDICATORS);
            allValues.forEach((item, index)=>{
                const popular_section_indicator_name = INDICATOR_NAMES[index];
                const ids = allIds[index]
                const countryNameToValue = []
                item.forEach((value, itemIndex)=>{
                    const countryId = ids[itemIndex];
                    const countryName = codeToCountryName[countryId];
                    const dataPoint = [countryName, value]
                    countryNameToValue.push(dataPoint)
                    // countryNameToValue[codeToCountryName[countryId]] = value
                })

                countryNameToValue.unshift(["Country", "Value"])
                // console.log(countryNameToValue)

                dispatchQuery({type:POPULAR_SECTION_INDICATORS[index], payload:{value:countryNameToValue}})
                
                // // Detailed Logging 
                // console.log(popular_section_indicator_name);
                // console.log(POPULAR_SECTION_INDICATORS[index])
                // console.log("Length:", Object.keys(countryNameToValue).length);

            }) 
        })

    }

    useEffect(()=>{
        popularSection()
    }, [])

    // Calculate maximum width 
    function getWidth() {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      }
      
      function getHeight() {
        return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.documentElement.clientHeight
        );
      }
      
      console.log('Width:  ' +  getWidth() );
      console.log('Height: ' + getHeight() );

    // Visualizaion Settings
    const options = {
        // title:"",

        colorAxis:{ colors:["#B4416B"]   },
        backgroundColor:"F2EDF0",
        datalessRegionColor:"var(--clr-surface-1-card)", // Default
        defaultClor:"#B4416B"
    }


    return (
        <div className="popular-section">
            <div className="section-text container">
                <h2>Popular Section</h2>
                <p>Select the required indicator</p>
            </div>

            <div className="box-shadow popular-section-settings container">
                
                <div className="settings-row">
                    {
                    
                        INDICATOR_NAMES.slice(0, 4).map((name, index)=>{
                            return (
                                <a
                                href={"#popular-section-"+strip(name)+"-viz"}
                                id={popularIndicatorCodes[index]}
                    
                                >
                                  {name}
                                </a>
                            )
                        })
                    }
                </div>

                <div className="settings-row">
                    {
                        INDICATOR_NAMES.slice(4).map((name, index)=>{
                            return (
                                <a
                                href={"#popular-section-"+strip(name)+"-viz"}
                                id={popularIndicatorCodes[index]}
                    
                                >
                                  {name}
                                </a>
                            )
                        })
                    }
                </div>
            </div>
            
            <div className="popular-section-visualizations scroll-snap-x container">

                    {
                        Object.keys(popularQueryState).map((key, index)=>{
                            return (
                                <MapVisualization 
                                state = {popularQueryState[key]}
                                indicator = {key}
                                indicatorName = {INDICATOR_NAMES[index]}
                                id = {"popular-section-"+strip(INDICATOR_NAMES[index])+"-viz"}
                                />
                            )
                        })
                    }
                    
                    
                    

            </div>
        </div>
    )
}

export default React.memo(PopularPage)
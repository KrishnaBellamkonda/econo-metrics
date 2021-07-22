
// const fetch = require('node-fetch');
// const fs = require('fs');
let ERROR_COUNTER = 0;


// Utility Funcitons
export function indexOfMax(arr) {
if (arr.length === 0) {
    return -1;
}

let max = arr[0];
let maxIndex = 0;

for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
    }
}

return maxIndex;
}

export function indexOfMin(arr) {
if (arr.length === 0) {
    return -1;
}

let min = arr[0];
let minIndex = 0;

for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
        minIndex = i;
        min = arr[i];
    }
}

return minIndex;
}

export function randomNumberGenerator(maxNumber, minNumber = 0){
const range = maxNumber - minNumber + 1;
const randomNumber = Math.random()*(range) + minNumber;
return Math.floor(randomNumber)
}

export function returnArrayOfIndicators(array){
const length = array.length;
let endIndex = 0;
let reqArrays = [];
for(let i=0; i<length; i+=3){
    let reqArray;
    if(!(i+3 > length)){
        endIndex = i+3;
        reqArray = array.slice(i, endIndex);
    } else {
        reqArray = array.slice(i)
    }

    reqArrays.push(reqArray);
}

return reqArrays

}

export function createRangeOfRadomNumbers(quantity, max, min = 0){
let numbersArray = [];
while(numbersArray.length < quantity){
    const candidateNumber = randomNumberGenerator(max, min);
    if(numbersArray.indexOf(candidateNumber) === -1) numbersArray.push(candidateNumber)
    
}
return numbersArray
}


// Filter export function 
export function filterAPIResponse(dataObject){
/* This export function filters null values and region Names in 
the API response. 
------------------------------------
Returns:
=> An Array of Objects (identical to the input) 
*/
const COUNTRIES_IDS = ["AFG","ALB","DZA","ASM","AND","AGO","ATG","ARG","ARM","ABW","AUS","AUT","AZE","BHS","BHR","BGD","BRB","BLR","BEL","BLZ","BEN","BMU","BTN","BOL","BIH","BWA","BRA","VGB","BRN","BGR","BFA","BDI","CPV","KHM","CMR","CAN","CYM","CAF","TCD","CHI","CHL","CHN","COL","COM","COD","COG","CRI","CIV","HRV","CUB","CUW","CYP","CZE","DNK","DJI","DMA","DOM","ECU","EGY","SLV","GNQ","ERI","EST","SWZ","ETH","FRO","FJI","FIN","FRA","PYF","GAB","GMB","GEO","DEU","GHA","GIB","GRC","GRL","GRD","GUM","GTM","GIN","GNB","GUY","HTI","HND","HKG","HUN","ISL","IND","IDN","IRN","IRQ","IRL","IMN","ISR","ITA","JAM","JPN","JOR","KAZ","KEN","KIR","PRK","KOR","XKX","KWT","KGZ","LAO","LVA","LBN","LSO","LBR","LBY","LIE","LTU","LUX","MAC","MDG","MWI","MYS","MDV","MLI","MLT","MHL","MRT","MUS","MEX","FSM","MDA","MCO","MNG","MNE","MAR","MOZ","MMR","NAM","NRU","NPL","NLD","NCL","NZL","NIC","NER","NGA","MKD","MNP","NOR","OMN","PAK","PLW","PAN","PNG","PRY","PER","PHL","POL","PRT","PRI","QAT","ROU","RUS","RWA","WSM","SMR","STP","SAU","SEN","SRB","SYC","SLE","SGP","SXM","SVK","SVN","SLB","SOM","ZAF","SSD","ESP","LKA","KNA","LCA","MAF","VCT","SDN","SUR","SWE","CHE","SYR","TJK","TZA","THA","TLS","TGO","TON","TTO","TUN","TUR","TKM","TCA","TUV","UGA","UKR","ARE","GBR","USA","URY","UZB","VUT","VEN","VNM","VIR","PSE","YEM","ZMB","ZWE"];

// Filter Null objects
const dataObjectNullFiltered = dataObject.filter(item => item.value)

// Filter Regions (as only COUNTRIES are Required)
const dataObjectCountryOnlyFiltered = dataObjectNullFiltered.filter(item => COUNTRIES_IDS.includes(item.countryiso3code))
return dataObjectCountryOnlyFiltered
}

export function filterRegionAPIResponse(dataObject){
// Filter Null objects
const dataObjectNullFiltered = dataObject.filter(item => item.value)
return dataObjectNullFiltered
}

// Data Extraction 

export function valuesIdsExtraction(dataObject){
let values = [];
let ids = [];
dataObject.forEach(item=>{
    values.push(item.value);
    ids.push(item.countryiso3code);
})
return {
    values: values,
    ids:ids
}
}

export function dataExtraction(dataObject, indicatorsList = []){
/*This export function extracts the required form of data
-------------------------------------
Returns 
if NO INDICATOR specified => returns { values, ids} (of all items combined)
if INDICATORs specified => returns {allValues:[[valuesOfIndicator1], [ValuesOfIndicator2], ....], allIds:[[..same as before]] }
*/
if (indicatorsList.length == 0) {
    const {values, ids} = valuesIdsExtraction(dataObject);
    return { 
        values: values, 
        ids:ids
    }
} else {
    const allValues = [];
    const allIds = [];
    for(let i=0; i<indicatorsList.length; i++){
        let specificIndicatorFilteredList = dataObject.filter(item => item.indicator.id == indicatorsList[i]);
        let { values, ids} = valuesIdsExtraction(specificIndicatorFilteredList);
        allValues.push(values);
        allIds.push(ids)
    }   
    return {
        allValues:allValues,
        allIds:allIds
    }
}


}

// Country Part

export function createCountryQuery(countriesList){
const COUNTRY_ROUTE = "country/";
const countries_list_length = countriesList.length;
let countriesQuery = "";

if(countries_list_length == 0) {
    countriesQuery += "all";

} else {
    countriesList.forEach((item, index)=>{
        countriesQuery += item
        if(countries_list_length > 1 && index != countries_list_length-1 ) countriesQuery += ";"
    
    })
}

const completeQuery = COUNTRY_ROUTE + countriesQuery + "/"
return completeQuery
}

// Indicators part
export function createIndicatorQuery(indicatorsList) {
const INDICATOR_ROUTE = "indicator/";
const indicators_list_length = indicatorsList.length;
let indicatorsQuery = "";
    
if(indicators_list_length == 0) {
    indicatorsQuery += "GIVE_INDICATOR_TO_AVOID_OVERFLOW";
    
} else {
    indicatorsList.forEach((item, index)=>{
        indicatorsQuery += item
        if(indicators_list_length > 1 && index != indicators_list_length-1 ) indicatorsQuery += ";"
        
    })
}

const source = indicators_list_length >1? `source=2&` : ``;
    
const completeQuery = INDICATOR_ROUTE + indicatorsQuery + "?" + source;

return completeQuery


}

// Date part
export function createDateQuery(dateList){
const DATE_ROUTE = "date=";
const date_list_length = dateList.length;
let dateQuery = "";
        
if(date_list_length == 0) {
    dateQuery += "GIVE_A_DATE_RANGE";
        
} else {

    if(date_list_length >2) {
        dateQuery += "TOO_MANY_DATE_VALUES";
    } else {
        dateList.forEach((item, index)=>{
            dateQuery += item
            if(date_list_length > 1 && index != date_list_length-1 ) dateQuery += ":"
            
        })
    }

    

}
const completeQuery = DATE_ROUTE + dateQuery;
return completeQuery

}

// Complete Query
export function createCompleteQuery(countriesList, indicatorsList, dateList){
const default_URL = "http://api.worldbank.org/v2/";
let completeQuery = default_URL + createCountryQuery(countriesList) + createIndicatorQuery(indicatorsList) +"format=json&"+ createDateQuery(dateList);
return completeQuery
}


// Data Aggregator
export function errorCodeCheck(id){
console.log()
console.log("Error Code Check")
switch(id){
    case 120:
        console.log('The provided parameter value is not valid.');
        break
    case 503:
        console.log('Service currently not available');
        break
    case 199:
        console.log('Unexpected Error');
        break
}
console.log("------------------------------------------------")
}

export function metaDataObjectPrccessor(dataObject){
const responseMetaData = dataObject[0];
const isValid = !responseMetaData.message;
return {
    isValid:isValid, 
    responseMetaData:responseMetaData,
    dataObject:dataObject
}
}

export async function dataLoopAggregator(metaDataObject, url){
let {isValid, responseMetaData, dataObject} = metaDataObject;
console.log("Is the query Valid:", isValid)
if(isValid){
    const n_pages = responseMetaData.pages;
    const per_page = responseMetaData.per_page;

    
    let aggregateData = [... dataObject[1]]; // Adding the first page to the array
    console.log("Starting Length:", aggregateData.length)
    // Data Loop
    let results = dataLoop(n_pages, url, aggregateData)

    // return aggregateData
    return results
} else {
    let id = responseMetaData.message[0].id;
    id = parseInt(id);
    return errorCodeCheck(id)
    
}   
}


export async function dataLoop(n_pages, URL, firstValues){
let aggregateData = [...firstValues];
const startPage = 2;
let pageNumber=startPage;
do{
    let pageAttribute = `&page=${pageNumber}`;
    let pageURL = URL+pageAttribute;
    let pageData;

    const response = await fetch(pageURL)
    pageData = await response.json();
    aggregateData = aggregateData.concat(pageData[1]);
    pageNumber++;
}  while (pageNumber<=n_pages)


return aggregateData
}


export async function getAggregatedData(url){


const response = await fetch(url);
const dataObject = await response.json();
const metaDataObject = metaDataObjectPrccessor(dataObject);
let results = await dataLoopAggregator(metaDataObject, url)


return results 

}

// Popular Section API Call

// One Country Section => Working Well
export function oneCountrySection(countries_list){

// Controls 
const indicators_list = ["FP.CPI.TOTL.ZG", "NY.GDP.MKTP.CD", "NY.GDP.PCAP.CD", "NY.GDP.PCAP.PP.CD", "NY.GNP.PCAP.PP.CD", "SP.DYN.LE00.IN",  "NE.IMP.GNFS.CD", "NE.EXP.GNFS.CD"];
const indicator_names_list = ["Inflation", "GDP", "GDP per Capita", "GDP per capita PPP", "GNI per capita PPP", "life expectancy",  "imports", "exports"]
const date_list = [2019];

const apiQuery = createCompleteQuery(countries_list, indicators_list, date_list);
const countrySectionResults = getAggregatedData(apiQuery)
.then(results =>{
    const filteredResults = filterRegionAPIResponse(results);
    const {allValues, allIds} = dataExtraction(filteredResults, indicators_list);
    allValues.forEach((item, index)=>{
        console.log(indicator_names_list[index]);
        console.log("Length:", allIds[index].length);
        console.log("Value:", item)
        console.log("\n")
    })

    
})

const co2Query = createCompleteQuery(countries_list, ["EN.ATM.CO2E.KT"], [2016]);
const countryCO2Aggregator = getAggregatedData(co2Query)
.then(co2_results => {
    const filteredCO2 = filterRegionAPIResponse(co2_results);
    const {values, ids} = dataExtraction(filteredCO2);
    console.log("\n")
    console.log("CO2 Emissions")
    console.log("Length:", values.length);
    console.log("Length:", values)
    console.log("\n")


})


}
// oneCountrySection(["BRA"])


// World at a Glance =>
export function worldAtAGlanceSection(){

const regions_countries_list = ["ARB", "EAS", "ECS", "LCN", "MEA", "NAC", "PSS", "SAS", "SSF"];
const regions_indicators_list = ["NY.GDP.MKTP.KD.ZG", "IQ.CPA.GNDR.XQ", "SP.POP.TOTL"];
const region_indicator_names_list = ["Economic Growth", "Gender Parity INdex", "Total Population"]
const date_list = [2019];

const regions_api_query  = createCompleteQuery(regions_countries_list, regions_indicators_list, date_list)
const regions_data_results = getAggregatedData(regions_api_query)
.then((results)=>{
const filteredResults = filterRegionAPIResponse(results);
const {allValues, allIds} = dataExtraction(filteredResults, regions_indicators_list);
allValues.forEach((item, index)=>{
    console.log(region_indicator_names_list[index]);
    console.log("Length:", allIds[index].length);
    console.log("Value:", item)
    console.log("\n")
})

const regions_literacy_api_query  = createCompleteQuery(regions_countries_list, ["SE.ADT.LITR.ZS"], [2016])
const regions_literacy_data_results = getAggregatedData(regions_literacy_api_query)
.then(results=>{
    const filteredLiteracyResults = filterRegionAPIResponse(results);
    const {values, ids} = dataExtraction(filteredLiteracyResults);
    console.log("\n")
    console.log("Literacy Rate")
    console.log("Length:", values.length);
    console.log("Length:", values)
    console.log("\n")
    console.log(ids)
})
})
}
//  worldAtAGlanceSection();


// Popular Section 

export function requestAndAggregateResults(countries, indicators, date_list=[2019]){
const query = createCompleteQuery(countries, indicators, date_list);

const section_results = getAggregatedData(query)
.then(results => {
    const filteredResults = filterRegionAPIResponse(results);
        const {values, ids} = dataExtraction(filteredResults);
        console.log("\n")
        console.log("***************************************")
        console.log(values.length)
})
.catch(err=>{
    ERROR_COUNTER += 1;
    console.log(ERROR_COUNTER);
    if(ERROR_COUNTER < 5)  requestAndAggregateResults(countries, indicators, date_list)
    else return 0;
    
})
}
export function popularSection(){
const POPULAR_SECTION_COUNTRIES = ["AFG", "ALB", "DZA", "ASM", "AND", "AGO", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BIH", "BWA", "BRA", "VGB", "BRN", "BGR", "BFA", "BDI", "CPV", "KHM", "CMR", "CAN", "CYM", "CAF", "TCD", "CHI", "CHL", "CHN", "COL", "COM", "COD", "COG", "CRI", "CIV", "HRV", "CUB", "CUW", "CYP", "CZE", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "SWZ", "ETH", "FRO", "FJI", "FIN", "FRA", "PYF", "GAB", "GMB", "GEO", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GUM", "GTM", "GIN", "GNB", "GUY", "HTI", "HND", "HKG", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "IMN", "ISR", "ITA", "JAM", "JPN", "JOR", "KAZ", "KEN", "KIR", "PRK", "KOR", "XKX", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MAC", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MRT", "MUS", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "NCL", "NZL", "NIC", "NER", "NGA", "MKD", "MNP", "NOR", "OMN", "PAK", "PLW", "PAN", "PNG", "PRY", "PER", "PHL", "POL", "PRT", "PRI", "QAT", "ROU", "RUS", "RWA", "WSM", "SMR", "STP", "SAU", "SEN", "SRB", "SYC", "SLE", "SGP", "SXM", "SVK", "SVN", "SLB", "SOM", "ZAF", "SSD", "ESP", "LKA", "KNA", "LCA", "MAF", "VCT", "SDN", "SUR", "SWE", "CHE", "SYR", "TJK", "TZA", "THA", "TLS", "TGO", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "USA", "URY", "UZB", "VUT", "VEN", "VNM", "VIR", "PSE", "YEM", "ZMB", "ZWE"];
const POPULAR_SECTION_INDICATORS=["FP.CPI.TOTL.ZG", "NY.GDP.PCAP.CD",  "NY.GDP.PCAP.PP.CD", "NY.GNP.MKTP.CD", "NY.GNP.PCAP.PP.CD",  "SP.POP.TOTL", "SP.DYN.LE00.IN"]

const INDICATOR_NAMES=["Inflation"
    , "GDP per capita"
    , "GDP per capita PPP" 
    , "GNI" 
    , "GNI per capita, 2010 constant prices"
    , "Population" 
    , "Life expectance" 
];
const DATE_LIST=[2019];

const randomIndices = createRangeOfRadomNumbers(3, POPULAR_SECTION_INDICATORS.length -1);
let truncated_POPULAR_SECTION_INDICATORS = [];
let truncated_INDICATOR_NAMES = [];
randomIndices.forEach(randomNumber=>{
    const indicator =  POPULAR_SECTION_INDICATORS[randomNumber];
    const indicator_name = INDICATOR_NAMES[randomNumber]
    truncated_POPULAR_SECTION_INDICATORS.push(indicator);
    truncated_INDICATOR_NAMES.push(indicator_name)

})
truncated_POPULAR_SECTION_INDICATORS.forEach((item, index)=>{
    console.log(truncated_INDICATOR_NAMES[index])
    requestAndAggregateResults(POPULAR_SECTION_COUNTRIES, [item], DATE_LIST);
    
    
})

}
// popularSection()

// Unpopular Section 

export function unpopularSection(){
const UNPOPULAR_SECTION_COUNTRIES = ["AFG", "ALB", "DZA", "ASM", "AND", "AGO", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BIH", "BWA", "BRA", "VGB", "BRN", "BGR", "BFA", "BDI", "CPV", "KHM", "CMR", "CAN", "CYM", "CAF", "TCD", "CHI", "CHL", "CHN", "COL", "COM", "COD", "COG", "CRI", "CIV", "HRV", "CUB", "CUW", "CYP", "CZE", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "SWZ", "ETH", "FRO", "FJI", "FIN", "FRA", "PYF", "GAB", "GMB", "GEO", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GUM", "GTM", "GIN", "GNB", "GUY", "HTI", "HND", "HKG", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "IMN", "ISR", "ITA", "JAM", "JPN", "JOR", "KAZ", "KEN", "KIR", "PRK", "KOR", "XKX", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MAC", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MRT", "MUS", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "NCL", "NZL", "NIC", "NER", "NGA", "MKD", "MNP", "NOR", "OMN", "PAK", "PLW", "PAN", "PNG", "PRY", "PER", "PHL", "POL", "PRT", "PRI", "QAT", "ROU", "RUS", "RWA", "WSM", "SMR", "STP", "SAU", "SEN", "SRB", "SYC", "SLE", "SGP", "SXM", "SVK", "SVN", "SLB", "SOM", "ZAF", "SSD", "ESP", "LKA", "KNA", "LCA", "MAF", "VCT", "SDN", "SUR", "SWE", "CHE", "SYR", "TJK", "TZA", "THA", "TLS", "TGO", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "USA", "URY", "UZB", "VUT", "VEN", "VNM", "VIR", "PSE", "YEM", "ZMB", "ZWE"];
const UNPOPULAR_SECTION_INDICATORS= ["ST.INT.ARVL", "SH.STA.DIAB.ZS", "SP.URB.TOTL.IN.ZS", "ST.INT.ARVL" ]; //Removed => "SP.URB.TOTL.IN.ZS", "ST.INT.ARVL", "SH.ALC.PCAP.LI"
const INDICATOR_NAMES = [ "International Tourism","Diabetes", "Urban Population", "International Tourism"] //"Urban Population", "International Tourism", "Alcohol Consumption",
const DATE_LIST = [2019] 

UNPOPULAR_SECTION_INDICATORS.forEach((item, index)=>{
    requestAndAggregateResults(UNPOPULAR_SECTION_COUNTRIES, [item], DATE_LIST)
})

}
// unpopularSection()

// Quick Facts 
export function quickFactSection(){
const QUICK_FACT_COUNTRIES  = ["AFG", "ALB", "DZA", "ASM", "AND", "AGO", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BIH", "BWA", "BRA", "VGB", "BRN", "BGR", "BFA", "BDI", "CPV", "KHM", "CMR", "CAN", "CYM", "CAF", "TCD", "CHI", "CHL", "CHN", "COL", "COM", "COD", "COG", "CRI", "CIV", "HRV", "CUB", "CUW", "CYP", "CZE", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "SWZ", "ETH", "FRO", "FJI", "FIN", "FRA", "PYF", "GAB", "GMB", "GEO", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GUM", "GTM", "GIN", "GNB", "GUY", "HTI", "HND", "HKG", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "IMN", "ISR", "ITA", "JAM", "JPN", "JOR", "KAZ", "KEN", "KIR", "PRK", "KOR", "XKX", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MAC", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MRT", "MUS", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "NCL", "NZL", "NIC", "NER", "NGA", "MKD", "MNP", "NOR", "OMN", "PAK", "PLW", "PAN", "PNG", "PRY", "PER", "PHL", "POL", "PRT", "PRI", "QAT", "ROU", "RUS", "RWA", "WSM", "SMR", "STP", "SAU", "SEN", "SRB", "SYC", "SLE", "SGP", "SXM", "SVK", "SVN", "SLB", "SOM", "ZAF", "SSD", "ESP", "LKA", "KNA", "LCA", "MAF", "VCT", "SDN", "SUR", "SWE", "CHE", "SYR", "TJK", "TZA", "THA", "TLS", "TGO", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "USA", "URY", "UZB", "VUT", "VEN", "VNM", "VIR", "PSE", "YEM", "ZMB", "ZWE"]
const QUICK_FACT_GENDER_INDICATORS = ["IQ.CPA.GNDR.XQ", "SL.TLF.TOTL.FE.ZS", "SE.ENR.SECO.FM.ZS"];
const QUICK_FACT_ECONOMIC_INDICATORS = ["NY.GDP.MKTP.KD.ZG", "FP.CPI.TOTL.ZG", "NY.GDP.PCAP.CD"];
const QUICK_FACT_SOCIAL_INDICATORS  = ["SP.POP.TOTL", "ST.INT.ARVL", "SP.DYN.LE00.IN"];

const QUICK_FACT_GENDER_NAMES = ["CPIA", "Labor Force, female (% of total labor force)", "School enrollment"];
const QUICK_FACT_ECONOMIC_NAMES = ["GDP growth", "Inflation", "GDP per capita"];
const QUICK_FACT_SOCIAL_NAMES = ["Total population","International Tourism",  "literacy rate"]
const DATE_LIST  = [2019];

const INDICATOR_ARRAYS = [
    QUICK_FACT_GENDER_INDICATORS, 
    QUICK_FACT_ECONOMIC_INDICATORS, 
    QUICK_FACT_SOCIAL_INDICATORS
]

const INDICATOR_NAMES = [
    QUICK_FACT_GENDER_NAMES, 
    QUICK_FACT_ECONOMIC_NAMES, 
    QUICK_FACT_SOCIAL_NAMES

]

INDICATOR_ARRAYS.forEach((item, index)=>{
    const randomIndex = randomNumberGenerator(item.length -1);
    const selectedIndicator = item[randomIndex];
    const selectedIndicatorName = INDICATOR_NAMES[index][randomIndex];
    console.log(selectedIndicatorName);

    requestAndAggregateResults(QUICK_FACT_COUNTRIES, [selectedIndicator], DATE_LIST);
})

}

// quickFactSection();

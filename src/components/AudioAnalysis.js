import React from "react";
import useFetch from "../customHooks/useFetch.js";
import LoadingScreen from "../layout/LoadingScreen.js";
import ErrorScreen from "../layout/ErrorScreen.js";
import {useParams} from "react-router-dom"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine
  } from "recharts";

const AudioAnalysis = (props) =>{
    const {id}=useParams();
    const url = 'https://api.spotify.com/v1/audio-features/'+id;
    const headerParameters = {
        'Content-Type': 'application/json',
        'Authorization': props.data.access_token
    }
    const options = {
      method: 'GET',
      headers: headerParameters
    };
    const optionsStr = JSON.stringify(options);
    const {data,responseStatus} = useFetch(url,optionsStr);
    if (data === null) {
        return(
            <LoadingScreen /> 
         );        
    }
    if(responseStatus === 200){
        const dataset = [{characteristic:'danceability',value:data.danceability},{characteristic:'energy',value:data.energy},{characteristic:'loudness',value:data.loudness},{characteristic:'speechiness',value:data.speechiness},{characteristic:'acousticness',value:data.acousticness},{characteristic:'instrumentalness',value:data.instrumentalness},{characteristic:'liveness',value:data.liveness},{characteristic:'valence',value:data.valence}];
        return(
            <BarChart
                width={1400}
                height={630}
                data={dataset}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="characteristic" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="value" fill="black" />
            </BarChart>
            );
        }
    else
    {
        return(
            <ErrorScreen data={data} /> 
        );
    }
}


export default AudioAnalysis;
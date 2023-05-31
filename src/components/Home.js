import React from "react";
import FeaturedPlaylists from "./FeaturedPlaylists";
import NewReleases from "./NewReleases";

const Home = (props) =>{
    return(
        <>
           <FeaturedPlaylists data={props.data.access_token}/> 
           <NewReleases data={props.data.access_token}/>
        </> 
           
    );        
}

export default Home;
import React from "react";
import useFetch from "../customHooks/useFetch.js";
import LoadingScreen from "../layout/LoadingScreen.js";
import ErrorScreen from "../layout/ErrorScreen.js";

const FeaturedPlaylists = (props) => {
  const url = "https://api.spotify.com/v1/browse/featured-playlists?limit=3";
  const headerParameters = {
    "Content-Type": "application/json",
    Authorization: props.data
  };
  const options = {
    method: "GET",
    headers: headerParameters
  };
  const optionsStr = JSON.stringify(options);
  const { data, responseStatus } = useFetch(url, optionsStr);
  if (data === null) {
    return <LoadingScreen />;
  } else {
    if (responseStatus === 200) {
      return (
        <>
          <div className="index">
            <h1 style={{ paddingLeft: "15px" }}>Featured Playlists</h1>
          </div>
          <div className="container-fluid">
            <div className="row">
              {data.playlists.items.map((item, index) => (
                <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                  <div className="card h-100">
                    {item.images.map((image) => (
                      <a href={"playlist/" + item.id}>
                        <img
                          src={image.url}
                          className="card-img-top"
                          alt=""
                        ></img>
                      </a>
                    ))}
                    <div className="card-body">
                      <h5 className="card-title text-uppercase">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <a
                        href={"playlist/" + item.id}
                        className="btn btn-info btn-block"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else {
      return <ErrorScreen data={data} />;
    }
  }
};

export default FeaturedPlaylists;

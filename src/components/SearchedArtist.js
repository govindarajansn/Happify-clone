import React from "react";
import useFetch from "../customHooks/useFetch.js";
import LoadingScreen from "../layout/LoadingScreen.js";
import ErrorScreen from "../layout/ErrorScreen.js";
import { useSearchParams } from "react-router-dom";
const SearchedArtist = (props) => {
  const [searchParams] = useSearchParams();
  const artist = searchParams.get("search_query");
  const url = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
  const headerParameters = {
    "Content-Type": "application/json",
    Authorization: props.data.access_token
  };
  const options = {
    method: "GET",
    headers: headerParameters
  };
  const optionsStr = JSON.stringify(options);
  const { data, responseStatus } = useFetch(url, optionsStr);
  if (data === null) {
    return <LoadingScreen />;
  }
  if (responseStatus === 200 && data.artists.items.length !== 0) {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            {data.artists.items.map((item) => (
              <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card">
                  {item.images.length === 0 ? (
                    <img
                      src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                      width="640"
                      height="454"
                      className="card-img-top"
                      alt=""
                    ></img>
                  ) : (
                    <img
                      src={item.images[0].url}
                      className="card-img-top"
                      alt=""
                    ></img>
                  )}
                  <div className="card-body">
                    <h5 className="card-title text-uppercase">{item.name}</h5>
                    <p className="card-text">
                      Followed by {item.followers.total} people
                    </p>
                    <a
                      href={"/artist/" + item.id}
                      className="btn btn-info btn-block"
                    >
                      Top Tracks
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
    if (data.artists.items.length === 0) {
      const error = {
        status: "Not Found",
        message: "Could not find the artist you searched for."
      };
      const data = {
        error: error
      };
      return <ErrorScreen data={data} />;
    } else {
      return <ErrorScreen data={data} />;
    }
  }
};
export default SearchedArtist;

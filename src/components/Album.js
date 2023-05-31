import React from "react";
import useFetch from "../customHooks/useFetch.js";
import LoadingScreen from "../layout/LoadingScreen.js";
import ErrorScreen from "../layout/ErrorScreen.js";
import { useParams } from "react-router-dom";

const Album = (props) => {
  const { id } = useParams();
  const url = "https://api.spotify.com/v1/albums/" + id;
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
  if (responseStatus === 200) {
    return (
      <>
        <img src={data.images[0].url} className="card-img-top" alt=""></img>

        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Duration</th>
              <th scope="col">Preview</th>
              <th scope="col">Audio Analysis</th>
            </tr>
          </thead>
          <tbody>
            {data.tracks.items.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.duration_ms}</td>
                <td>
                  <audio controls>
                    <source src={item.preview_url} type="audio/ogg"></source>
                    <source src={item.preview_url} type="audio/mpeg"></source>
                    Your browser does not support the audio element.
                  </audio>
                </td>
                <td>
                  <a href={"/audio_analysis/" + item.id}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-graph-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return <ErrorScreen data={data} />;
};

export default Album;

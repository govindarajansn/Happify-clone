import Navbar from "./layout/Navbar.js";
import Home from "./components/Home.js";
import Album from "./components/Album.js";
import Artist from "./components/Artist.js";
import AudioAnalysis from "./components/AudioAnalysis.js";
import Playlist from "./components/Playlist.js";
import SearchedArtist from "./components/SearchedArtist.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

async function getToken() {
  const response = await fetch(
    "https://spotify-auth-sage.vercel.app/api/handler"
  );
  const data = await response.json();
  const accessToken = data.accessToken;
  return accessToken;
}

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
          const url = "https://api.spotify.com/v1/browse/new-releases?limit=3";
          const headerParameters = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`
          };
          const options = {
            method: "GET",
            headers: headerParameters
          };
          try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data.error && data.error.status === 401) {
              const token = await getToken(); // Replace with your token retrieval logic
              localStorage.setItem("accessToken", token);
              setToken(token);
            } else {
              setToken(storedToken);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          const token = await getToken(); // Replace with your token retrieval logic
          setToken(token);
          localStorage.setItem("accessToken", token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    retrieveToken();
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  const data = {
    access_token: `Bearer ${token}`
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/album/:id" element={<Album data={data} />} />
          <Route path="/artist/:id" element={<Artist data={data} />} />
          <Route
            path="/audio_analysis/:id"
            element={<AudioAnalysis data={data} />}
          />
          <Route path="/playlist/:id" element={<Playlist data={data} />} />
          <Route
            path="/searched_artist"
            element={<SearchedArtist data={data} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

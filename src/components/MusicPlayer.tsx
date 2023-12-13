import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { brandColor } from "../constants";
import { Box } from "@mantine/core";

const MusicPlayer = () => {
  const [play, setPlay] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [refreshToken, setRefreshToken] = useState(
    "AQBCSVL3fYRIoZFIhJzaW3QN155IYaNZpGlnIsO8emA38abMYYaCxe_9daN61-BHUCGe9dW4yxI336O-QldI9eXgxYT4J8Y4d0bbo6am4App9aVR7E7cM8zMSYDNacYLeu4"
  );
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isRefreshing) {
        setIsRefreshing(true);
        try {
          const response = await fetch("http://localhost:3000/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken,
            }),
          });
          const data = await response.json();
          setAccessToken(data.accessToken); // Update the state with the new access token
          setIsRefreshing(false);
        } catch (error) {
          console.error(error);
          setIsRefreshing(false);
        }
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://music-app-server-8mho.onrender.com/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken,
            }),
          }
        );
        const data = await response.json();
        setAccessToken(data.accessToken);
        setTimeout(() => {
          setIsRefreshing(false);
          //   setPlay(true);
        }, 3000);
      } catch (error) {
        console.error(error);
        setIsRefreshing(false);
      }
    })();
  }, []);
  return (
    <Box
    // display={isRefreshing ? "none" : "block"}
    >
      <SpotifyPlayer
        token={accessToken}
        layout="responsive"
        showSaveIcon
        locale={{}}
        play={play}
        styles={{
          activeColor: brandColor,
          bgColor: "#242424",
          color: brandColor,
          sliderHeight: 2,
          trackArtistColor: "#fff",
          trackNameColor: "#fff",
        }}
        hideAttribution
        name=""
        uris={[
          "spotify:track:1r8ZCjfrQxoy2wVaBUbpwg",
          "spotify:track:1KMkcUvF7m3SDChDOa7i5L",
          "spotify:track:4cxMGhkinTocPSVVKWIw0d",
          "spotify:track:4sx6NRwL6Ol3V6m9exwGlQ",
        ]}
      />
    </Box>
  );
};

export default MusicPlayer;

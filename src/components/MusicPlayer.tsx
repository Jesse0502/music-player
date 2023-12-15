import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { brandColor, gaySingerList } from "../constants";
import { Box, Button, Center, Modal, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  sendGaySongWarning,
  setAccessToken,
  setCurrentPlayingTrack,
  togglePlayerRuntime,
} from "../store/playerSlice";

const MusicPlayer = () => {
  const playerSlice = useSelector(
    (state: RootState) => state.player.currentTrackURI
  );

  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);

  const [isRefreshing, setIsRefreshing] = useState(true);
  const [refreshToken, setRefreshToken] = useState(
    "AQBCSVL3fYRIoZFIhJzaW3QN155IYaNZpGlnIsO8emA38abMYYaCxe_9daN61-BHUCGe9dW4yxI336O-QldI9eXgxYT4J8Y4d0bbo6am4App9aVR7E7cM8zMSYDNacYLeu4"
  );
  const accessToken = useSelector(
    (state: RootState) => state.player.accessToken
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(togglePlayerRuntime(true));
  }, [playerSlice]);
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
          dispatch(setAccessToken(data.accessToken));
          // setAccessToken(data.accessToken); // Update the state with the new access token
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
        // setAccessToken(data.accessToken);
        dispatch(setAccessToken(data.accessToken));

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
  const [showModal, setShowModal] = useState(false);
  const [handlePlayerSettings, setHandlePlayerSettings] = useState<any>(null);
  const handlePlayerCallback = (a: any) => {
    if (a.track.artists.some((i: any) => gaySingerList.includes(i.name))) {
      dispatch(setCurrentPlayingTrack(a.track.uri));
      handlePlayerSettings.pause();
      setShowModal(true);
    } else {
      dispatch(setCurrentPlayingTrack(a.track.uri));
    }
  };

  return (
    <Box
    // display={isRefreshing ? "none" : "block"}
    >
      <Modal
        opened={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        // title="Warning"
        centered
        style={{ textAlign: "center" }}
      >
        <Text style={{ fontSize: "28px", fontWeight: "bold" }}>
          GAY Alert!{" "}
        </Text>
        <Text style={{ fontSize: "18px", margin: "80px 0px" }}>
          This song contains GAY artists! Continue at your own risk.
        </Text>
        <Center style={{ fontSize: "12px", gap: "10px", marginTop: "20px" }}>
          <Button
            color="green"
            onClick={() => {
              handlePlayerSettings.nextTrack();
              dispatch(sendGaySongWarning(false));
              setShowModal(false);
            }}
          >
            Don't Play Song
          </Button>
          <Button
            color="red"
            onClick={() => {
              setShowModal(false);
              dispatch(sendGaySongWarning(false));
            }}
          >
            Keep Playing!
          </Button>
        </Center>
      </Modal>
      <SpotifyPlayer
        token={accessToken}
        layout="responsive"
        showSaveIcon
        getPlayer={(a) => setHandlePlayerSettings(a)}
        locale={{}}
        callback={(a) => handlePlayerCallback(a)}
        play={isPlaying}
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
        uris={playerSlice}
      />
    </Box>
  );
};

export default MusicPlayer;

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  Box,
  Burger,
  Button,
  Center,
  Drawer,
  Flex,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_LOGIN_CODE,
} from "../constants";
import SpotifyPlayer from "react-spotify-web-playback";
import { MusicControls } from "@awesome-cordova-plugins/music-controls";

const Home: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();

  const [play, setPlay] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToken, setRefreshToken] = useState(
    "AQCuLRfmB5mqn0-NjJxzRcVYbx0Dptrtya8tqFIalBX2R5OKOFh4S0-eDUBLO0zvqcmtLZr0Up-KVGK9NtP4gm12KHaPVuD5nD5xW7z-J8FPkx6wjQzXqzcGZw7pISPh71U"
  );
  const [accessToken, setAccessToken] = useState(
    "BQD2N-xMjx9qazTah-uEzk7p4dLHg-o1Vg65aNnHiZMqIdUPNOjbtoM5bL6nhNXKedrHpbIyG9joSyYtl_jgukh0Hlpy2_33c8oDQn34TEqDWAKhaWnxebSY5DxI_TLcWsHiH24-mtUUCRpjPT1TI3lluymJfx69H-CI9joEOErW9F8iXjUdKsIvyhJ92IsN_IjyTg-7n8_eXUGIYMR7riN84gZNyxl2n6M9gVjKxKZh9HAE2peh"
  );
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isRefreshing) {
        setIsRefreshing(true);
        try {
          const response = await fetch(
            "https://01c0-2401-4900-80a3-b0df-3900-ed37-3c8b-e630.ngrok-free.app/refresh",
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
          setAccessToken(data.accessToken); // Update the state with the new access token
          setIsRefreshing(false);
        } catch (error) {
          console.error(error);
          setIsRefreshing(false);
        }
      }
    }, 360000); // 3600000 milliseconds in 1 hour

    return () => clearInterval(interval);
  }, [refreshToken]); // On
  const [status, setStatus] = useState("someh");
  useEffect(() => {
    MusicControls.create({
      track: "Time is Running Out", // optional, default : ''
      artist: "Muse", // optional, default : ''
      album: "Absolution", // optional, default: ''
      cover:
        "https://eu-images.contentstack.com/v3/assets/blt6b0f74e5591baa03/blt8025f5a4bfcf840a/64c073ea83c49ef1bcb64cf9/AI_Text_Classifier_(1).png", // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //			 or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying: true, // optional, default : true
      dismissable: true, // optional, default : false

      // hide previous/next/close buttons:
      hasPrev: false, // show previous button, optional, default: true
      hasNext: false, // show next button, optional, default: true
      hasClose: true, // show close button, optional, default: false

      // iOS only, optional

      duration: 60, // optional, default: 0
      elapsed: 10, // optional, default: 0
      hasSkipForward: true, //optional, default: false. true value overrides hasNext.
      hasSkipBackward: true, //optional, default: false. true value overrides hasPrev.
      skipForwardInterval: 15, //optional. default: 0.
      skipBackwardInterval: 15, //optional. default: 0.
      hasScrubbing: false, //optional. default to false. Enable scrubbing from control center progress bar

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated
      ticker: 'Now playing "Time is Running Out"',
      //All icons default to their built-in android equivalents
      //The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
      playIcon: "media_play",
      pauseIcon: "media_pause",
      prevIcon: "media_prev",
      nextIcon: "media_next",
      closeIcon: "media_close",
      notificationIcon: "notification",
    })
      .then((res) => {
        setStatus(`here in then ${res}`);
      })
      .catch((err) => {
        setStatus(`"ehre in catch", ${err}`);
      });

    // return () => MusicControls.destroy();
  }, []);
  return (
    <IonPage>
      <IonHeader style={{ backgroundColor: "black" }}>
        <IonToolbar style={{ backgroundColor: "black" }}>
          <Flex
            pos={"static"}
            h="50px"
            bg="#242424"
            align={"center"}
            // px="-10px"
          >
            <Drawer
              opened={opened}
              onClose={toggle}
              size={"xs"}
              title={<Text>Menu</Text>}
            ></Drawer>
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
          </Flex>
          {/* <IonTitle>Header</IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Box h="100%">
          <Center h="100vh" bg="#242424">
            <Button
              size="xl"
              color="green"
              onClick={() => window.open(SPOTIFY_AUTH_URL, "_system")}
            >
              Login With Spotify
            </Button>
          </Center>
        </Box>
        {status}
        <SpotifyPlayer
          token={accessToken}
          // layout="responsive"
          showSaveIcon
          locale={{}}
          play={play}
          styles={{
            activeColor: "#ff4961",
            bgColor: "#242424",
            // height: 50,
            color: "#ff4961",
            sliderHeight: 2,
            trackArtistColor: "#fff",
            trackNameColor: "#fff",
          }}
          hideAttribution
          hideCoverArt
          name=""
          uris={[
            "spotify:track:4cxMGhkinTocPSVVKWIw0d",
            "spotify:track:1KMkcUvF7m3SDChDOa7i5L",
            "spotify:track:4sx6NRwL6Ol3V6m9exwGlQ",
            "spotify:track:1r8ZCjfrQxoy2wVaBUbpwg",
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;

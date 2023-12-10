import {
  IonAlert,
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
  Image,
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
          <Image
            src={
              "https://eu-images.contentstack.com/v3/assets/blt6b0f74e5591baa03/blt8025f5a4bfcf840a/64c073ea83c49ef1bcb64cf9/AI_Text_Classifier_(1).png"
            }
          />
        </Box>
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

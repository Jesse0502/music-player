import {
  IonContent,
  IonIcon,
  IonPage,
  IonRouterLink,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
  brandColor,
  darkThemebg,
  playlistTracks,
  reccomendations,
} from "../constants";
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
} from "@mantine/core";
import {
  playCircle,
  arrowBackCircle,
  arrowBack,
  arrowBackOutline,
  search,
  shuffle,
  shuffleOutline,
  shuffleSharp,
  play,
  pause,
} from "ionicons/icons";
import MusicPlayer from "../components/MusicPlayer";
import SingleTrack from "../components/SingleTrack";

const Playlist = () => {
  const router = useIonRouter();
  const [playlistInfo, setPlaylistInfo] = useState(
    reccomendations.content.items.find(
      (i) =>
        i?.content?.items[0]?.id === router.routeInfo.pathname.split("/")[2]
    )
  );
  useEffect(() => {
    (async () => {
      const playlistId = router.routeInfo.pathname.split("/")[2];
      // const playlistInfo =
      const url =
        "https://spotify23.p.rapidapi.com/playlist_tracks/?id=" +
        playlistId +
        "&offset=0&limit=100";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7c32b94251mshcddfc80855224dfp14b29ajsn2f1b6a3b5141",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };

      try {
        //   const response = await fetch(url, options);
        //   const result = await response.text();
        //   console.log(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  // playlistTracks;

  return (
    <IonPage>
      <IonContent fullscreen>
        <Box style={{ backgroundColor: darkThemebg }}>
          <Flex
            style={{ zIndex: 9999, backgroundColor: brandColor }}
            pos="sticky"
            top={0}
            py="md"
            justify={"space-between"}
            px="md"
          >
            <IonIcon
              onClick={() =>
                router.canGoBack() ? router.goBack() : router.push("/home")
              }
              icon={arrowBackOutline}
              style={{ color: "white", fontSize: "20px" }}
            />
            <IonIcon
              onClick={() => {
                router.push("/search");
              }}
              icon={search}
              style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
            />
          </Flex>
          <Center
            // h="200"
            style={{
              backgroundImage: `linear-gradient(180deg, ${brandColor},${darkThemebg},${darkThemebg})`,
              flexDirection: "column",
            }}
          >
            <Image
              style={{
                borderRadius: "10px",
              }}
              h="200"
              w="200"
              src={playlistInfo?.content?.items[0]?.images[0]?.url}
            />
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: "14px",
                fontStyle: "oblique",
                opacity: "0.9",
              }}
              pt="md"
              px="xl"
            >
              {playlistInfo?.content?.items[0]?.description}
            </Text>
            <Flex
              w="100%"
              pt="lg"
              justify={"space-between"}
              style={{ padding: "0px 20px", alignItems: "center" }}
            >
              <IonIcon
                icon={shuffleOutline}
                style={{ color: "white", fontSize: "35px" }}
              ></IonIcon>
              <IonIcon
                icon={playCircle}
                style={{
                  color: brandColor,
                  fontSize: "65px",
                  transition: "transform 0.2s ease-in-out",
                  transform: "scale(1)",
                  ":hover": { transform: "scale(1.1)" },
                  //   transform: isHovered === i.id ? "scale(1.1)" : "scale(1)",
                }}
              ></IonIcon>
            </Flex>
          </Center>

          <Box px="lg" py="xl" pos={"relative"}>
            {playlistTracks.items.map((i) => (
              <SingleTrack trackData={i} />
            ))}
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Playlist;

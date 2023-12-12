import { IonContent, IonIcon, IonRouterLink, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { darkThemebg, playlistTracks, reccomendations } from "../constants";
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
} from "ionicons/icons";
import MusicPlayer from "../components/MusicPlayer";

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
    <IonContent fullscreen>
      <Box style={{ backgroundColor: darkThemebg }}>
        <Flex
          style={{ zIndex: 9999 }}
          pos="sticky"
          bg={darkThemebg}
          top={0}
          py="md"
          justify={"space-between"}
          px="md"
        >
          <IonRouterLink href={"/home"}>
            <IonIcon
              icon={arrowBackOutline}
              style={{ color: "white", fontSize: "20px" }}
            />
          </IonRouterLink>
          <IonRouterLink href={"/search"}>
            <IonIcon
              icon={search}
              style={{ color: "white", fontSize: "20px" }}
            />
          </IonRouterLink>
        </Flex>
        <Center h="200">
          <Image
            style={{ borderRadius: "10px" }}
            h="200"
            w="200"
            src={playlistInfo?.content?.items[0]?.images[0]?.url}
          />
        </Center>
        <Text style={{ textAlign: "center", color: "white" }} pt="md" px="lg">
          {playlistInfo?.content?.items[0]?.description}
        </Text>
        <Flex
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
              color: "#1db954",
              fontSize: "65px",
              transition: "transform 0.2s ease-in-out",
              //   transform: isHovered === i.id ? "scale(1.1)" : "scale(1)",
            }}
          ></IonIcon>
        </Flex>
        <Box px="lg" py="xl" pos={"relative"}>
          {playlistTracks.items.map((i) => (
            <Flex py="sm" align={"center"}>
              <Image h="80" src={i.track.album.images[0].url} />
              <Box style={{ color: "white", paddingLeft: "10px" }}>
                <Text style={{ fontSize: "18px" }}>{i.track.album.name}</Text>
                <Flex gap={5}>
                  {i.track.album.artists.map((a, i, total) => (
                    <>
                      <Text style={{ fontSize: "14px", opacity: 0.5 }}>
                        {a.name}
                        {i === total.length - 1 ? "" : ","}
                      </Text>
                    </>
                  ))}
                </Flex>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </IonContent>
  );
};

export default Playlist;

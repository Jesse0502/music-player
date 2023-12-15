import { IonContent, IonIcon, IonPage, useIonRouter } from "@ionic/react";
import {
  Avatar,
  BackgroundImage,
  Box,
  Center,
  Collapse,
  Flex,
  Image,
  LoadingOverlay,
  Pill,
  ScrollArea,
  Text,
} from "@mantine/core";
import { arrowBackOutline, pause, play } from "ionicons/icons";
import { useEffect, useState } from "react";
import {
  brandColor,
  darkThemebg,
  fakeArtistData,
  gaySingerList,
} from "../constants";
import { addTrackToPlayer, setCurrentPlayingTrack } from "../store/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
const Artist = () => {
  const [artistData, setArtistData] = useState(fakeArtistData.data.artist);
  const currentPlayingTrack = useSelector(
    (state: RootState) => state.player.currentPlayingTrack
  );
  const [isGay, setIsGay] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const artistId = router.routeInfo.pathname.split("/")[2];

      const url = `https://spotify23.p.rapidapi.com/artist_overview/?id=${artistId}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setArtistData(result.data.artist);
        setIsGay(gaySingerList.includes(result.data.artist.profile.name));
        // setLoading(false);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    })();
  }, []);
  const dispatch = useDispatch();
  const router = useIonRouter();
  const [lineClamp, setLineClamp] = useState(2);
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 9 }}
          />
          <Box
            style={{
              backgroundImage: `linear-gradient(180deg, ${brandColor},${darkThemebg},${darkThemebg})`,
              minHeight: "90vh",
              color: "white",
              paddingBottom: "200px",
              position: "relative",
            }}
          >
            <BackgroundImage
              src={artistData?.visuals?.headerImage?.sources?.[0]?.url}
            >
              <Box bg="rgba(0,0,0,0.5)">
                <Flex
                  pt="md"
                  // bg={brandColor}
                  style={{ zIndex: 99999 }}
                  pb={"md"}
                  pos={"sticky"}
                  top={0}
                  px="md"
                >
                  <IonIcon
                    onClick={() =>
                      router.canGoBack()
                        ? router.goBack()
                        : router.push("/home")
                    }
                    icon={arrowBackOutline}
                    style={{ color: "white", fontSize: "20px" }}
                  />
                </Flex>
                <Center style={{ flexDirection: "column" }} pt="lg">
                  <Avatar
                    style={{
                      height: "160px",
                      width: "160px",
                    }}
                    src={`${artistData?.visuals?.avatarImage?.sources[0].url}`}
                  ></Avatar>
                  <Text mt="lg" style={{ fontWeight: "bold" }}>
                    {artistData.profile.name}
                  </Text>
                  <Center pos="relative">
                    <Text
                      mx={"sm"}
                      my="sm"
                      p="xs"
                      bg={
                        isGay
                          ? "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)"
                          : "gray"
                      }
                      lineClamp={lineClamp}
                      style={{
                        textAlign: "center",
                        borderRadius: "10px",
                      }}
                    >
                      {isGay ? "Gay" : "Not Gay"}
                    </Text>
                  </Center>
                </Center>
              </Box>
            </BackgroundImage>
            <Box px="lg" mt={"xl"}>
              <Text
                style={{
                  fontSize: "35px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Top Songs
              </Text>

              {artistData.discography.topTracks.items.map((i) => (
                <Flex
                  my="sm"
                  onClick={() => {
                    dispatch(setCurrentPlayingTrack(i.track.uri));
                    dispatch(addTrackToPlayer(i.track.uri));
                  }}
                >
                  <BackgroundImage
                    h="70"
                    w="70"
                    src={i.track.album.coverArt.sources[0].url}
                  >
                    <Center
                      style={{ background: "rgba(0,0,0,0.25)" }}
                      h="100%"
                      w="100%"
                    >
                      <IonIcon
                        style={{ color: "white", fontSize: "30px" }}
                        icon={
                          // trackData.track.uri === currentPlayingTrack
                          i.track.uri === currentPlayingTrack ? pause : play
                        }
                      />
                    </Center>
                  </BackgroundImage>
                  <Flex
                    style={{
                      color: "white",
                      paddingLeft: "10px",
                      flexDirection: "column",
                      //   alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: "18px", fontWeight: "bold" }}
                      lineClamp={1}
                    >
                      {i.track.name}
                    </Text>
                    <Flex gap={5}>
                      <Text style={{ fontSize: "14px", opacity: 0.5 }}>
                        {artistData.profile.name}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
              <Text
                mt="xl"
                style={{ fontSize: "35px", textDecoration: "underline" }}
              >
                Albums
              </Text>
              <ScrollArea mt="lg" scrollbars="x" scrollbarSize={"0"}>
                <Flex
                  direction="row"
                  wrap={"nowrap"}
                  px="md"
                  gap={16}
                  align={"start"}
                  style={{
                    width:
                      artistData.discography.albums.items.length * 300 + "px",
                    margin: "0 auto",
                  }}
                >
                  {artistData.discography.albums.items.map((i) => (
                    <Center
                      //   h="300px"
                      w="300px"
                      style={{ flexDirection: "column" }}
                    >
                      <Image
                        style={{ boxShadow: "1px 2px 10px black" }}
                        h="300px"
                        w="300px"
                        // style={{ objectFit: "cover" }}
                        src={i.releases.items[0].coverArt.sources[0].url}
                      />
                      <Text mt="xs">{i.releases.items[0].name}</Text>
                    </Center>
                  ))}
                </Flex>
              </ScrollArea>
              <Box>
                <Text style={{ fontSize: "35px", textDecoration: "underline" }}>
                  Places
                </Text>
                {artistData.stats.topCities.items.map((i) => (
                  <Flex my="md" gap="sm" align={"center"}>
                    <Avatar
                      h="140px"
                      w="140px"
                      style={{ borderRadius: 0, objectFit: "contain" }}
                    >
                      {i.city}
                    </Avatar>
                    <Box>
                      <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {i.city}
                      </Text>
                      <Text fz="xs" mt="xs" style={{ fontWeight: "lighter" }}>
                        <span style={{ fontSize: "14px" }}>
                          {" "}
                          {i.numberOfListeners}
                        </span>{" "}
                        listeners
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Box>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Artist;

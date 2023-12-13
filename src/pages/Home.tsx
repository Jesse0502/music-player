import {
  IonAlert,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonRouterLink,
  IonTabButton,
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
  NavLink,
  ScrollArea,
  Switch,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_LOGIN_CODE,
  brandColor,
  darkThemebg,
  gaySingerList,
  reccomendations,
  topTrackReccomendations,
} from "../constants";
import HomeHeader from "../components/Home/Header";
import MusicPlayer from "../components/MusicPlayer";
import { Router } from "react-router";

const Home: React.FC = () => {
  const [list, setList] = useState(reccomendations.content.items);
  const [gayFilter, setGayFilter] = useState<boolean | undefined>(false);
  useEffect(() => {
    (async () => {
      const url =
        "https://spotify23.p.rapidapi.com/genre_view/?id=0JQ5DAqbMKFEC4WFtoNRpw&content_limit=10&limit=10";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7c32b94251mshcddfc80855224dfp14b29ajsn2f1b6a3b5141",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };

      try {
        // const response = await fetch(url, options);
        // const result = await response.text();
        // setList(result.content.items);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const [contentOpacity, setContentOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState("");
  const toggleGayFilter = (val: boolean) => {
    setGayFilter(val);
    let flickerOpacityValues = [1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.2, 0.4, 0.6, 0.9];
    let flickerOpacityIndex = 0;
    let flickerInterval: any;

    function flickerSwitch() {
      if (flickerOpacityIndex >= flickerOpacityValues.length) {
        flickerOpacityIndex = 0;
      }

      setContentOpacity(flickerOpacityValues[flickerOpacityIndex]);
      flickerOpacityIndex++;

      if (flickerOpacityIndex >= 10) {
        // Stop after 5 iterations
        clearInterval(flickerInterval);
        setContentOpacity(1);
      }
    }

    flickerInterval = setInterval(flickerSwitch, 50);
  };

  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen onIonScrollStart={() => console.log("scrolling")}>
        <Box
          pos="relative"
          style={{
            backgroundImage: darkThemebg,
          }}
        >
          <HomeHeader />
          <Box
            // onScroll={(e) => console.log(e.cli)}
            style={{
              minHeight: "100vh",
              overflow: "hidden",
              paddingTop: "10px",
              paddingBottom: "150px",
              backgroundImage: `linear-gradient(180deg, ${brandColor},${darkThemebg},${darkThemebg})`,
            }}
          >
            <Flex align="center" gap={"sm"} justify={"end"} px="lg">
              <Text style={{ color: "white" }}>Gay Filter</Text>
              <Switch
                defaultChecked={gayFilter}
                onChange={(e) => {
                  toggleGayFilter(e.target.checked);
                }}
              />
            </Flex>
            <Box
              style={{
                opacity: contentOpacity,
              }}
            >
              <Text
                pl="xl"
                pt="xl"
                fw={"bold"}
                style={{ color: "white", fontSize: "25px" }}
              >
                Trending Playlists
              </Text>
              <ScrollArea scrollbars="x" scrollbarSize={"0"}>
                <Flex
                  gap={"lg"}
                  style={{ overflowX: "auto", overflowY: "clip" }}
                  // mt="lg"
                  px="xl"
                  h="300px"
                  align={"center"}
                >
                  {list.map((i) => (
                    <Box
                      display={i?.content?.items[0]?.uri ? "block" : "none"}
                      h="max"
                      onClick={() => {
                        router.push("/playlist/" + i?.content?.items[0]?.id);
                      }}
                    >
                      <IonImg
                        onMouseLeave={() => {
                          setIsHovered("");
                        }}
                        onMouseEnter={() => {
                          setIsHovered(i.id);
                        }}
                        // onClick={() => {
                        //   router.push("/playlist/" + i?.content?.items[0]?.id);
                        // }}
                        style={{
                          height: "230px",
                          width: "230px",
                          borderRadius: "10px",
                          transition: "transform 0.2s ease-in-out",
                          transform:
                            isHovered === i.id ? "scale(1.2)" : "scale(1)",
                          boxShadow: "2px 4px 5px rgba(0,0,0,0.55)",
                          cursor: "pointer",
                        }}
                        src={
                          i.images[0]?.url ?? i.content.items[0].images[0].url
                        }
                      />
                      {/* <Text>{i?.content?.items[0]?.uri}</Text> */}
                    </Box>
                  ))}
                </Flex>
              </ScrollArea>
              <Text
                pl="xl"
                pt="xl"
                fw={"bold"}
                style={{ color: "white", fontSize: "25px" }}
              >
                Top Songs
              </Text>
              <ScrollArea mt="lg" scrollbars="x" scrollbarSize={"0"}>
                <Flex
                  direction="row"
                  wrap={"wrap"}
                  px="md"
                  gap={16}
                  style={{
                    width: "1290px",
                    margin: "0 auto",
                  }}
                >
                  {topTrackReccomendations.tracks.map((t, index) => (
                    <Flex
                      component="div"
                      gap={"md"}
                      w="300px"
                      opacity={
                        t.artists.some((i) => gaySingerList.includes(i.name))
                          ? 0.25
                          : 1
                      }
                    >
                      <Image h="60" w="60" src={t.album.images[0].url} />
                      <Box style={{ color: "white", width: "300px" }}>
                        <Text
                          lineClamp={1}
                          style={{
                            width: "200px",
                            fontSize: "18px",
                          }}
                        >
                          {t.album.name}
                        </Text>
                        <Flex>
                          {/* {t.artists.map((a, i) => ( */}
                          <Text
                            style={{
                              fontSize: "14px",
                              opacity: 0.3,
                              marginRight: "5px",
                            }}
                          >
                            {t.artists[0].name}
                            {t.artists.length > 1 && ","}
                          </Text>
                          {t.artists.length > 1 && (
                            <>
                              <Text
                                style={{
                                  fontSize: "14px",
                                  opacity: 0.3,
                                  marginRight: "4px",
                                }}
                              >
                                {t.artists[1].name}
                                {t.artists.length > 3 && ","}
                              </Text>
                            </>
                          )}
                          {t.artists.length > 3 && (
                            <>
                              <Text style={{ fontSize: "14px", opacity: 0.3 }}>
                                ({t.artists.length - 2} more)
                              </Text>
                            </>
                          )}
                          {/* ))} */}
                        </Flex>
                      </Box>
                    </Flex>
                  ))}
                </Flex>
              </ScrollArea>
            </Box>
          </Box>

          {/* <Box pos="sticky" bottom={0} h="max" w="full" bg="white">
            <MusicPlayer />
          </Box> */}
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Home;

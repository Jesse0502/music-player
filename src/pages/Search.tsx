import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  Autocomplete,
  Avatar,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Image,
  Skeleton,
  Text,
} from "@mantine/core";
import {
  darkThemebg,
  gaySingerList,
  searchResults as ssresults,
} from "../constants";
import MusicPlayer from "../components/MusicPlayer";
import { useState } from "react";
import { pause, play, search } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToPlayer, setCurrentPlayingTrack } from "../store/playerSlice";
import { RootState } from "../store/store";

const Search: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState<any>({});
  const [searching, setSearching] = useState(false);
  const router = useIonRouter();
  const dispatch = useDispatch();
  const currentPlayingTrack = useSelector(
    (state: RootState) => state.player.currentPlayingTrack
  );
  const clickActionForItems = (uri: string) => {
    if (uri.includes("track")) {
      dispatch(addTrackToPlayer(uri));
      dispatch(setCurrentPlayingTrack(uri));
    } else if (uri.includes("playlist")) {
      router.push("/playlist/" + uri.split("playlist:")[1]);
    } else if (uri.includes("artist")) {
      router.push("/artist/" + uri.split("artist:")[1]);
    }
  };

  const searchContent = async (val: string) => {
    setSearchVal(val);
    const url = `https://spotify23.p.rapidapi.com/search/?q=${val}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      setSearching(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setSearching(false);
      setSearchResults(result);
    } catch (error) {
      console.error(error);
    }
  };
  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <IonContent fullscreen>
        <Box
          pb="20vh"
          bg={darkThemebg}
          pos="relative"
          style={{
            backgroundColor: darkThemebg,
          }}
        >
          <Box
            style={{
              position: "sticky",
              top: "0",
              background: darkThemebg,
              zIndex: 9999,
            }}
            py="lg"
          >
            <Autocomplete
              px="md"
              onChange={(e) => {
                setSearchText(e);
              }}
              // label="Your favorite library"
              placeholder="Search Anything"
              rightSection={
                <IonIcon
                  style={{ fontSize: "20px" }}
                  onClick={() => searchContent(searchText)}
                  icon={search}
                ></IonIcon>
              }
              // data={["React", "Angular", "Vue", "Svelte"]}
            />
          </Box>
          <Box style={{ minHeight: "90vh" }} px="lg" pt="lg">
            {searchVal && (
              <Text
                style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
              >
                Results for "{searchVal}"
              </Text>
            )}
            {searching &&
              Array.from({ length: 20 }).map((i) => (
                <Skeleton my="sm">
                  <Box h="70"></Box>
                </Skeleton>
              ))}
            {searchResults?.topResults?.items.map((a: any) => (
              <Flex
                mt="md"
                gap="sm"
                align={"center"}
                onClick={() => clickActionForItems(a.data.uri)}
              >
                <BackgroundImage
                  h="70"
                  w="70"
                  src={`${
                    a.data.images?.items[0].sources[0].url ||
                    a.data.coverArt?.sources[0].url ||
                    a.data.visuals?.avatarImage.sources[0].url ||
                    a.data.albumOfTrack?.coverArt.sources[0].url
                  }`}
                  style={{
                    borderRadius: a.data.uri.includes("artist") ? "200px" : "",
                  }}
                >
                  {a.data.uri.includes("track") && (
                    <Center
                      style={{ background: "rgba(0,0,0,0.33)" }}
                      h="100%"
                      w="100%"
                    >
                      <IonIcon
                        style={{ color: "white", fontSize: "30px" }}
                        icon={currentPlayingTrack === a.data.uri ? pause : play}
                      />
                    </Center>
                  )}
                </BackgroundImage>
                {/* <Image
                  h={"80"}
                  w="80"
                  style={{
                    borderRadius: a.data.uri.includes("artist") ? "200px" : "",
                  }}
                  src={
                    a.data.images?.items[0].sources[0].url ||
                    a.data.coverArt?.sources[0].url ||
                    a.data.visuals?.avatarImage.sources[0].url ||
                    a.data.albumOfTrack?.coverArt.sources[0].url
                  }
                /> */}
                <Box>
                  <Text
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {a.data.name ||
                      a.data.profile?.name ||
                      a.data.albumOfTrack?.name}{" "}
                    {gaySingerList.includes(
                      `${
                        a.data.name ||
                        a.data.profile?.name ||
                        a.data.albumOfTrack?.name
                      }`
                    ) && "(GAY)"}
                  </Text>
                  {a.data.artists?.items.map((artist: any) => (
                    <Text
                      style={{ color: "white", fontSize: "15px", opacity: 0.6 }}
                    >
                      {artist.profile.name}{" "}
                      {gaySingerList.includes(`${artist.profile.name}`) &&
                        "(GAY)"}
                    </Text>
                  ))}
                </Box>
              </Flex>
            ))}
            {searchResults?.artists?.items.map((a: any) => (
              <Flex
                mt="md"
                gap="sm"
                onClick={() => clickActionForItems(a.data.uri)}
                align={"center"}
                style={{}}
              >
                <Avatar
                  h={"80"}
                  w="80"
                  src={a.data.visuals.avatarImage?.sources[0].url}
                />
                <Box>
                  <Text
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {a.data.profile.name}{" "}
                    {gaySingerList.includes(`${a.data.profile.name}`) &&
                      "(GAY)"}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Search;

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
  Modal,
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
import TrendingPlaylists from "../components/Home/TrendingPlaylists";
import TopSongs from "../components/Home/TopSongs";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Home: React.FC = () => {
  const [gayFilter, setGayFilter] = useState<boolean | undefined>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const [contentOpacity, setContentOpacity] = useState(1);
  const toggleGayFilter = (val: boolean) => {
    setGayFilter(val);
    if (!val) open();
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

  return (
    <IonPage>
      <IonContent fullscreen onIonScrollStart={() => console.log("scrolling")}>
        <Modal
          style={{ textAlign: "center" }}
          centered
          opened={opened}
          onClose={close}
          title="Notification"
        >
          <Text style={{ fontSize: "30px", color: "red" }}>Warning! 😳</Text>
          <Text style={{ fontSize: "16px", marginTop: "10px" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor iste
            praesentium dolores incidunt asperiores placeat aperiam, laborum,
            labore neque esse assumenda quasi reprehenderit tenetur veniam
            animi, nesciunt laboriosam quas eaque.
          </Text>
        </Modal>
        <Box
          pos="relative"
          style={{
            backgroundImage: darkThemebg,
          }}
        >
          {/* <HomeHeader /> */}
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
            <Text fz="50px" px="lg" style={{ color: "white" }}>
              Welcome, Stranger{" "}
            </Text>
            {/* <Text px="lg" fz="20px" style={{ color: "white", opacity: 0.4 }}>
              (Gays not allowed)
            </Text> */}
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
              <TrendingPlaylists />
              <Text
                pl="xl"
                pt="xl"
                fw={"bold"}
                style={{ color: "white", fontSize: "25px" }}
              >
                Top Songs
              </Text>
              <TopSongs />
            </Box>
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Home;

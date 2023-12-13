import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Tab1 from "../pages/Home";
import Tab2 from "../pages/Search";
import Tab3 from "../pages/Profile";
import {
  home,
  homeOutline,
  personCircle,
  personCircleOutline,
  search,
  searchOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import { brandColor, darkThemebg } from "../constants";
import MusicPlayer from "./MusicPlayer";
import { Box, Flex, Text } from "@mantine/core";
import Playlist from "../pages/Playlist";

const Footer = () => {
  const [currentTab, setCurrentTab] = useState("home");
  return (
    <>
      {/* <MusicPlayer /> */}

      <IonReactRouter>
        <IonTabs
          onIonTabsDidChange={(e) => {
            setCurrentTab(e.detail.tab);
          }}
        >
          {/* <MusicPlayer /> */}
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />

              {/* <MusicPlayer /> */}
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/playlist/:id">
              <Playlist />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar
            slot="bottom"
            style={{
              background: darkThemebg,
              padding: "12px",
              borderColor: darkThemebg,
              // borderRadius: "20px",
            }}
          >
            <IonTabButton
              mode="ios"
              tab="home"
              href="/home"
              style={{ background: darkThemebg }}
            >
              <IonIcon
                aria-hidden="true"
                style={{
                  background: darkThemebg,
                  color: currentTab === "home" ? brandColor : "grey",
                }}
                icon={home}
              />
            </IonTabButton>
            <IonTabButton
              mode="ios"
              tab="search"
              style={{
                background: darkThemebg,
                color: currentTab === "search" ? brandColor : "grey",
              }}
              href="/search"
            >
              <IonIcon aria-hidden="true" icon={search} />
            </IonTabButton>
            <IonTabButton
              mode="ios"
              style={{
                background: darkThemebg,
                color: currentTab === "profile" ? brandColor : "grey",
              }}
              tab="profile"
              href="/profile"
            >
              <IonIcon aria-hidden="true" icon={personCircle} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <Box pos="absolute" bottom={70} h="max" w="100%" bg="white">
        <MusicPlayer />
      </Box>
    </>
  );
};

export default Footer;

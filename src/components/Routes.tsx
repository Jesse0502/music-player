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
import { useState } from "react";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";

const Footer = () => {
  const [currentTab, setCurrentTab] = useState("home");
  return (
    <>
      <IonReactRouter>
        <IonTabs
          onIonTabsDidChange={(e) => {
            setCurrentTab(e.detail.tab);
          }}
        >
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon
                aria-hidden="true"
                icon={currentTab === "home" ? home : homeOutline}
              />
            </IonTabButton>
            <IonTabButton tab="search" href="/search">
              <IonIcon
                aria-hidden="true"
                icon={currentTab === "search" ? search : searchOutline}
              />
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon
                aria-hidden="true"
                icon={
                  currentTab === "profile" ? personCircle : personCircleOutline
                }
              />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </>
  );
};

export default Footer;

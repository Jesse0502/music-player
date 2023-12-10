import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  home,
  homeOutline,
  searchOutline,
  square,
  triangle,
  personCircle,
  personCircleOutline,
} from "ionicons/icons";
import Tab1 from "./pages/Home";
import Tab2 from "./pages/Search";
import Tab3 from "./pages/Profile";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "@mantine/core/styles.css";
import { MantineProvider, Text, createTheme } from "@mantine/core";
import Routes from "./components/Routes";
import AppHeader from "./components/AppHeader";

setupIonicReact();
const App: React.FC = () => {
  const theme = createTheme({
    fontFamily: "Montserrat, sans-serif",
    defaultRadius: "md",
    colors: {
      brand: [
        "#ff4961",
        "#ff4961",
        "#ff4961",
        "#ff4961",
        "#ff4961",
        "#ff4961",
        "#ff4961",
        "#ff4961",
        "#ff4961",
        "#ff4961",
        "#ff4961",
      ],
    },
    primaryColor: "brand",
  });
  return (
    <IonApp>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        {/* <AppHeader /> */}

        <Routes />
      </MantineProvider>
    </IonApp>
  );
};

export default App;

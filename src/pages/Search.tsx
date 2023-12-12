import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Autocomplete, Box, Text } from "@mantine/core";
import { darkThemebg } from "../constants";
import MusicPlayer from "../components/MusicPlayer";

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box
          bg={darkThemebg}
          pos="relative"
          style={{
            backgroundColor: darkThemebg,
          }}
        >
          <Autocomplete
            px="md"
            pt="lg"
            // label="Your favorite library"
            placeholder="Search Anything"
            data={["React", "Angular", "Vue", "Svelte"]}
          />
          <Box h={"90vh"}></Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Search;

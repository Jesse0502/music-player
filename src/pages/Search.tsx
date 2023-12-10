import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Box, Text } from "@mantine/core";

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box>
          <Text size="xl">Search</Text>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Search;

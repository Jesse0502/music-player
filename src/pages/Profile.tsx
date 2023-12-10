import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Box, Text } from "@mantine/core";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box>
          <Text size="xl">Profile</Text>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

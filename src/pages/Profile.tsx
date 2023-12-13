import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { Avatar, Box, Button, Center, Flex, Image, Text } from "@mantine/core";
import MusicPlayer from "../components/MusicPlayer";
import { brandColor, darkThemebg } from "../constants";
import { arrowBackOutline } from "ionicons/icons";

const Profile: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box
          style={{
            backgroundImage: `linear-gradient(180deg, ${brandColor},${darkThemebg},${darkThemebg})`,
            minHeight: "90vh",
            color: "white",
          }}
        >
          <Flex pt="lg" pb={"md"} px="md">
            <IonIcon
              onClick={() =>
                router.canGoBack() ? router.goBack() : router.push("/home")
              }
              icon={arrowBackOutline}
              style={{ color: "white", fontSize: "20px" }}
            />
          </Flex>
          <Center style={{ flexDirection: "column", paddingBottom: "20vh" }}>
            <Avatar
              style={{
                height: "150px",
                width: "150px",
              }}
            ></Avatar>
            <Text mt="md" style={{ fontWeight: "bold" }}>
              JS
            </Text>

            <Text mt="50px" style={{ fontSize: "20px", fontWeight: "bold" }}>
              About
            </Text>
            <Text
              mt="10"
              opacity={0.8}
              px="lg"
              style={{ fontSize: "14px", textAlign: "center" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, sint
              iusto corrupti adipisci obcaecati enim distinctio consectetur
              culpa sapiente? Corporis dicta voluptate ipsum, saepe cupiditate,
              eligendi consectetur et nostrum reiciendis, sed labore ipsa!
              Aliquid ipsa repellat impedit adipisci ex exercitationem. Ab,
              eveniet eos. Unde id facilis illum, pariatur maxime nemo!
            </Text>
            <Button mt="lg">Logout</Button>
          </Center>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

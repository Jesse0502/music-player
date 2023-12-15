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
              Bless your heart now, honey! This app is for folks who appreciate
              a good giggle and a touch of creativity, y'all hear? We ain't in
              the business of hurtin' feelings, bless my buttons! We're like a
              porch swing on a Sunday afternoon – just here to watch the world
              go by and maybe share a few laughs along the way. Now, I know some
              folks might get their feathers ruffled, but that's just life,
              ain't it? We can't all be sugar and spice and nothin' twice. But
              don't you fret, darlin'! Just remember, this app's like a glass of
              sweet tea – best enjoyed cold and with a whole lotta kindness. So
              pour yourself a glass, put on your dancin' shoes, and let's have a
              hootenanny without steppin' on any toes, okay?
            </Text>
            {/* <Button mt="lg">Logout</Button> */}
          </Center>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

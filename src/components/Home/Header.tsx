import { IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import { Avatar, Burger, Drawer, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { brandColor, darkThemebg } from "../../constants";
import {
  home,
  homeOutline,
  personCircle,
  personCircleOutline,
  search,
  searchOutline,
} from "ionicons/icons";
const HomeHeader = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      {" "}
      {/* <IonHeader style={{ backgroundColor: "black" }}>
        <IonToolbar style={{ backgroundColor: "black" }}> */}
      <Flex
        pos={"sticky"}
        top={0}
        style={{ zIndex: 999999 }}
        h="60px"
        px={"sm"}
        bg={darkThemebg}
        align={"center"}
        // px="-10px"
      >
        <Drawer
          opened={opened}
          onClose={toggle}
          size={"xs"}
          title={
            <Text size="xl" fw={"bold"}>
              Menu
            </Text>
          }
        ></Drawer>
        <Flex justify={"space-between"} w="100%">
          <Avatar onClick={toggle} bg={brandColor}>
            JS
          </Avatar>
          <IonIcon
            icon={searchOutline}
            style={{ fontSize: "25px", color: "white" }}
          />
        </Flex>
        {/* <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
        /> */}
      </Flex>
      {/* <IonTitle>Header</IonTitle> */}
      {/* </IonToolbar>
      </IonHeader> */}
    </>
  );
};

export default HomeHeader;

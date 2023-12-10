import { IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import {
  Drawer,
  Flex,
  Text,
  AppShellHeader,
  AppShell,
  Burger,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { menu, search } from "ionicons/icons";

const AppHeader = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <IonHeader>
      <Flex h="50px" bg="#242424" align={"center"} px="1px">
        <Drawer
          opened={opened}
          onClose={toggle}
          size={"xs"}
          //   offset={20}
          title={<Text>Menu</Text>}
        ></Drawer>
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
        />
        {/* <IonIcon
          style={{ fontSize: "35px" }}
          icon={menu}
          onClick={toggle}
        ></IonIcon> */}
        {/* <Drawer opened></Drawer> */}
        {/* <div>Logo</div> */}
      </Flex>
    </IonHeader>
  );
};

export default AppHeader;

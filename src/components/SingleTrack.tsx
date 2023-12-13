import { IonIcon } from "@ionic/react";
import { BackgroundImage, Box, Center, Flex, Text } from "@mantine/core";
import { pause, play } from "ionicons/icons";

const SingleTrack = ({ trackData }: { trackData: any }) => {
  return (
    <Flex
      my="sm"
      align={"center"}
      bg="rgba(255, 255, 255, 0.10)"
      style={{ borderRadius: "10px" }}
    >
      {/* <Center> */}
      <BackgroundImage h="70" w="70" src={trackData.track.album.images[0].url}>
        <Center style={{ background: "rgba(0,0,0,0.25)" }} h="100%" w="100%">
          <IonIcon
            style={{ color: "white", fontSize: "30px" }}
            icon={false ? pause : play}
          />
        </Center>
      </BackgroundImage>
      {/* <Image /> */}
      {/* </Center> */}
      <Box style={{ color: "white", paddingLeft: "10px" }}>
        <Text style={{ fontSize: "18px" }}>{trackData.track.album.name}</Text>
        <Flex gap={5}>
          {trackData.track.album.artists.map((a, i, total) => (
            <>
              <Text style={{ fontSize: "14px", opacity: 0.5 }}>
                {a.name}
                {i === total.length - 1 ? "" : ","}
              </Text>
            </>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default SingleTrack;

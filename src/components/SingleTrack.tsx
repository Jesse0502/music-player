import { IonIcon } from "@ionic/react";
import { BackgroundImage, Box, Center, Flex, Text } from "@mantine/core";
import { pause, play } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { reccomendations } from "../constants";
import { addTrackToPlayer, setCurrentPlayingTrack } from "../store/playerSlice";

const SingleTrack = ({ trackData }: { trackData: any }) => {
  const currentPlayingTrack = useSelector(
    (state: RootState) => state.player.currentPlayingTrack
  );
  const dispatch = useDispatch();
  // console.log("trackdata", , currentPlayingTrack);
  return (
    <Flex
      my="sm"
      align={"center"}
      onClick={() => {
        dispatch(setCurrentPlayingTrack(trackData.track.uri));
        dispatch(addTrackToPlayer(trackData.track.uri));
      }}
      bg="rgba(255, 255, 255, 0.10)"
      style={{ borderRadius: "10px" }}
    >
      {/* <Center> */}
      <BackgroundImage h="70" w="70" src={trackData.track.album.images[0].url}>
        <Center style={{ background: "rgba(0,0,0,0.25)" }} h="100%" w="100%">
          <IonIcon
            style={{ color: "white", fontSize: "30px" }}
            icon={trackData.track.uri === currentPlayingTrack ? pause : play}
          />
        </Center>
      </BackgroundImage>
      {/* <Image /> */}
      {/* </Center> */}
      <Box style={{ color: "white", paddingLeft: "10px" }}>
        <Text style={{ fontSize: "18px" }} lineClamp={1}>
          {trackData.track.name}
        </Text>
        <Flex gap={5}>
          {trackData.track.album.artists.map((a: any, i: any, total: any) => (
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

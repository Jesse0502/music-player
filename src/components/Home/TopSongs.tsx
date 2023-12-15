import {
  BackgroundImage,
  Box,
  Center,
  Flex,
  Image,
  ScrollArea,
  Text,
} from "@mantine/core";
import { gaySingerList, topTrackReccomendations } from "../../constants";
import { IonIcon } from "@ionic/react";
import { pause, play } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTrackToPlayer } from "../../store/playerSlice";

const TopSongs = () => {
  const dispatch = useDispatch();
  const currentPlayingTrack = useSelector(
    (state: RootState) => state.player.currentPlayingTrack
  );
  const startTrack = (uri: string) => {
    dispatch(addTrackToPlayer(uri));
  };
  return (
    <ScrollArea mt="lg" scrollbars="x" scrollbarSize={"0"}>
      <Flex
        direction="row"
        wrap={"wrap"}
        px="md"
        gap={16}
        style={{
          width: topTrackReccomendations.tracks.length * 112 + "px",
          margin: "0 auto",
        }}
      >
        {topTrackReccomendations.tracks.map((t, index) => (
          <Flex
            component="div"
            gap={"md"}
            w="300px"
            onClick={() => startTrack(t.uri)}
            // opacity={
            //   t.artists.some((i) => gaySingerList.includes(i.name)) ? 0.25 : 1
            // }
          >
            <BackgroundImage h="60" w="80" src={t.album.images[0].url}>
              <Center
                style={{ background: "rgba(0,0,0,0.25)" }}
                h="100%"
                w="100%"
              >
                <IonIcon
                  style={{ color: "white", fontSize: "30px" }}
                  icon={currentPlayingTrack === t.uri ? pause : play}
                />
              </Center>
            </BackgroundImage>
            <Box style={{ color: "white", width: "300px" }}>
              <Text
                lineClamp={1}
                style={{
                  width: "200px",
                  fontSize: "18px",
                }}
              >
                {t.name}
              </Text>
              <Flex>
                {/* {t.artists.map((a, i) => ( */}
                <Text
                  style={{
                    fontSize: "14px",
                    opacity: 0.3,
                    marginRight: "5px",
                  }}
                >
                  {t.artists[0].name}
                  {t.artists.length > 1 && ","}
                </Text>
                {t.artists.length > 1 && (
                  <>
                    <Text
                      style={{
                        fontSize: "14px",
                        opacity: 0.3,
                        marginRight: "4px",
                      }}
                    >
                      {t.artists[1].name}
                      {t.artists.length > 3 && ","}
                    </Text>
                  </>
                )}
                {t.artists.length > 3 && (
                  <>
                    <Text style={{ fontSize: "14px", opacity: 0.3 }}>
                      ({t.artists.length - 2} more)
                    </Text>
                  </>
                )}
                {/* ))} */}
              </Flex>
            </Box>
          </Flex>
        ))}
      </Flex>
    </ScrollArea>
  );
};

export default TopSongs;

import { IonImg, useIonRouter } from "@ionic/react";
import { Box, Flex, ScrollArea } from "@mantine/core";
import { reccomendations } from "../../constants";
import { useEffect, useState } from "react";

const TrendingPlaylists = () => {
  const [isHovered, setIsHovered] = useState("");
  const [list, setList] = useState<any>(reccomendations.content.items);
  const router = useIonRouter();

  useEffect(() => {
    (async () => {
      const url =
        "https://spotify23.p.rapidapi.com/genre_view/?id=0JQ5DAqbMKFEC4WFtoNRpw&content_limit=10&limit=10";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };
      try {
        // const response = await fetch(url, options);
        // const result = await response.json();
        // setList(result.content.items);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <ScrollArea scrollbars="x" scrollbarSize={"0"}>
        <Flex
          gap={"lg"}
          style={{ overflowX: "auto", overflowY: "clip" }}
          // mt="lg"
          px="xl"
          h="300px"
          align={"center"}
        >
          {list.map((i: any) => (
            <Box
              display={i?.content?.items[0]?.uri ? "block" : "none"}
              h="max"
              onClick={() => {
                router.push("/playlist/" + i?.content?.items[0]?.id);
              }}
            >
              <IonImg
                onMouseLeave={() => {
                  setIsHovered("");
                }}
                onMouseEnter={() => {
                  setIsHovered(i.id);
                }}
                // onClick={() => {
                //   router.push("/playlist/" + i?.content?.items[0]?.id);
                // }}
                style={{
                  height: "230px",
                  width: "230px",
                  borderRadius: "10px",
                  transition: "transform 0.2s ease-in-out",
                  transform: isHovered === i.id ? "scale(1.1)" : "scale(1)",
                  boxShadow: "2px 4px 5px rgba(0,0,0,0.55)",
                  cursor: "pointer",
                }}
                src={i.images[0]?.url ?? i.content.items[0].images[0].url}
              />
              {/* <Text>{i?.content?.items[0]?.uri}</Text> */}
            </Box>
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
};

export default TrendingPlaylists;

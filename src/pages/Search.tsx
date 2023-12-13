import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Autocomplete, Avatar, Box, Flex, Image, Text } from "@mantine/core";
import { darkThemebg, searchResults } from "../constants";
import MusicPlayer from "../components/MusicPlayer";
import { useState } from "react";
import { search } from "ionicons/icons";

const Search: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");
  const searchContent = (val: string) => {
    setSearchVal(val);
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <Box
          pb="20vh"
          bg={darkThemebg}
          pos="relative"
          style={{
            backgroundColor: darkThemebg,
          }}
        >
          <Box
            style={{
              position: "sticky",
              top: "0",
              background: darkThemebg,
              zIndex: 9999,
            }}
            py="lg"
          >
            <Autocomplete
              px="md"
              onBlur={(e) => searchContent(e.currentTarget.value)}
              // label="Your favorite library"
              placeholder="Search Anything"
              rightSection={<IonIcon icon={search}></IonIcon>}
              // data={["React", "Angular", "Vue", "Svelte"]}
            />
          </Box>
          <Box style={{ minHeight: "90vh" }} px="lg" pt="lg">
            {searchVal && (
              <Text
                style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
              >
                Results for "{searchVal}"
              </Text>
            )}
            {searchResults.topResults.items.map((a) => (
              <Flex mt="md" gap="sm" align={"center"}>
                <Image
                  h={"80"}
                  w="80"
                  style={{
                    borderRadius: a.data.uri.includes("artist") ? "200px" : "",
                  }}
                  src={
                    a.data.images?.items[0].sources[0].url ||
                    a.data.coverArt?.sources[0].url ||
                    a.data.visuals?.avatarImage.sources[0].url ||
                    a.data.albumOfTrack?.coverArt.sources[0].url
                  }
                />
                <Box>
                  <Text
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {a.data.name ||
                      a.data.profile?.name ||
                      a.data.albumOfTrack?.name}
                  </Text>
                  {a.data.artists?.items.map((artist) => (
                    <Text
                      style={{ color: "white", fontSize: "15px", opacity: 0.6 }}
                    >
                      {artist.profile.name}
                    </Text>
                  ))}
                </Box>
              </Flex>
            ))}
            {searchResults.artists.items.map((a) => (
              <Flex mt="md" gap="sm" align={"center"}>
                <Avatar
                  h={"80"}
                  w="80"
                  src={a.data.visuals.avatarImage?.sources[0].url}
                />
                <Box>
                  <Text
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {a.data.profile.name}
                  </Text>
                </Box>
              </Flex>
            ))}
            {/* <Flex mt="md" gap="sm" align={"center"}>
              <Image
                h={"80"}
                w="80"
                src={searchResults.albums.items[0].data.coverArt.sources[0].url}
              />
              <Box>
                <Text
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {searchResults.albums.items[0].data.name}
                </Text>
                {searchResults.albums.items[0].data.artists.items.map((a) => (
                  <Text
                    style={{ color: "white", fontSize: "15px", opacity: 0.6 }}
                  >
                    {a.profile.name}
                  </Text>
                ))}
              </Box>
            </Flex> */}
          </Box>
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Search;

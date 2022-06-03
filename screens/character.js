import {
  ImageBackground,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function Character({ route }) {
  //
  const { data } = route.params;
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [episodeResult, setEpisodeResult] = useState([]);
  // console.log(data);
  const speak = (res) => {
    const thingToSay = `Hi, my name is ${res.name} and I'm a ${res.species} from ${res.location.name}`;
    Speech.speak(thingToSay);
  };
  //
  useEffect(() => {
    helper();
  }, []);
  //
  async function helper() {
    const req = await fetch(
      `https://rickandmortyapi.com/api/character/${data.id}`
    );
    const res = await req.json();
    // console.log(res);
    await setResult(res);
    // await speak(res);
  }
  //
  async function getEpisodeData() {
    // const setModalVisible(!modalVisible)
    const holdForNow = "";
    const req = await fetch(`https://rickandmortyapi.com/api/episode/${episodeResult}`);
    const res = await req.json();
    await setEpisodeResult(res.results);
    if (episodeResult.length > 0) {
      await setModalVisible(true);
    }
    // await setModalVisible(true);
    // console.log("AcaKbron", res);
  }
  // https://rickandmortyapi.com/api/character/2
  //
  if (result !== null) {
    console.log("-->", episodeResult);
    // console.log("hereee -->", result);
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: result.image }}
          resizeMode="cover"
          style={styles.image}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5 )"]}
            style={styles.background}
          >
            <Text style={styles.title}>{result.name}</Text>

            <View style={styles.row}>
              <Text style={styles.textRight}>{result.gender}</Text>
              <FontAwesome name="intersex" size={32} color="#2185d0" />
            </View>
            <View style={styles.row}>
              <Text style={styles.textRight}>{result.location.name}</Text>
              <Ionicons name="home" size={32} color="#2185d0" />
            </View>
            <View style={styles.row}>
              <Text style={styles.textRight}>{result.species}</Text>
              <Ionicons name="man" size={32} color="#2185d0" />
            </View>
            <View style={styles.row}>
              <Text style={styles.textRight}>{result.status}</Text>
              <Ionicons name="md-checkmark-circle" size={32} color="green" />
            </View>
            {/* <Text style={styles.textRight}>{result.episode[0]}</Text> */}
            {/* Has Additional Api */}

            <TouchableOpacity
              style={styles.buttonRow}
              onPress={async () => {
                getEpisodeData();
              }}
            >
              <Text style={styles.rowText}>View Episodes</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTextHeader}>View Episodes Below</Text>

                <ScrollView
                  contentContainerStyle={{
                    // flex: 1,
                    minHeight: 900,
                    paddingVertical: 24,
                    // borderColor: "red",
                    minWidth: "90%",
                    // borderWidth: 8,
                  }}
                >
                  {episodeResult !== [] > 0 ? (
                    <> 
                      {episodeResult.map((item, index) => {
                        return (
                          <View style={styles.cardContainer} key={index}>
                            <Text
                              style={{
                                padding: 8,
                                flex:1,
                                minHeight: 24,

                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                padding: 8,
                                flex:1,
                                minHeight: 24,

                              }}
                            >
                              {item.air_date}
                            </Text>
                            <Text
                              style={{
                                padding: 8,
                                flex:1,
                                minHeight: 24,

                              }}
                            >
                              {item.episode}
                            </Text>
                          </View>
                        );
                      })}
                    </>
                  ) : null}
                </ScrollView>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}

export default Character;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 42,
    width: "100%",
    // lineHeight: 84,
    padding: 8,
    fontWeight: "bold",
    textAlign: "left",
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: "transparent",
  },
  textRight: {
    color: "white",
    fontSize: 24,
    // width: "100%",
    padding: 8,
    textAlign: "right",
    // borderBottomColor: "red",
    // borderBottomWidth: 1,
    backgroundColor: "transparent",
  },
  textLeft: {
    color: "white",
    fontSize: 24,
    // width: "100%",
    padding: 8,
    textAlign: "left",
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "transparent",
    margin: 8,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buttonRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#2185d0",
    margin: 8,
    padding: 8,
    borderRadius: 16,
  },
  rowText: {
    color: "white",
    fontSize: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 16,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginVertical: 16,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTextHeader: {
    marginBottom: 16,
    fontSize: 32, 
    textAlign: "center",
  },
  cardContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    minHeight: 56,
    borderRadius: 8,
    minWidth: "90%",
    margin: 8,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#2185d0",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 0,
        },
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
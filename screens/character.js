import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

function Character({ route }) {
  //
  const { data } = route.params;
  const [result, setResult] = useState(null);
  // console.log(data);
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
    console.log(res);
    await setResult(res);
    // await speak(res);
  }
  // https://rickandmortyapi.com/api/character/2
  //
  if (result !== null) {
    console.log("hereee -->", result);
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: result.image }}
          resizeMode="cover"
          style={styles.image}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={styles.background}
          >
            <Text style={styles.nameStyle}>{result.name}</Text>
            {/* <View style =/> */}
            <View style= {styles.textContainer}>
            <Text style={styles.text}>Species:{result.species}</Text>
            <Text style={styles.text}>Gender:{result.gender}</Text>
            </View>
            {/* <TouchableOpacity style={{height:64, width:64, backgroundColor:'salmon'}}>
            </TouchableOpacity> */}
          </LinearGradient>
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
  background:{
    flex:1
  },
  nameStyle: {
    color: "#FCE205",
    fontSize: 56,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: "#FCE205",
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "bold",
    backgroundColor: "transparent",
    textAlign: "left",
  },
  textContainer: {
    marginTop: 16,
    marginLeft: 8
    }
});
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
            <Text style={styles.text}>{result.name}</Text>
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
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent",
  },

});
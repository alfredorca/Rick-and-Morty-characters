import { View, Text, StyleSheet, Image, Platform } from "react-native";
import React from "react";
//
export default function Card({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: data.image,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ fontSize:18, fontStyle:'italic'}}>{data.name}</Text>
        <Text>{data.species}</Text>
      </View>
    </View>
  );
}
//
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
  logo: {
    width: 66,
    height: 58,
    borderRadius: 8,
  },
  imageContainer: {
    maxWidth: 70,
    margin: 8,
  },
  textContainer: {
    width: "50%",
  },
});
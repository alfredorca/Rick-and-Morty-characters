import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";

export default function App() {
  const [data, setData] = useState(null);
  const counter = useRef(1);
  useEffect(() => {
    reset();
  }, []);

  async function getData() {
    const req = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${counter.current}`
    );
    const res = await req.json();

    // console.log(res);
    await setData(res.results);
    counter.current++;
  }

  async function reset() {
    counter.current = 1;
    getData();
  }

  if (data !== null) {
    console.log("HERE", data);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ marginBottom: 24, marginTop: 24 }}>
          Rick & Morty !!!
        </Text>
        <Pressable style={styles.pressable} onPress={getData}>
          <Text style={styles.next}>Next</Text>
        </Pressable>
        <Pressable onPress={reset} style={styles.pressable1} color="teal">
          <Text style={styles.reset}>Reset</Text>
        </Pressable>
        <ScrollView
          contentContainerStyle={{ minHeight: 900, paddingVertical: 24 }}
        >
          {data.map((item, index) => {
            return <Card style={styles.text} key={index} data={item} />;
          })}
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  } else {
    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  text: {
    color: "black",
  },
  pressable: {
    marginBottom: 24,
    marginTop: 24,
    backgroundColor: "skyblue",
    padding: 8,
    borderRadius: 8,
  },
  pressable1: {
    marginBottom: 24,
    marginTop: 24,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
  },
  next: {
    fontSize: 24,
    color: "white",
    minWidth: "50%",
    textAlign: "center",
    margin: 16,
  },
  reset: {
    fontSize: 24,
    color: "black",
    minWidth: "50%",
    textAlign: "center",
    margin: 16,
  },
});

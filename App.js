import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";

export default function App() {
  const [data, setData] = useState(null);
  const counter = useRef(1);
  useEffect(() => {
    reset()
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
    getData()
  }

  if (data !== null) {
    console.log("HERE", data);
    return (
      <SafeAreaView style={styles.container}>
        <Text>Rick & Morty !!!</Text>
        <Button title="Next Page" color="teal" onPress={getData} />
        <Button title="Reset" color="red" onPress={reset} />
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
});

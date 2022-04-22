import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView} from "react-native";
import { useState, useEffect } from "react";
import Card from "./components/Card";

export default function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const req = await fetch(
      "https://rickandmortyapi.com/api/character/?page=1"
    );
    const res = await req.json();

    // console.log(res);
    await setData(res.results);
  }

  if (data !== null) {
    console.log("HERE", data);
    return (
      <SafeAreaView style={styles.container}>
        <Text>Rick & Morty !!!</Text>
        <ScrollView contentContainerStyle={{minHeight: 900, paddingVertical:24}}>
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
    paddingVertical:24
  },
  text: {
    color: "black",
  },
});

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Home = createNativeStackNavigator();
import Home from "../App";

import Character from "../screens/character.js";

function MyStack() {
  return (
    <Home.Navigator>
      <Home.Screen name="Home" component={Home} />
      vS
      <Home.Screen name="Profile" component={Profile} />
      vS
    </Home.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const HomeStack = createNativeStackNavigator();
import Home from "../App";

import Character from "./screens/character.js";

function HomeStack() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
        vS
        <HomeStack.Screen name="Character" component={Character} />
        vS
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

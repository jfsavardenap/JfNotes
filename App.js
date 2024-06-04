import {
  SafeAreaView,
  Text,
  Image,
  Button,
  TextInput,
  View,
  Alert,
} from "react-native";
import tw, { useDeviceContext } from "twrnc";
import { Provider } from "react-redux";
import { store } from "./store";
import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./assets/screens/HomeScreen";
import NoteScreen from "./assets/screens/NoteScreen";

function App() {
  useDeviceContext(tw);

  const CustomText = ({ title, color }) => {
    return <Text style={tw`text-${color}-800 text-4xl`}>{title}</Text>;
  };

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Notes" component={NoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

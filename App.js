import { SafeAreaView, Text, Image, Button, TextInput } from "react-native";
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
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => {
                return (
                  <SafeAreaView style={tw`h-39`}>
                    <Text style={tw`text-lg mx-auto py-2`}>Notes</Text>
                    <TextInput
                      style={tw`bg-zinc-600 w-[96%] h-10 mx-auto px-2 rounded-xl text-white`}
                      placeholder={"Search"}
                      placeholderTextColor={"white"}
                    />
                  </SafeAreaView>
                );
              },
            }}
          />
          <Stack.Screen name="Notes" component={NoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

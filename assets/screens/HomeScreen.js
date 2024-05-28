import { Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import MasonryList from "@react-native-seoul/masonry-list";
import { useEffect, useState } from "react";
import { useRef } from "react";

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const generateData = (count) =>
    Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));
  useEffect(() => {
    setData(generateData(22));
  }, []);
  const renderItem = ({ item, i }) => (
    <TouchableOpacity>
      <Text
        style={[
          tw`bg-zinc-200 text-gray-500 m-1`,
          { height: Math.floor(Math.random() * 100) + 50 },
        ]}
      >
        {item.id}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <MasonryList
        style={tw`w-full h-full`}
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => {
          addNote({ title: "test", content: "content" });
        }}
        style={tw`bg-red-800 rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-14 h-14`}
      >
        <Text style={tw`text-white text-center text-3xl mt--1`}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;

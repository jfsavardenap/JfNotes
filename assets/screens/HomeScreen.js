import { Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import MasonryList from "@react-native-seoul/masonry-list";
import { useEffect, useState } from "react";
import { useRef, useLayoutEffect } from "react";
import {
  useFetchNotesQuery,
  useSearchNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "../../db.js";

function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const { data: searchData, error, isLoading } = useSearchNotesQuery(search);
  const [addNote, { data: addNoteData, error: addNoteError }] =
    useAddNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  useEffect(() => {
    if (addNoteData != undefined) {
      console.log(addNoteData.title);
      navigation.navigate("Notes", { note: addNoteData });
    }
  }, [addNoteData]);

  const openNote = () => {
    navigation.navigate("Notes");
  };

  const renderItem = ({ item, i }) => (
    <TouchableOpacity
      style={tw`mx-2 my-2 bg-gray-300 rounded-md`}
      onPress={() => navigation.navigate("Notes", { note: item })}
    >
      <Text style={tw`text-lg pt-1 px-1 mb-1`}>{item.title}</Text>
      <Text style={tw`pb-1 px-1 my-1`}>{item.content}</Text>
    </TouchableOpacity>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Back",
      header: () => {
        return (
          <SafeAreaView style={tw`h-39`}>
            <Text style={tw`text-lg mx-auto py-2`}>Notes</Text>
            <TextInput
              style={tw`bg-zinc-600 w-[96%] h-10 mx-auto px-2 rounded-xl text-white`}
              placeholder={"Search"}
              placeholderTextColor={"white"}
              onChangeText={(text) => {
                setSearch(text);
              }}
            />
          </SafeAreaView>
        );
      },
    });
  }, []);

  return (
    <SafeAreaView style={tw`flex-1`}>
      {searchData ? (
        <MasonryList
          style={tw`w-full h-full`}
          data={searchData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderItem}
        />
      ) : (
        <></>
      )}
      <TouchableOpacity
        onPress={() => {
          addNote({ title: "", content: "" });
        }}
        style={tw`bg-red-800 rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-14 h-14`}
      >
        <Text style={tw`text-white text-center text-3xl mt--1`}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;

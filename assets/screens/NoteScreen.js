import { TextInput, SafeAreaView, Button, Alert } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "../../db";

function NoteScreen({ navigation, route }) {
  const note = route.params.note;
  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  let noTitle = !title ? true : false;
  let noContent = !content ? true : false;

  const deleteHandle = () => {
    Alert.alert("WARNING!", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        onPress: () => console.log("Canceled"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteNote(note);
          navigation.navigate("Home");
        },
        style: "destructive",
      },
    ]);
  };

  useEffect(() => {
    return () => {
      if (noContent && noTitle) {
        deleteNote(route.params.note);
      }
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => {
        return <Button title="🗑️" onPress={deleteHandle} />;
      },
    });
  }, []);

  return (
    <SafeAreaView>
      <TextInput
        placeholder={"Title"}
        placeholderTextColor={"white"}
        style={tw`bg-gray-600 text-xl py-1 px-1 text-white`}
        defaultValue={note.title}
        onChangeText={(text) => {
          setTitle(text);
          noTitle = !text ? true : false;
          updateNote({ id: note.id, title: text, content: content });
        }}
      />
      <TextInput
        placeholder={"Note"}
        placeholderTextColor={"black"}
        style={tw`py-0.5 px-1`}
        multiline
        numberOfLines={6}
        defaultValue={note.content}
        onChangeText={(text) => {
          setContent(text);
          noContent = !content ? true : false;
          updateNote({ id: note.id, title: title, content: text });
        }}
      />
    </SafeAreaView>
  );
}

export default NoteScreen;
